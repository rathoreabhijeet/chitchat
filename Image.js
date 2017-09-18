import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,ListView,Image} from 'react-native';
import {Button,ListItem,Thumbnail} from 'native-base';
var ImagePicker = require('react-native-image-picker');
import firebaseApp from './Firebase';


// Launch Camera:
// ImagePicker.launchCamera(options, (response)  => {
//   // Same code as in above section!
//   if (response.didCancel) {
//     console.log('User cancelled image picker');
//   }
//   else if (response.error) {
//     console.log('ImagePicker Error: ', response.error);
//   }
//   else if (response.customButton) {
//     console.log('User tapped custom button: ', response.customButton);
//   }
//   else {
//     let source = { uri: response.uri };

//     // You can also display the image using data:
//     // let source = { uri: 'data:image/jpeg;base64,' + response.data };

//     this.setState({
//       avatarSource: source
//     });
//   }
// });

// // Open Image Library:
// ImagePicker.launchImageLibrary(options, (response)  => {
//   // Same code as in above section!
//   if (response.didCancel) {
//     console.log('User cancelled image picker');
//   }
//   else if (response.error) {
//     console.log('ImagePicker Error: ', response.error);
//   }
//   else if (response.customButton) {
//     console.log('User tapped custom button: ', response.customButton);
//   }
//   else {
//     let source = { uri: response.uri };

//     // You can also display the image using data:
//     // let source = { uri: 'data:image/jpeg;base64,' + response.data };

//     this.setState({
//       avatarSource: source
//     });
//   }
// });



export default class ChitChat extends Component {
  constructor() {
    super();
   this.state={
    avatarSource:''
   }
  }
 upload(file) {
 firebaseApp.storage().ref().child('pp/').putString(file.png, 'base64').then(function(snapshot) {
  alert('Uploaded a blob or file!');
});
    
   
 }
//  _renderItem() {
//   var options = {
//     title: 'Select Avatar',
//     // customButtons: [
//     //   {name: 'fb', title: 'Choose Photo from Facebook'},
//     // ],
//     storageOptions: {
//       skipBackup: true,
//       path: 'images'
//     }
//   };
  
//   ImagePicker.showImagePicker(options, (response) => {
//    console.log('Response = ', response);
//     // alert('Response = ', response);
  
//     if (response.didCancel) {
//       //console.log('User cancelled image picker');
//       alert('User cancelled image picker');
//     }
//     else if (response.error) {
//      // console.log('ImagePicker Error: ', response.error);
//       alert('ImagePicker Error: ', response.error);
//     }
//     else if (response.customButton) {
//      // console.log('User tapped custom button: ', response.customButton);
//       alert('User tapped custom button: ', response.customButton);
//     }
//     else {
//       let source = { uri: response.uri };
  
//       // You can also display the image using data:
//       // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
//       this.setState({
//         avatarSource: source
//       });  
//      this.upload(response.data);
         
//      }
//   });
// }

  render() {
   // var file= 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKJfsIs-m8248fRaDOcaMD1ZbNHTrUdoN7gG-NbPFUlxC6hHgHXQiZlf7b';
    var file= './pics/1.png';
    return (
      <View >
        <Text style={styles.welcome}>
          Welcome to React Native
        </Text>

        <Button rounded onPress={() =>this._renderItem()}><Text>Photo</Text></Button>

<Image source={this.state.avatarSource}/>
{/* <Image source={ require('./pics/chatapp.png') }/> */}
{/* <Thumbnail source={{ uri: this.state.avatarSource }} /> */}
        <Button rounded onPress={() => this.upload(file)}><Text>UPLOAD</Text></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('ChitChat', () => ChitChat);
