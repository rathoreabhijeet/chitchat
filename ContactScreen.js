import React, { Component } from 'react';
import { Container, Header, Content, List,Title,Icon, ListItem,Segment,Button, Left, Body, 
  Right, Thumbnail, Text } from 'native-base';
import {  AppRegistry, StyleSheet,ListView,BackHandler,ToastAndroid,Dimensions} from 'react-native';
import firebaseApp from './Firebase';
import MessageScreen from './MessageScreen';
const { width, height } = Dimensions.get('window');
export default class ContactScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
    header :null,
 };
 constructor(props) {
  super(props);
  this.state = {     
    errors: [],
    count:0,
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  }
  this.userRef =firebaseApp.database().ref().child('user');
}

listenForItems(userRef) { //get the list of all the users signuped
  var userId = firebaseApp.auth().currentUser.uid;
  userRef.on('value', (snap) => {    
    var user = [];
    snap.forEach((child) => {
if (userId != child.key)
{
     user.push({
      name: child.val().Name,
      url: child.val().ImageURL,
      phone:child.val().Phone_No,
      uid:child.val().UID,
      _key: child.key,
      status:child.val().status     
    });
  }
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(user.reverse())
    });
  });
}// listenforitems function closed

componentDidMount() { // on page load call the function(listenforitems) to get list of all the user
  this.listenForItems(this.userRef);
}
_renderItem(Userdata) { //function to display details of each user in contact list
  const { navigate } = this.props.navigation;
  return (
    <ListItem avatar Userdata={Userdata} style={{marginBottom:0,width:width,marginLeft:0}} onPress={() => navigate('Message',{ Rid:Userdata._key,username: Userdata.name,status:Userdata.status,phone:Userdata.phone,url:Userdata.url  })}>
    <Left>
      <Thumbnail source={{ uri:Userdata.url  }} style={{marginLeft:8,borderWidth:1,borderColor:'gray',margin:3}} />
    </Left><Body>
      <Text>{Userdata.name}</Text></Body>
    </ListItem>
  );
}  
  render() {
    return (
      <Container style={styles.container}>
  
        <Content style={styles.container}>
        <ListView dataSource={this.state.dataSource}
renderRow={this._renderItem.bind(this)} enableEmptySections={true} style={styles.listview}>                      
          </ListView>        
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
    backgroundColor:'white',   
  },
  title: {
    fontWeight: 'bold',fontFamily: "vincHand",
    fontSize: 30,
    textAlign: "center",
    marginTop:25,
    
  },
  listview: {
    flex: 1,
    marginTop:5,
      },
});

