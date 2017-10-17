import React from 'react';
import {
  Container, Header, Footer, Body, Title, Content, Card, CardItem, Form, Item, Label,
  Button, Icon, Text} from 'native-base';
import { StyleSheet, TextInput, Image,ScrollView,View,ActivityIndicator,BackHandler} from 'react-native';
import { StackNavigator, } from 'react-navigation';
import HomeScreen from './Home';
import MainScreen from './MainScreen';
import firebaseApp from './Firebase';
import RNFetchBlob from 'react-native-fetch-blob'
var ImagePicker = require('react-native-image-picker');
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob


export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'SIGN IN',
    header:null,
  };

     
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      age:'',
      phone:'',
      email:'',
      password1:'',
      password2:'',
      avatarSource:'https://firebasestorage.googleapis.com/v0/b/chitchat-f147c.appspot.com/o/images%2Fdefault.png?alt=media&token=2c799112-82ac-4089-9ecd-66734f0e79fd',
      errors: [],
      hght:0,
      opac:0,
    }
  }
  uploadPhoto(){
    var options = {
      title: 'Select Avatar',
      // customButtons: [
      //   {name: 'fb', title: 'Choose Photo from Facebook'},
      // ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
  ImagePicker.showImagePicker(options, (response) => {
              console.log('Response = ', response);
            
              if (response.didCancel) {
                console.log('User cancelled image picker');
              }
              else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              }
              else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              }
              else {
                // let source = { uri: response.uri };
            
                // You can also display the image using data:
               let source = { uri: 'data:image/jpeg;base64,' + response.data };
                // let source = 'data:image/jpeg;base64,' + response.data;
                this.setState({
                  // avatarSource:source,
                  imageSrc:response,
                  file:response.fileName,
                });
                // alert("Uploading");
                // this.upload(source)
                this.uploadImage(response.uri,response.fileName)
                .then(url => {this.setState({avatarSource: url}) })
                .then(alert('Upload Successfull!!! Press SignUP to continue '))
        .catch(error => console.log(error))
              }           
            });   }
  uploadImage(uri,name, mime = 'application/octet-stream') {
              return new Promise((resolve, reject) => {
                const uploadUri = uri;
                let uploadBlob = null;
          
                const imageRef = firebaseApp.storage().ref('images/').child(name)
          
                fs.readFile(uploadUri, 'base64')
                  .then((data) => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                  })
                  .then((blob) => {
                    uploadBlob = blob
                    return imageRef.put(blob, { contentType: mime })
                  })
                  .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                  })
                  .then((url) => {
                    resolve(url)
                  })
                  .catch((error) => {
                    reject(error)
                })
              })
          }
  async signup(name,age,phone,email,password1,password2,avatarSource) {
    this.setState({namecss: false})
    this.setState({agecss: false})
    this.setState({phonecss: false})
    this.setState({emailcss: false})
    this.setState({password1css: false})
    this.setState({password2css: false})

    if (name == ''|| age ==''|| phone ==''|| email ==''|| password1 ==''|| password2 =='')
      {
          alert('please fill form completly');
        }

        if (name == '' )
    { 
      this.setState({namecss: true})
    }
    if(age =='')
      { 
        this.setState({agecss: true})     
      }
      if(phone =='')
        { 
          this.setState({phonecss: true})          
        }
         if(email =='')
          {
            this.setState({emailcss: true})          
          }
           if(password1 =='')
            {
              this.setState({password1css: true})             
            }
             if(password2 =='')
              {
                this.setState({password2css: true})                
              }
     else if (password1 == password2) {
          if (phone.length == 10)
           {
             const { navigate } = this.props.navigation; 
             try {
              this.setState({hght:80,
                opac:1});
                    await firebaseApp.auth().createUserWithEmailAndPassword(email, password1)
                      .then((firebaseUser) => {
                        var user = firebaseApp.auth().currentUser;
                        alert('Successfully Registered');
                        firebaseApp.database().ref('user/'+user.uid).set({
                         Name: name,         
                         Age : age,         
                        Phone_No :phone,
                        Email: email,
                        UID:user.uid,
                        ImageURL:avatarSource,
                        status:"Hey, I'm using ChitChat"
                          });
                          this.setState({
                            name:'',
                            age:'',
                            phone:'',
                            email:'',
                            password1:'',
                            password2:'',
                            avatarSource:'',
                          }); 
                        navigate('Main');          
                      },
                       (error) => {
                        this.setState({hght:0,opac:0});
                        //  .catch(function(error) { 
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        if (errorCode == 'auth/email-already-in-use') {
                          alert('The Email is already in use');
                        }
                        else if (errorCode == 'auth/invalid-email') {
                          alert('Invalid Email');
                        }
                        else if (errorCode == 'auth/weak-password') {
                          alert('The password is too weak.');
                        }
                        else {
                          alert(errorMessage);
                        }
                        console.log(error);
                      });
             
                  }
                  catch (error) {
                    console.log(error.toString())
                  }
           }
           else 
             {
               alert('Invalid Phone number');
             }       
    }
    else
    { alert('Password do not match'); }
  } 
  componentWillUnmount(){
    this.setState({hght:0,opac:0});
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  } 
  componentDidMount() {
    // this.listenForItems(this.chatRef);
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }
    onBackPress(){
     this.props.navigation.navigate('Home');
     return true;
    }   
 
  render() {
    const { navigate } = this.props.navigation;
    
    return (
      <Container style={{ backgroundColor:'#075e54'}}>        
         <Content><ScrollView>
       <Image source={ require('./pics/back.png') } style={{alignSelf:'center'}} />       
      <TextInput placeholder="Name" ref="name"  placeholderTextColor="white" transparent style={[styles.inputbox, this.state.namecss && styles.emptyBox]} maxLength = {15} returnKeyType="next"
           onChangeText={(name) => this.setState({ name })}  value={this.state.name} autoFocus={true}
           onSubmitEditing={() => this.ageInput.focus()}/>
       <TextInput placeholder="Age" ref={(input) => { this.ageInput = input; }} placeholderTextColor="white" transparent style={[styles.inputbox, this.state.agecss && styles.emptyBox]} keyboardType='numeric' maxLength = {2} returnKeyType="next"
           onChangeText={(age) => this.setState( {age })}  value={this.state.age} onSubmitEditing={() => this.phoneInput.focus()} /> 
       <TextInput placeholder="Phone No." ref={(input) => { this.phoneInput = input; }} placeholderTextColor="white" transparent style={[styles.inputbox, this.state.phonecss && styles.emptyBox]} keyboardType='numeric' maxLength = {10} returnKeyType="next"
          onChangeText={(phone) => this.setState({ phone })}   value={this.state.phone} onSubmitEditing={() => this.emailInput.focus()}/> 
       <TextInput placeholder="Email" ref={(input) => { this.emailInput = input; }} placeholderTextColor="white" transparent style={[styles.inputbox, this.state.emailcss && styles.emptyBox]} keyboardType="email-address" returnKeyType="next"
           onChangeText={(email) => this.setState({ email })} value={this.state.email} onSubmitEditing={() => this.psdInput.focus()} />
       <TextInput placeholder="Password" ref={(input) => { this.psdInput = input; }} placeholderTextColor="white" secureTextEntry transparent style={[styles.inputbox, this.state.password1css && styles.emptyBox]} returnKeyType="next"
           onChangeText={(password1) => this.setState({ password1 })} value={this.state.password1} onSubmitEditing={() => this.psd2Input.focus()} />
       <TextInput placeholder="Confirm Password" ref={(input) => { this.psd2Input = input; }} placeholderTextColor="white" secureTextEntry transparent style={[styles.inputbox, this.state.password2css && styles.emptyBox]} 
           onChangeText={(password2) => this.setState({ password2 })} value={this.state.password2} returnKeyType={'go'}
           onSubmitEditing={()=>this.signup(this.state.name,this.state.age,
                 this.state.phone,this.state.email,this.state.password1,this.state.password2,this.state.avatarSource)} />

           <View style={styles.overlay}>
           <ActivityIndicator
             color='gray'
             animating={this.state.animating}
             style={{height:this.state.hght,opacity:this.state.opac}}
             size={100}
           />
     </View>

            <Button rounded bordered style={styles.button} onPress={() => this.signup(this.state.name,this.state.age,
                 this.state.phone,this.state.email,this.state.password1,this.state.password2,this.state.avatarSource)}>
          <Text style={styles.text}>
           SIGN UP
          </Text>
        </Button>
            </ScrollView>    
        </Content>
      </Container>
    );
  }
 }
var styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0,
    borderColor: 'white',

  }, 
  title: {
    fontWeight: 'bold', fontFamily: "vincHand",
    fontSize: 30,
    textAlign: "center",
    marginTop: 25,
  },
  emptyBox: {
  //  borderColor: '#e71636',
    borderColor: 'red',
   borderWidth: 2.0,
   // backgroundColor: 'red',
  },
  view: {
    textAlign: "center",
    color : "rgb(3, 7, 33)",
    fontWeight:'bold',
     },
     inputbox: {
      textAlign: "center",
      color:'white',
      // borderColor:'white',
      fontWeight:'bold',
      fontSize:20, 
    },
    overlay: {
      flex: 1,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      position: 'absolute',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    } ,
     Image: {
      // justifyContent :'center',
       flex:1,
       alignSelf:'center',  
       width:'100%' ,
       height:'100%',
      },
      button :{
        fontWeight:'bold',
      //  fontSize:25,
        color:'white',
     alignSelf:'center',
     justifyContent:'center',
     borderColor:'white',
     marginTop:10,
     borderWidth:2,
      },
      text:{
        fontWeight:'bold',
        //  fontSize:25,
          color:'white',
       alignSelf:'center',
       justifyContent:'center',
       borderColor:'white',
       fontSize:20,
      }
    });
    