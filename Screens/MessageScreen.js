import React from 'react';
import { Container, Header,Footer,FooterTab,Body,Title,Content,Card,CardItem,Form,Item,Input,Label,Button,
Text,View,Div,Left,Right,ListItem ,Thumbnail,Fab} from 'native-base';
import {  AppRegistry, StyleSheet,TouchableOpacity,ListView,BackHandler,ScrollView,Dimensions} from 'react-native';
import firebaseApp from './Firebase';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AutoScroll from 'react-native-auto-scroll';
var user = firebaseApp.auth().currentUser;
var senderId,receiverId;
const { width, height } = Dimensions.get('window');
export default class MessageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  header:null,
  });
 
  constructor(props) {
    super(props);
    this.state = {
      message:'',
      keyDb:'',
       dataSource:new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      errors: [],
    }
    var Ukey; // current user key
    var keyDb; // current user key + user receving message key 
    var Rkey= this.props.navigation.state.params.Rid; //user receving message key 
    var userId = firebaseApp.auth().currentUser.uid;
    receiverId=Rkey;
    senderId=userId;
    firebaseApp.database().ref().child('user').orderByChild('UID').equalTo(userId).on("value",function(snapshot) {
       
        snapshot.forEach(function(data) {
            Ukey=data.key;
        });
    });
    if(Rkey.toLowerCase()>=Ukey.toLowerCase()){
            keyDb=(Rkey+Ukey);
            this.state.keyDb=keyDb;
        }
        else{
            keyDb=Ukey+Rkey;
            this.state.keyDb=keyDb;
        }
    this.chatRef =firebaseApp.database().ref().child('ChatMessages/'+keyDb+'/');
 // }//constructor closed
  this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}

componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
}

  sendMessage(message,date,Ukey,Rkey) { 
    this.setState({
      message: ''
  }); 
   
var keyDb;
if(Rkey.toLowerCase()>=Ukey.toLowerCase()){
        keyDb=(Rkey+Ukey);
        this.state.keyDb=keyDb;
    }
    else{
        keyDb=Ukey+Rkey;
        this.state.keyDb=keyDb;
    }
    if(message != '')
    {
    firebaseApp.database().ref('ChatMessages/'+keyDb+'/').push({ //store messages in database
      text:message,
      date:date,
      senderId:Ukey,
      receiverId:Rkey,
      read:false,
    });
    firebaseApp.database().ref('Unread/'+Rkey+'/'+Ukey+'/').push({ //store the unread messages
      text:message,
    })

   var userRef =firebaseApp.database().ref('user/'+Ukey).child('ChatWith');
   
   userRef.on('value', (snap) => {  
    var userexist=0;  
    snap.forEach((child) => {     
      if (child.val().ID == Rkey)
      {
        userexist=1;
      }     
    });
    if (userexist != 1)
    {
    firebaseApp.database().ref('user/'+Ukey).child('ChatWith').push({
      ID:Rkey,
     });
    }
  });

  var ReciverRef =firebaseApp.database().ref('user/'+Rkey).child('ChatWith');
  
  ReciverRef.on('value', (snap) => {  
   var userexist=0;  
   snap.forEach((child) => {     
     if (child.val().ID == Ukey)
     {
       userexist=1;
     }     
   });
   if (userexist != 1)
   {
   firebaseApp.database().ref('user/'+Rkey).child('ChatWith').push({
     ID:Ukey,
    });
   }
 });
  
      }  
  }

  listenForItems(chatRef) { //get all the messages stored in database
    
    chatRef.on('value', (snap) => {    
      var messages = [];
      snap.forEach((child) => {
       messages.push({
        message: child.val().text,
        sender:child.val().senderId,
        date:child.val().date,
        _key: child.key
      });
  
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(messages)
      });
    });
  }
  
  componentDidMount() {
    this.listenForItems(this.chatRef);
    firebaseApp.database().ref('Unread/'+senderId+'/'+receiverId+'/').remove();
    //BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

// componentWillUnmount() {
//   BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
// }
//onBackPress(){ 
  //this.props.navigation.goBack();
 // BackHandler.removeEventListener('hardwareBackPress');
 // this.props.navigation.navigate('Main');
 //return true;    
//}

  _renderItem(msg)
   {             //display messages between two users
    var userId = firebaseApp.auth().currentUser.uid;
    if(msg.sender == userId)
    {
      return (  //messages send by current user(self)
    <View style={styles.rightMsg} >
    <View style={styles.rightBlock} >   
      <Text style={styles.rightTxt}>{msg.message}</Text>
       <Right><Text note style={{color:'grey'}}>{msg.date.substring(16,21)}</Text></Right>                  
    </View>
    </View>
        );
    }
    else    {
      return (  // messages send by other person (receiver)
     <View style={styles.eachMsg}>
         <View style={styles.msgBlock}>
              <Text style={styles.msgTxt}>{msg.message}</Text>
          <Text note style={{color:'grey'}}>{msg.date.substring(16,21)}</Text>
      </View>
     </View>
    );}
  }

  render() {
    const { navigate } = this.props.navigation;
   var user= this.props.navigation.state.params
    var date = new Date().toString();
    var Ukey;
    var keyDb;
    var Rkey= user.Rid;
    var userId = firebaseApp.auth().currentUser.uid;
    firebaseApp.database().ref().child('user').orderByChild('UID').equalTo(userId).on("value",function(snapshot) {
       
        snapshot.forEach(function(data) {
            Ukey=data.key;
        });
    });
    return (
      <Container style={styles.container} >
         
           <Header style={styles.header}>
             <Icon name='arrow-back' size={28} style={styles.icon} onPress={() => this.props.navigation.goBack() } />          
          <TouchableOpacity style={styles.photo} onPress={() =>navigate('profile',{status:user.status,name:user.username,phone:user.phone,url:user.url})}>
               <Thumbnail source={{ uri: user.url }} /></TouchableOpacity>
           <TouchableOpacity style={styles.Username} onPress={() =>navigate('profile',{status:user.status,name:user.username,phone:user.phone,url:user.url})}>
           <Text style={{fontSize:20,color:"#fff",marginLeft:1}}>{user.username}</Text>
           </TouchableOpacity>
          </Header>
          <Content >
            <ScrollView  >         
            <ListView 
              enableEmptySections
              //noScroll
              scrollsToEnd={true}
            // renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                dataSource={this.state.dataSource}
              contentContainerStyle={{ justifyContent: 'flex-end' }}
              renderRow={this._renderItem.bind(this)}
              style={{ flex: 1 }}/>             
        
             </ScrollView>
           </Content>        

    <Footer style={{backgroundColor:'gray',}} >
               <Item regular style={{width:'100%',backgroundColor:'white',flexDirection:'row',flex:1}}>              
 <Input multiline = {true}  numberOfLines = {2} style={{flex:8, }}
   onChangeText={(message) => this.setState({ message })}   value={this.state.message} />
       <View style={styles.sendButtonDiv}>   
         <Icon name="send" color="#075e54" size={35} 
          onPress={() => this.sendMessage(this.state.message,date,Ukey,Rkey)}/>
          </View>
               </Item>
            </Footer> 
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
    header:{
backgroundColor:"#075e54",
//fontSize:25,
//color:"#fff",
height:65,
flexDirection:'row',
justifyContent:'center',
alignItems:'center'
    },
    icon:{
      flex:1,
      color:'white',
      alignSelf:'center'
    },
    photo:{
      flex:2,
      alignSelf:'center'
    },
    Username:{
      flex:7
    },
    title: {
      fontWeight: 'bold',fontFamily: "vincHand",
      fontSize: 30,
      textAlign: "center",
      marginTop:25,
      
    },
    eachMsg: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      margin: 5,
    },
    msgBlock: {
     maxWidth: '80%',
      borderRadius: 5,
      backgroundColor: '#ffffff',
      padding: 10,
      shadowColor: '#3d3d3d',
      shadowRadius: 2,
      shadowOpacity: 0.5,
      shadowOffset: {
        height: 1,
      } },
      msgTxt: {
        fontSize: 15,
        color: '#555',
        fontWeight: '600',
      },
      rightMsg: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',
      },
      rightBlock: {
        maxWidth: '80%',
        borderRadius: 5,
        backgroundColor: '#97c163',
        padding: 10,
        shadowColor: '#3d3d3d',
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
          height: 1,
        },
      },
      rightTxt: {
        fontSize: 15,
        color: '#202020',
        fontWeight: '600',
      },
     
    sendButtonDiv:{
      // backgroundColor: '#075e54',
       flex:2,
       justifyContent:'center',
       alignItems:'center',
       height:'100%',
  }
  });

