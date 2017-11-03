import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, Navigator, Image,
   NativeModules,DeviceEventEmitter,BackHandler,ToastAndroid} from 'react-native';
import { Container,} from 'native-base';
import { StackNavigator,} from 'react-navigation';
import HomeScreen from './Screens/Home';
import MainScreen from './Screens/MainScreen';
import SignInScreen from './Screens/SignInScreen';
import ChatScreen from './Screens/ChatScreen';
import ContactScreen from './Screens/ContactScreen'
import MessageScreen from './Screens/MessageScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UserProfileScreen from './Screens/UserProfileScreen';
import UsersListScreen from './Screens/UsersListScreen';
import firebaseApp from './Screens/Firebase';

class FirstScreen extends React.Component {  
 static navigationOptions = {
   title: 'WELCOME',
   header:null, 
 }; 
 constructor(props) {
  super(props);
  this.state={
    count:0
  }
  }
componentDidMount() { // on page load function to check if user is logged In or not
 
  const { navigate } = this.props.navigation;
  firebaseApp.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      navigate('Main');
    }
    else {
      //user is not signed in navigate to login page
      navigate('Home');
    }
  });
} 

 render() {
   const { navigate } = this.props.navigation;
   return (
   <Container style={styles.Container}>
       <Image
          style={styles.stretch}
          source={require('./splash.png')}
        />
   </Container>
   
   );
 }
}
var styles = StyleSheet.create({
 Container :{
  alignItems:'center'
 },
 stretch: {
  width: '100%',
  height: '100%'
}
});
const ChitChat = StackNavigator({
 first:{screen : FirstScreen},
 Home: { screen: HomeScreen },
 SignIn: { screen: SignInScreen },
 Chats: {screen: ChatScreen},
 Main :{screen : MainScreen},
 Message:{screen:MessageScreen},
 profile:{screen: ProfileScreen},
 uprofile:{screen: UserProfileScreen},
 contact:{screen: ContactScreen},
 userslist:{screen: UsersListScreen},
}); 
AppRegistry.registerComponent('ChitChat', () => ChitChat);
