import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, Navigator, View,Image,TextInput, TouchableHighlight,TouchableOpacity,
  ListView, NativeModules,DeviceEventEmitter,} from 'react-native';
import { Container,Footer,Body,Title,Card, CardItem, Item,Input, Label,Button, Text,Form ,Header,
  Content, FooterTab,Left, Right, Icon ,Div,List,ListItem,Thumbnail} from 'native-base';
import { StackNavigator,} from 'react-navigation';
import HomeScreen from './Home';
import MainScreen from './MainScreen';
import SignInScreen from './SignInScreen';
import ChatScreen from './ChatScreen';
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import UserProfileScreen from './UserProfileScreen';
import firebaseApp from './Firebase';
import CallScreen from './CallScreen';

class TestScreen extends React.Component {  
 static navigationOptions = {
   title: 'WELCOME',
   header:null, 
 }; 
 constructor(props) {
  super(props);
  }
componentDidMount() {
  const { navigate } = this.props.navigation;
  firebaseApp.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      navigate('Main');
    }
    else {
      navigate('Home');
    }
  });
}  
 render() {
   const { navigate } = this.props.navigation;
   return (
   <Container style={styles.Container}> 
    <Image source={{ uri :'https://firebasestorage.googleapis.com/v0/b/chitchat-f147c.appspot.com/o/chitchat2.jpg?alt=media&token=435c9d13-9fad-44a3-8c04-f6b15d464b55'}} style={{height:450,width:360,}} >
     </Image></Container>
   );
 }
}
var styles = StyleSheet.create({
 Container :{
 backgroundColor:'black'
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
 profile:{screen: ProfileScreen},
 uprofile:{screen: UserProfileScreen}
}); 
AppRegistry.registerComponent('ChitChat', () => ChitChat);