import React, { Component } from 'react';
import { Container, Header, Content, List,Title,Icon, ListItem,Segment,Button, Left, Body, 
  Right, Thumbnail, Text } from 'native-base';
import {  AppRegistry, StyleSheet,ListView} from 'react-native';
import firebaseApp from './Firebase';
import MessageScreen from './MessageScreen';

export default class ContactScreen extends Component {
  static navigationOptions = {
    title: 'Chats',
    header :null,
 };
 constructor(props) {
  super(props);
  this.state = {     
    errors: [],
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  }
  this.userRef =firebaseApp.database().ref().child('user');
}

listenForItems(userRef) {
  var userId = firebaseApp.auth().currentUser.uid;
  userRef.on('value', (snap) => {    
    var user = [];
    snap.forEach((child) => {
      // if (userId != child.val().UID)
      // {
     user.push({
      name: child.val().Name,
      url: child.val().ImageURL,
      phone:child.val().Phone_No,
      uid:child.val().UID,
      _key: child.key
     
    });
 // }
    });
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(user.reverse())
    });
  });
}

componentDidMount() {
  this.listenForItems(this.userRef);
}

_renderItem(Userdata) {
  const { navigate } = this.props.navigation;
  return (
    <ListItem avatar Userdata={Userdata} style={{margin:3}} onPress={() => navigate('Message',{ username: Userdata.name,Rid:Userdata._key,phone:Userdata.phone,url:Userdata.url  })}>
    <Left>
      <Thumbnail source={{ uri:Userdata.url  }} />
    </Left><Body>
      <Text>{Userdata.name}</Text></Body>
    </ListItem>
  );
}  
  render() {
    return (
      <Container>
  
        <Content>
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
   
  },
  title: {
    fontWeight: 'bold',fontFamily: "vincHand",
    fontSize: 30,
    textAlign: "center",
    marginTop:25,
    
  },
  listview: {
    flex: 1,
  },
});

