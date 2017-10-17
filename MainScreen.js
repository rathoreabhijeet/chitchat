import React, { Component } from 'react';
import {   StyleSheet, Navigator, View,Image,TextInput,TouchableOpacity,BackHandler,ToastAndroid} from 'react-native';
import { Container,Footer,Form, Item,Button, Text ,Content,Header, Right,Left,Icon,Input} from 'native-base';
import { StackNavigator,} from 'react-navigation';
import * as firebase from "firebase";
import HomeScreen from './Home';
import ChatScreen from './ChatScreen';
import ContactScreen from './ContactScreen';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import firebaseApp from './Firebase';
import { Actions } from 'react-native-router-flux'
export default class MainScreen extends React.Component {  
    static navigationOptions = {
      title: 'ChitChat', 
      header:null,
    };
    async Logout(email, password) {
      const { navigate } = this.props.navigation; 
       try { 
      firebaseApp.auth().signOut().then(function() {
      // navigate('Test');
    
      }).catch(function(error) {
         });
        
    }
    catch (error) {
      console.log(error.toString())
   }         
  }
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
      // BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
      this.setState({
        height1:'auto',
        opacity1:1,
        buttonTrue:true
      })
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
    <Icon name="people"/> 
    </Button>
     <Button  transparent >
    <Icon name="search"/> 
    </Button>
 <Button  transparent   onPress={() => this.Logout()} >
    <Icon  name="log-out"  />  
    </Button> 
     </Right>
     </Header>
            <ScrollableTabView
               style={{ borderColor: '#fff' }}
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