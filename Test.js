import React, { Component } from 'react';
import {  AppRegistry, StyleSheet, Navigator, View,Image,document,TextInput, TouchableHighlight} from 'react-native';
import { Container,Footer,Body,Title,Card, CardItem, Item,Input, Label,Button, Text,Form ,Header,
  Content, FooterTab,Left, Right, Icon ,Div} from 'native-base';
import { StackNavigator,} from 'react-navigation';
import MainScreen from './Home';
import SignInScreen from './SignInScreen';
import ChatScreen from './ChatScreen';
import * as firebase from "firebase";
import ScrollableTabView from 'react-native-scrollable-tab-view';

class TestScreeen extends React.Component {  
 static navigationOptions = {
   title: 'TEST PAGE', 
 };
 async getUserData() {
   try {
    //console.log('get user');
   
   // var userId = firebase.auth().currentUser.uid;
     firebase.database().ref('user').once('value').then(function(snapshot) {
      //var name = (snapshot.val() && snapshot.val().name) || 'Anonymous';   
      var a =snapshot.val();
     console.log(a);  
     console.log('user details');  
    });

  //    await firebase.database().ref('/user/')
  //  .on('value',(snapshot)=>{
  //     console.log(snapshot.val());
  //   });
   }
   catch (error) {
    console.log(error.toString())
  }
 }               
  
 constructor(props) {
   super(props);
   this.state = {
     name:'',
     age:'',
     phone:'',
     email:'',
     password1:'',
     password2:'',       
        ChatScreen: [],
        SignInScreen:[],
        MainScreen:[],
        TestScreeen:[],
     errors: [],
   }
   console.ignoredYellowBox = [
    'Setting a timer'
];
 }
 
 render() {
   const { navigate } = this.props.navigation;
   return (

    <Container>  
       <Content>
       <Image style={styles.Image}source={require('./pics/back2.jpg')}  > 
        <Button rounded style={styles.button} ><Icon name="home"  onPress={() => navigate('Home')} >
 <Text style={styles.button}>HOME</Text> </Icon></Button>
 <Text> </Text> 
 <Button rounded style={styles.button} onPress={() => this.getUserData()} >
 <Text style={styles.button}>check</Text></Button>
       <Text> </Text>  

      
       </Image>   
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
 emptyBox: {
  borderColor: '#e71636',
  //borderColor: '#000',
 borderWidth: 2.0,
 // backgroundColor: '#fff',
},
 view: {
textAlign: "center",
color : "rgb(3, 7, 33)",
fontWeight:'bold',
 },
 Image: {
   justifyContent :'center',
   flex:1,
   alignSelf:'center',  
   width:320 ,
   height:450,
  },
 button :{
   fontWeight:'bold',
   color:'white',
alignSelf:'center',
 }
});


const ChitChat = StackNavigator({
 Test:{screen : TestScreeen},
 Home: { screen: MainScreen },
 SignIn: { screen: SignInScreen },
 Chats: {screen: ChatScreen}
}); 
AppRegistry.registerComponent('ChitChat', () => ChitChat);


// import ValidationComponent from 'react-native-form-validator';



   
  /*  var config = {
     apiKey: "AIzaSyAixtgVVJgPxFhPvC3OcVAc7Mff4UNxE9Q",
     authDomain: "chitchat-f147c.firebaseapp.com",
     databaseURL: "https://chitchat-f147c.firebaseio.com",
     projectId: "chitchat-f147c",
     storageBucket: "chitchat-f147c.appspot.com",
     messagingSenderId: "329545529841"
   };
}
firebase.initializeApp(); 
*/
//database = firebase.database();
