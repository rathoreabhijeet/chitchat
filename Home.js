import React, { Component } from 'react';
import {  AppRegistry,StatusBar, StyleSheet, Navigator, View,Image,ToastAndroid,TextInput,ScrollView,ActivityIndicator,BackHandler} from 'react-native';
import { Container,Body, Form, Item,Input, Label,Button, Text ,Header,
   Content,Left, Right, Icon, Toast} from 'native-base';
   import { StackNavigator,} from 'react-navigation';
   import MainScreen from './MainScreen';
   import SignInScreen from './SignInScreen';
   import ChatScreen from './ChatScreen';
   import MessageScreen from './MessageScreen';
   import ProfileScreen from './ProfileScreen';
   import UserProfileScreen from './UserProfileScreen';
   import firebaseApp from './Firebase';
   import CallScreen from './CallScreen';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'HOME',
    header:null,
  };
  async Login(email, password) {
      const { navigate } = this.props.navigation; 
      // this.setState({animating: true});
      // this.toggleLoader()
    if (email =='' || password== '')
    {
      this.setState({hght:0,opac:0});
alert('Enter Email and Password');
    }
    else {
      try { 
        this.setState({hght:80,
          opac:1});
         firebaseApp.auth().signInWithEmailAndPassword(email, password)
           .then((firebaseUser)=> {
            //alert('login in');
            navigate('Main');
            this.setState({
              email: '',
              password: '',
              hght:0,opac:0
            }); 
  
          }, (error)=>{
            this.setState({hght:0,opac:0});
            var errorCode = error.code;
            var errorMessage = error.message;
             if (errorCode === 'auth/wrong-password') {
             alert('Wrong password!');
             this.setState({hght:0,opac:0});
             }
            else  if (errorCode === 'auth/invalid-email') {
               alert('Invalid Email!');
               this.setState({hght:0,opac:0});
             }
             else  if (errorCode === 'auth/user-not-found') {
               alert('User Not Found!');
               this.setState({hght:0,opac:0});
             }
             else { 
              alert(errorMessage);
              this.setState({hght:0,opac:0});
             }
          })          
          }
           catch (error) {
             console.log(error.toString())
          }  
    }
            
    }    
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      animating:true,
      errors: [],
      hght:0,
      opac:0,
      showToast: false,
      count:0
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  this.setState({
    count:0,
  })
}
onBackPress(){
 
 BackHandler.exitApp()
 return false;
  
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      
      <Container style={{ backgroundColor:'#075e54'}}>
      <Content>
      <ScrollView overScrollMode={'auto'}>
      <Image source={ require('./pics/back.png') } style={{alignSelf:'center'}} /> 
      {/* <Image source={{uri :'https://firebasestorage.googleapis.com/v0/b/chitchat-f147c.appspot.com/o/back.png?alt=media&token=05cc9bbe-4417-42ed-af91-dbd53cd739f9'}}/> */}
        <Text></Text>
        <Form>
        <TextInput placeholder="Email" placeholderTextColor="white" keyboardType="email-address"
        onChangeText={(email) => this.setState({ email })}   value={this.state.email}  style={styles.inputbox} returnKeyType={'next'}
        onSubmitEditing={()=>this.pswdInput.focus()} />
        <TextInput placeholder="Password" secureTextEntry ref={(input) => { this.pswdInput = input; }} placeholderTextColor="white" 
 onChangeText={(password) => this.setState({password})} returnKeyType={'go'} value={this.state.password} style={styles.inputbox}
 onSubmitEditing={()=> this.Login(this.state.email,this.state.password)}/>
             </Form> 
          <Text></Text>
             <Button rounded bordered onPress={() =>{ this.Login(this.state.email,this.state.password)}} style={styles.button}>
          <Text style={styles.text}>
            LOGIN
          </Text>
        </Button>

        <View style={styles.overlay}>
        <ActivityIndicator
          color='white'
          animating={this.state.animating}
          style={{height:this.state.hght,opacity:this.state.opac}}
          size={100}
        />
  </View>
         
        <Text></Text>
        <View >
        <Text  style={styles.view}>Not Registered?</Text>
          <Text style={styles.view}> Then Please Click on</Text>
          </View >
          <Button  rounded bordered onPress={() =>
            navigate('SignIn')}  style={styles.button}>
            <Text style={styles.text}>
              SIGN UP 
            </Text>
          </Button>
     </ScrollView>
        </Content>
        {/* </Image> */}
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
  button :{
    fontWeight:'bold',
  //  fontSize:25,
    color:'white',
 alignSelf:'center',
 justifyContent:'center',
 borderColor:'white',
  },
  view: {
textAlign: "center",
color:'white',
  },
  inputbox: {
    color:'white',
   // borderColor:'white',
    fontWeight:'bold',
    fontSize:20,
    textAlign: "center",
   // borderBottomWidth:2, 
  },
  text:{
    fontWeight:'bold',
    //  fontSize:25,
      color:'white',
   alignSelf:'center',
   justifyContent:'center',
   borderColor:'white',
   fontSize:20,
  },
});
