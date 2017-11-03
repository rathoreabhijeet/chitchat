import React, { Component } from 'react';
import {   StyleSheet, Navigator, View,Image,TextInput,TouchableOpacity,BackHandler,ToastAndroid} from 'react-native';
import { Container,Footer,Form, Item,Button, Text ,Content,Header, Right,Left,Input} from 'native-base';
import { StackNavigator,} from 'react-navigation';
import * as firebase from "firebase";
import HomeScreen from './Home';
import ChatScreen from './ChatScreen';
import ContactScreen from './ContactScreen';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Entypo';
import firebaseApp from './Firebase';
export default class MainScreen extends React.Component {  
    static navigationOptions = {
      title: 'ChitChat', 
      header:null,
    };
    async Logout(email, password) { //function to logout current user
      const { navigate } = this.props.navigation; 
       try { 
      firebaseApp.auth().signOut().then(function() {    
      }).catch(function(error) {
         });        
    }
    catch (error) {
      console.log(error.toString())
   }         
  }// logout function closed
    constructor(props) {
      super(props);
      this.state = {
        ChatScreen: [],
        count:0,
        ContactScreen:[],
        errors: [],
        opacity1:1,
        height1:'auto',
        height2:0,
        opacity2:0,
        buttonTrue:true,
        searchButton:false
      }
    }
 
   componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
 }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
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
    setTimeout(() => {this.setState({count:0})}, 2000);
    return true; }
    else{
    BackHandler.exitApp()
    return false;
    }
    }
    render() {
        const { navigate } = this.props.navigation;
        const {goBack} = this.props.navigation;
        return (     
         <Container>        
     <Header searchBar rounded style={styles.header}>
       <Left>
       <Text style={styles.header}>ChitChat</Text>
     </Left>
 <Right>
 <Button transparent  onPress={() =>navigate('uprofile')}>
    <Icon name="user" size={25} color='white'/> 
    </Button>
    <Button  transparent   onPress={() => this.Logout()} >
    <Icon  name="log-out" size={25} color='white' />  
    </Button> 
     </Right>
     </Header>
            <ScrollableTabView
               style={{ borderColor: '#fff'}}
               tabBarUnderlineStyle={style = { backgroundColor: '#fff' }}
               tabBarBackgroundColor="#075e54"
               tabBarActiveTextColor="#fff"
               tabBarInactiveTextColor="#88b0ac"
               initialPage={1} >
                <ContactScreen
                 tabLabel="CONTACTS"
                 ContactsData={this.state.Contacts}
                 {...this.props}
               /> 
               <ChatScreen
                 tabLabel="CHATS"
                 ChatsData={this.state.Chats}
                 {...this.props}
               />             
             </ScrollableTabView>           
          </Container>
        );
      }
     }
     var styles = StyleSheet.create({
      
     Image: {
      justifyContent :'center',
      flex:1,
      alignSelf:'center',  
      width:320 ,
      height:450,
     },
     header:{
       backgroundColor:"#075e54",
       color:'white',
       fontWeight:'bold',
       fontSize:20,
     },
     overlay: {
      flex: 1,
      left:3,
      top:3,
      position: 'absolute',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color:'#fff',
    } ,
    });