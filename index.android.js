import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, Navigator, View,Image,TextInput, TouchableHighlight,TouchableOpacity,ListView} from 'react-native';
import { Container,Footer,Body,Title,Card, CardItem, Item,Input, Label,Button, Text,Form ,Header,
  Content, FooterTab,Left, Right, Icon ,Div,List,ListItem,Thumbnail} from 'native-base';
import { StackNavigator,} from 'react-navigation';
import HomeScreen from './Home';
import MainScreen from './MainScreen';
import SignInScreen from './SignInScreen';
import ChatScreen from './ChatScreen';
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import firebaseApp from './Firebase';
import CallScreen from './CallScreen';


class TestScreen extends React.Component {  
 static navigationOptions = {
   title: 'WELCOME', 
 };

 
 constructor(props) {
  super(props);
  this.state = {     
    errors: [],
  }
  this.itemsRef =firebaseApp.database().ref().child('user');
}
userlogin()
{
  const { navigate } = this.props.navigation;
  firebaseApp.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      navigate('Main');
    } else {
      // User is signed out.
      navigate('Home');
    }
  });
}



  
 render() {
   const { navigate } = this.props.navigation;
   const date = new Date();
   return (
    <Image source={ require('./pics/back4.jpg') }  style={{height:'100%',width:'100%'}}>
    <Container>       
       <Content >
         <Text></Text>
     <Button rounded bordered style={styles.button} >
       <Icon name="home"  onPress={() =>this.userlogin()} style={styles.button} >
 <Text style={styles.button}>HOME</Text> </Icon></Button> 
 
        </Content> 
     </Container>
     </Image>
   );
 }
}


var styles = StyleSheet.create({
 button :{
   fontWeight:'bold',
   fontSize:30,
   color:'white',
alignSelf:'center',
justifyContent:'center',
borderColor:'white',
 },

});




const ChitChat = StackNavigator({
 Test:{screen : TestScreen},
 Home: { screen: HomeScreen },
 SignIn: { screen: SignInScreen },
 Chats: {screen: ChatScreen},
 Main :{screen : MainScreen},
 Message:{screen:MessageScreen},
 call:{screen:CallScreen},
 profile:{screen: ProfileScreen}
}); 
AppRegistry.registerComponent('ChitChat', () => ChitChat);