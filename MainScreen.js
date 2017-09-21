import React, { Component } from 'react';
import {   StyleSheet, Navigator, View,Image,TextInput,TouchableOpacity} from 'react-native';
import { Container,Footer,Form, Item,Button, Text ,Content,Header, Right,Left,Icon} from 'native-base';
import { StackNavigator,} from 'react-navigation';
import * as firebase from "firebase";
import HomeScreen from './Home';
import ChatScreen from './ChatScreen';
import ContactScreen from './ContactScreen';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import firebaseApp from './Firebase';

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
        ContactScreen:[],
        errors: [],
      }
    }

    render() {
        const { navigate } = this.props.navigation;
        const {goBack} = this.props.navigation;
        return (     
         <Container>        
     <Header style={styles.header}>
       <Left>
       <Text style={styles.header}>ChitChat</Text>
     </Left>
 <Right>
 <Button transparent  onPress={() =>navigate('uprofile')}>
    <Icon name="people"/> 
    </Button>
     <Button transparent>
    <Icon name="search"/> 
    </Button>
 <Button style={{backgroundColor:"#075e54" }}  onPress={() => this.Logout()} >
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
     }
    });