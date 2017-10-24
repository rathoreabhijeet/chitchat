import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, Navigator, Image,
   NativeModules,DeviceEventEmitter,BackHandler,ToastAndroid} from 'react-native';
import { Container,} from 'native-base';
import { StackNavigator,} from 'react-navigation';
import HomeScreen from './Home';
import MainScreen from './MainScreen';
import SignInScreen from './SignInScreen';
import ChatScreen from './ChatScreen';
import ContactScreen from './ContactScreen'
import MessageScreen from './MessageScreen';
import ProfileScreen from './ProfileScreen';
import UserProfileScreen from './UserProfileScreen';
import firebaseApp from './Firebase';

class TestScreen extends React.Component {  
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
  BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
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
componentWillUnmount() {
BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
this.setState({
  count:0,
})
}
onBackPress(){
if(this.state.count==0){
ToastAndroid.showWithGravity('Press Back again to exit', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
this.setState({
  count:1
});
setTimeout(() => {this.setState({count:0})}, 3000);
return true; }
else{
BackHandler.exitApp()
return false;
}
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
 Test:{screen : TestScreen},
 Home: { screen: HomeScreen },
 SignIn: { screen: SignInScreen },
 Chats: {screen: ChatScreen},
 Main :{screen : MainScreen},
 Message:{screen:MessageScreen},
 profile:{screen: ProfileScreen},
 uprofile:{screen: UserProfileScreen},
 contact:{screen: ContactScreen}
}); 
AppRegistry.registerComponent('ChitChat', () => ChitChat);
