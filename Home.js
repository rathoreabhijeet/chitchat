import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, Navigator, View,Image,TextInput,} from 'react-native';
import { Container,Body, Form, Item,Input, Label,Button, Text ,Header,
   Content,Left, Right, Icon} from 'native-base';
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
     try { 
       firebaseApp.auth().signInWithEmailAndPassword(email, password)
         .then((firebaseUser)=> {
          //alert('login in');
          navigate('Main');
          this.setState({
            email: '',
            password: '',
          }); 

        }, (error)=>{
          var errorCode = error.code;
          var errorMessage = error.message;
           if (errorCode === 'auth/wrong-password') {
           alert('Wrong password!');
           }
          else  if (errorCode === 'auth/invalid-email') {
             alert('Invalid Email!');
           }
           else  if (errorCode === 'auth/user-not-found') {
             alert('User Not Found!');
           }
           else { 
            alert(errorMessage);
           }
        })          
        }
         catch (error) {
           console.log(error.toString())
        }         
    }    
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: [],
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container style={{ backgroundColor:'#075e54'}}>
 <Image source={ require('./pics/back.png') } /> 
      <Content>
      
      {/* <Image source={{uri :'https://firebasestorage.googleapis.com/v0/b/chitchat-f147c.appspot.com/o/back.png?alt=media&token=05cc9bbe-4417-42ed-af91-dbd53cd739f9'}}/> */}
        <Text></Text>
        <Form>
        <TextInput placeholder="Email" placeholderTextColor="white" keyboardType="email-address"
        onChangeText={(email) => this.setState({ email })}   value={this.state.email}  style={styles.inputbox}/>
        <TextInput placeholder="Password" secureTextEntry  placeholderTextColor="white" 
 onChangeText={(password) => this.setState({password})} value={this.state.password} style={styles.inputbox}/>
             </Form> 
             <Text></Text>
             <Button rounded bordered onPress={() => this.Login(this.state.email,this.state.password)} style={styles.button}>
          <Text style={styles.text}>
            LOGIN
          </Text>
        </Button>
        <Text></Text>
        <View >
        <Text  style={styles.view}>If Not Registered?</Text>
          <Text style={styles.view}> Then Please Click on</Text>
          </View >
          <Button  rounded bordered onPress={() =>
            navigate('SignIn')}  style={styles.button}>
            <Text style={styles.text}>
              SIGN UP 
            </Text>
          </Button>
     
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
    borderColor:'white',
    fontWeight:'bold',
    fontSize:20,
    textAlign: "center",
    borderBottomWidth:2, 
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
