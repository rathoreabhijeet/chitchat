import React from 'react';
import { Container, Header,Footer,FooterTab,Body,Title,Content,Card,CardItem,Form,Item,Input,Label,Button,
Icon,Text,View,Div,Left,Right,ListItem ,Thumbnail,} from 'native-base';
import {  AppRegistry, StyleSheet,TouchableOpacity,ListView} from 'react-native';
import firebaseApp from './Firebase';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

var user = firebaseApp.auth().currentUser;
export default class MessageScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
   // title: `${navigation.state.params.user}`,
  header:null,
  });
 
  constructor(props) {
    super(props);
    this.state = {
      message:'',
      keyDb:'',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      errors: [],
    }
    var Ukey;
    var keyDb;
    var Rkey= this.props.navigation.state.params.Rid;
    var userId = firebaseApp.auth().currentUser.uid;
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
  }//constructor closed


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
    firebaseApp.database().ref('ChatMessages/'+keyDb+'/').push({
      text:message,
      date:date,
      senderId:Ukey,
      receiverId:Rkey,
      read:false,
    });

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

  listenForItems(chatRef) {
    
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
        dataSource: this.state.dataSource.cloneWithRows(messages.reverse())
      });
    });
  }
  
  componentDidMount() {
    this.listenForItems(this.chatRef);
  }
  
  _renderItem(msg)
   { 
    var userId = firebaseApp.auth().currentUser.uid;
    if(msg.sender == userId)
    {
      return (
    <View style={styles.rightMsg} >
    <View style={styles.rightBlock} >
      <Text style={styles.rightTxt}>{msg.message}</Text>
     <Right><Text note style={{color:'grey'}}>{msg.date.substring(16,21)}</Text></Right>
    </View>
    </View>
        );
    }
    else    {
      return ( 
        <View style={styles.eachMsg}>
        <View style={styles.msgBlock}>
          <Text style={styles.msgTxt}>{msg.message}</Text>
          <Text note style={{color:'grey'}}>{msg.date.substring(16,21)}</Text>
        </View>
      </View>);}
      
  
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
    // var user=this.props.navigation.state.params;
    return (
      <Container style={styles.container} >
         
           <Header style={styles.header}>          
           <Left>
           <TouchableOpacity onPress={() =>navigate('profile',{name:user.username,phone:user.phone,url:user.url})}>
<Thumbnail source={{ uri: user.url }} /></TouchableOpacity>
</Left>
<TouchableOpacity onPress={() =>navigate('profile',{name:user.username,phone:user.phone,url:user.url})}>

<Body><Text style={styles.header}>{user.username}</Text></Body>
</TouchableOpacity>
        <Right>
          <Button style={{backgroundColor:"#075e54" }} onPress={() =>navigate('call',{name:user.username,url:user.url})}><Icon name="call"/>
          </Button></Right>
          </Header>
          <Content >
         <ListView
              enableEmptySections
              noScroll
              renderScrollComponent={props =>
                <InvertibleScrollView {...props} inverted />}
                dataSource={this.state.dataSource}
              contentContainerStyle={{ justifyContent: 'flex-end' }}
              renderRow={this._renderItem.bind(this)}
              style={{ flex: 1 }}/>

            
           </Content>                             
    <Footer style={{height:80}}>
               <Item regular style={{width:'100%',backgroundColor:'white'}}>              
 <Input multiline = {true}  numberOfLines = {3}
   onChangeText={(message) => this.setState({ message })}   value={this.state.message} />

         <Button transparent iconRight onPress={() => this.sendMessage(this.state.message,date,Ukey,Rkey)}>
                   <Text>Send</Text>
                      <Icon name='arrow-forward' />
                   </Button>
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
fontSize:25,
color:"#fff",
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
  });

