import React from 'react';
import {Container, Header, Footer, Body, Title, Content, Card, CardItem, Form, Item, Label,Input,
  Button, Icon, Text} from 'native-base';
import { StyleSheet, Image,ScrollView,View,ActivityIndicator,BackHandler,Dimensions} from 'react-native';
import { StackNavigator, } from 'react-navigation';
import firebaseApp from './Firebase';
import ResponsiveImage from 'react-native-responsive-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');

const { width, height } = Dimensions.get('window');//get the dimension of the device screen
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
              this.setState({hght:100,
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
    //  <KeyboardAwareScrollView>
      <Container><ScrollView>
        <Content contentContainerStyle={{}} disableKBDismissScroll>
        
          <View style={styles.upper}>
            <View style={styles.upperContent}>
              <View style={styles.logoDiv}>
                <ResponsiveImage source={ require('./pics/back.png') } initWidth="155" initHeight="128" style={{ alignSelf: 'center',borderRadius:10 }} />
              <Text style={{color:'#075e54',fontSize:20}}>ChitChat</Text>
              </View>
              <View style={styles.welcomeDiv}>
                <Text style={styles.welcome}> Sign Up </Text>
              </View></View></View>
              <View style={styles.inputDiv}>
              <Input placeholder="Name" ref="name"  placeholderTextColor="gray" transparent style={[styles.inputbox, this.state.namecss && styles.emptyBox]} maxLength = {15} returnKeyType="next"
                      onChangeText={(name) => this.setState({ name })}  value={this.state.name} autoFocus={true}
                     onSubmitEditing={() => this.ageInput._root.focus()}/>
            <Input placeholder="Age" ref={(input) => { this.ageInput = input; }} placeholderTextColor="gray" transparent style={[styles.inputbox, this.state.agecss && styles.emptyBox]} keyboardType='numeric' maxLength = {2} returnKeyType="next"
                      onChangeText={(age) => this.setState( {age })}  value={this.state.age} onSubmitEditing={() => this.phoneInput._root.focus()} /> 
            <Input placeholder="Phone No." ref={(input) => { this.phoneInput = input; }} placeholderTextColor="gray" transparent style={[styles.inputbox, this.state.phonecss && styles.emptyBox]} keyboardType='numeric' maxLength = {10} returnKeyType="next"
                    onChangeText={(phone) => this.setState({ phone })}   value={this.state.phone} onSubmitEditing={() => this.emailInput._root.focus()}/> 
            <Input placeholder="Email" ref={(input) => { this.emailInput = input; }} placeholderTextColor="gray" transparent style={[styles.inputbox, this.state.emailcss && styles.emptyBox]} keyboardType="email-address" returnKeyType="next"
                   onChangeText={(email) => this.setState({ email })} value={this.state.email} onSubmitEditing={() => this.psdInput._root.focus()} />
            <Input placeholder="Password" ref={(input) => { this.psdInput = input; }} placeholderTextColor="gray" secureTextEntry transparent style={[styles.inputbox, this.state.password1css && styles.emptyBox]} returnKeyType="next"
                     onChangeText={(password1) => this.setState({ password1 })} value={this.state.password1} onSubmitEditing={() => this.psd2Input._root.focus()} />
             <Input placeholder="Confirm Password" ref={(input) => { this.psd2Input = input; }} placeholderTextColor="gray" secureTextEntry transparent style={[styles.inputbox, this.state.password2css && styles.emptyBox]} 
                     onChangeText={(password2) => this.setState({ password2 })} value={this.state.password2} returnKeyType={'go'}
                   onSubmitEditing={()=>this.signup(this.state.name,this.state.age,
                   this.state.phone,this.state.email,this.state.password1,this.state.password2,this.state.avatarSource)} />
              </View>
              <View style={styles.buttonDiv}>
                <Button rounded bordered onPress={() => { this.signup(this.state.name,this.state.age,this.state.phone,this.state.email,this.state.password1,this.state.password2,this.state.avatarSource)}} style={styles.button}>
                  <Text style={styles.buttonText}>
                   SIGN UP
                </Text>
                </Button>
              </View>
              <View style={styles.overlay}>
         <ActivityIndicator  color='#075e54' animating={this.state.animating} size={70}
         style={{ height:this.state.hght,opacity:this.state.opac,}} 
          // style={{ height:100,opacity:1}} 
            />
       </View>
     <View style={styles.lower} >
            <Text style={styles.bottomText} onPress={ ()=>{ navigate('Home')}}>Already have account ? LOGIN!</Text>
        </View >
        </Content></ScrollView>       
      </Container>
      // </KeyboardAwareScrollView>   
  );
  }
 }
 const styles = StyleSheet.create({
  
  upper: {
    //flex: 8,
    height:height*0.35,
    alignItems: 'center',
    flexDirection:'row',
    
  },
  upperContent: {
    flexDirection: 'column',
    width:'100%'
  },
  logoDiv: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
   // backgroundColor:'#075e54',
  },
  welcomeDiv: {
    flex: 3,
    justifyContent: 'center',
    // backgroundColor: '#00f'
  },
  inputDiv: {
  // flex: 5,
   height:280,
   maxHeight:300,
   minHeight:250,
    justifyContent: 'center',
   // backgroundColor:'red',
  },
  buttonDiv: {
   // flex: 3,
   height:height*0.2,
    justifyContent: 'center',
   // backgroundColor: 'red'
  },
  lower: {
    //flex: 1,
    height:height*0.1,
   // backgroundColor: 'red'
  },
  welcome: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '300',
    color: '#364354'
  },
  overlay: { 
    height:65,
    width:70,  
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    position: "absolute",
    elevation: 4,
     top: '18%',
    // right: 0,
    // bottom: 350,
    // left: 0,
     flexDirection: 'column',
    // backgroundColor:'blue'
       //justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    // padding:80,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#075e54',
    backgroundColor:'#075e54',
    width: '60%',
    height: 50
  },
  buttonText:{
    color: 'white',
    fontSize: 16
  },
  inputbox: {
    color: '#50616F',
    width: '100%',
    borderColor: '#E7ECEC',
    borderWidth: 1,
    backgroundColor: 'white',
    fontSize: 16,
    height: 30,
    paddingLeft: 30
  },
  emptyBox: {
      borderColor: 'red',
     borderWidth:1
     // backgroundColor: 'red',
    },
  text: {
    alignSelf: 'center',
    fontSize: 17,
    color: '#364354'
  },
  bottomText:{
    color: '#364354',
    fontSize: 16,
    fontWeight: '300',
    alignSelf: 'center',
  }
});
    