import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,} from 'react-native';
import {Right,Left} from 'native-base';
import ParallaxView from 'react-native-parallax-view';
import RNFetchBlob from 'react-native-fetch-blob';
import Icon from 'react-native-vector-icons/MaterialIcons';
var ImagePicker = require('react-native-image-picker');
// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class UserProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
     // title: `${navigation.state.params.user}`,
    header:null,
    });
    constructor(props) {
      super(props);
      this.state = {
      avatarSource:'https://firebasestorage.googleapis.com/v0/b/chitchat-f147c.appspot.com/o/images%2Fdefault.png?alt=media&token=2c799112-82ac-4089-9ecd-66734f0e79fd',
        errors: [],
      }
    }
    uploadPhoto(userId){
      var options = {
        title: 'Select Avatar',
        // customButtons: [
        //   {name: 'fb', title: 'Choose Photo from Facebook'},
        // ],
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
    ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);
              
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                }
                else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                }
                else {
                  // let source = { uri: response.uri };
              
                  // You can also display the image using data:
                 let source = { uri: 'data:image/jpeg;base64,' + response.data };
                  // let source = 'data:image/jpeg;base64,' + response.data;
                  this.setState({
                    // avatarSource:source,
                    imageSrc:response,
                    file:response.fileName,
                  });
                  // alert("Uploading");
                  // this.upload(source)
                  this.uploadImage(response.uri,response.fileName)
                  .then(url => {this.setState({avatarSource: url}) })
                  .then(firebaseApp.database().ref('user/'+userId+'/'+ImageUrl).set({ImageURL:this.state.avatarSource}))
          .catch(error => console.log(error))
                }           
              });   }
    uploadImage(uri,name, mime = 'application/octet-stream') {
                return new Promise((resolve, reject) => {
                  const uploadUri = uri;
                  let uploadBlob = null;
            
                  const imageRef = firebaseApp.storage().ref('images/').child(name)
            
                  fs.readFile(uploadUri, 'base64')
                    .then((data) => {
                      return Blob.build(data, { type: `${mime};BASE64` })
                    })
                    .then((blob) => {
                      uploadBlob = blob
                      return imageRef.put(blob, { contentType: mime })
                    })
                    .then(() => {
                      uploadBlob.close()
                      return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                      resolve(url)
                    })
                    .catch((error) => {
                      reject(error)
                  })
                })
            }
    render()
    {  var name;
      var URL;
      var Phone_No;
      var date = new Date().toString();
      var userId = firebaseApp.auth().currentUser.uid;
      firebaseApp.database().ref().child('user').orderByChild('UID').equalTo(userId).on("value",function(snapshot) {
        
         snapshot.forEach(function(data) {
              name = data.val().Name;
              URL = data.val().ImageURL;
              Phone_No = data.val().Phone_No;
              
         });
     });
     // alert(name);
        return(            
  <ParallaxView 
    backgroundSource={{ uri:URL }}
    windowHeight={400}
    header={(
      <View>
      
        {/* <TouchableOpacity style={styles.header} onPress={() => this.uploadPhoto(userId)}>
          <Icon
            name="camera" color="#fff" size={23}
            style={{ paddingLeft: 10 }}
          />
        </TouchableOpacity> */}
        <Text style={styles.title}>{name}</Text>        
      </View>
    )}
    scrollableViewStyle={{ backgroundColor: '#ece5dd' }}
  >
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.text}>Mute</Text>
      </View>
      <View style={styles.row} >

        <Text style={styles.text}>Custom notifications</Text>
      </View>
      <View style={styles.encrypt}>
        <View>
          <Text style={styles.text}>Encryption</Text>
          <Text style={styles.subText}>Messages you send to this
          chat and calls are secured with end to end Encryption. Tap to verify</Text>
        </View>
        <Icon name="lock" color="#075e54" size={23} style={{ padding: 5 }} />
      </View>
    </View>
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.green}>Status and Phone</Text>
        <Text style={styles.text}>Good morning</Text>
        <Text style={styles.subText}>{date.substring(0,15)}</Text>
      </View>
      <View style={styles.number}>
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={styles.text}>{Phone_No}</Text>
          <Text style={styles.subText}>Mobile</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="chat" color="#075e54" size={23} style={{ padding: 5 }} />
          <Icon name="call" color="#075e54" size={23} style={{ padding: 5 }} />
          <Icon name="videocam" color="#075e54" size={23} style={{ padding: 5 }} />
        </View>
      </View>
    </View>
  </ParallaxView>
  );
}
}
const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
    marginTop: 270,
    padding: 20,
  },
  card: {
    marginTop: 8,
  },
  row: {
    height: 70,
    padding: 10,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  encrypt: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  number: {
    height: 50,
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
  subText: {
    fontSize: 12,
    color: '#555',
  },
  green: {
    color: '#075e54',
    fontSize: 20,
  },
});