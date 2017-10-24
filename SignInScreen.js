import React from 'react';
import {
  Container, Header, Footer, Body, Title, Content, Card, CardItem, Form, Item, Label,
  Button, Icon, Text} from 'native-base';
import { StyleSheet, TextInput, Image,ScrollView,View,ActivityIndicator,BackHandler} from 'react-native';
import { StackNavigator, } from 'react-navigation';
import HomeScreen from './Home';
import MainScreen from './MainScreen';
import firebaseApp from './Firebase';
import ResponsiveImage from 'react-native-responsive-image';
import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');
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
         <ResponsiveImage source={ require('./pics/back.png') } style={{alignSelf:'center',}} initWidth="238" initHeight="238"/>        
      <TextInput placeholder="Name" ref="name"  placeholderTextColor="gray" transparent style={[styles.inputbox, this.state.namecss && styles.emptyBox]} maxLength = {15} returnKeyType="next"
           onChangeText={(name) => this.setState({ name })}  value={this.state.name} autoFocus={true}
           onSubmitEditing={() => this.ageInput.focus()}/>
       <TextInput placeholder="Age" ref={(input) => { this.ageInput = input; }} placeholderTextColor="gray" transparent style={[styles.inputbox, this.state.agecss && styles.emptyBox]} keyboardType='numeric' maxLength = {2} returnKeyType="next"
           onChangeText={(age) => this.setState( {age })}  value={this.state.age} onSubmitEditing={() => this.phoneInput.focus()} /> 
       <TextInput placeholder="Phone No." ref={(input) => { this.phoneInput = input; }} placeholderTextColor="gray" transparent style={[styles.inputbox, this.state.phonecss && styles.emptyBox]} keyboardType='numeric' maxLength = {10} returnKeyType="next"
          onChangeText={(phone) => this.setState({ phone })}   value={this.state.phone} onSubmitEditing={() => this.emailInput.focus()}/> 
       <TextInput placeholder="Email" ref={(input) => { this.emailInput = input; }} placeholderTextColor="gray" transparent style={[styles.inputbox, this.state.emailcss && styles.emptyBox]} keyboardType="email-address" returnKeyType="next"
           onChangeText={(email) => this.setState({ email })} value={this.state.email} onSubmitEditing={() => this.psdInput.focus()} />
       <TextInput placeholder="Password" ref={(input) => { this.psdInput = input; }} placeholderTextColor="gray" secureTextEntry transparent style={[styles.inputbox, this.state.password1css && styles.emptyBox]} returnKeyType="next"
           onChangeText={(password1) => this.setState({ password1 })} value={this.state.password1} onSubmitEditing={() => this.psd2Input.focus()} />
       <TextInput placeholder="Confirm Password" ref={(input) => { this.psd2Input = input; }} placeholderTextColor="gray" secureTextEntry transparent style={[styles.inputbox, this.state.password2css && styles.emptyBox]} 
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
        <Text  style={styles.text}>Already have Account ?</Text>
        <Text style={{color:'#000099',marginBottom:10,textAlign:'center',fontSize:26}} onPress={() => navigate('Home')}>Login</Text>
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
  text: {
    textAlign: "center",
    color:'white',
      },
  title: {
    fontWeight: 'bold', fontFamily: "vincHand",
    fontSize: 30,
    textAlign: "center",
    marginTop: 25,
  },
  emptyBox: {
    borderColor: 'red',
   borderWidth: 2.0,
  },
  view: {
    textAlign: "center",
    color : "rgb(3, 7, 33)",
    fontWeight:'bold',
     },
     inputbox: {
      //textAlign: "center",
      color:'white',
      fontWeight:'bold',
      fontSize:20, 
      padding:10,
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
       flex:1,
       alignSelf:'center',  
       width:'100%' ,
       height:'100%',
      },
      button :{
        fontWeight:'bold',
        margin:10,
     color:'white',
     alignSelf:'center',
     justifyContent:'center',
     borderColor:'white',
     marginTop:10,
     borderWidth:2,
      },
      text:{
        fontWeight:'bold',
       color:'white',
       alignSelf:'center',
       justifyContent:'center',
       borderColor:'white',
       fontSize:20,
      }
    });
    