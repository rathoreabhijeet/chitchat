import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet,ActivityIndicator,BackHandler,Button,
   Modal,TextInput,Dimensions} from 'react-native';
import {Right,Left,Spinner} from 'native-base';
import ParallaxView from 'react-native-parallax-view';
import RNFetchBlob from 'react-native-fetch-blob';
import { StackNavigator,} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
var ImagePicker = require('react-native-image-picker');

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
 var URL;
 const { width, height } = Dimensions.get('window');
export default class UserProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
    header:null,
    });
   
    constructor(props) {
      super(props);
      this.state = {
      avatarSource:'',
        errors: [],
        hght:0,
        opac:0,
        heightStatus:'auto',
        opacityStatus:1,
        status:'Hey, Check out the ChitChat!!',
        editStatus:false,
        editHeight:0,
        editOpacity:0,
        inputVisible:false,
        editWidth:0,
        penHeight:25,
        penOpacity:1,
        saveHeight:0,
        saveOpacity:1
      }
      var userId = firebaseApp.auth().currentUser.uid;
      firebaseApp.database().ref().child('user').orderByChild('UID').equalTo(userId).on("value",function(snapshot) {
        
         snapshot.forEach(function(data) {
              name = data.val().Name;
              URL= data.val().ImageURL;
              Phone_No = data.val().Phone_No;
              status=data.val().status;
              
         });
     });
     this.state.avatarSource=URL;
     this.state.status=status;
    }
    componentDidMount(){
      BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
          }
    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }
    onBackPress(){ 
      this.props.navigation.goBack();
     //return true;    
    }
 
    uploadPhoto(userId){ //function to upload profile photo
      var pic;
      var options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      };
    ImagePicker.showImagePicker(options, (response) => { 
                console.log('Response = ', response);
                this.setState({hght:100,
                  opac:1});
                if (response.didCancel) {
                  this.setState({hght:0,opac:0});
                  console.log('User cancelled image picker');
                }
                else if (response.error) {
                  this.setState({hght:0,opac:0});
                  console.log('ImagePicker Error: ', response.error);
                }
                else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                }
                else {
                 let source = { uri: 'data:image/jpeg;base64,' + response.data };
                  this.setState({
                    imageSrc:response,
                    file:response.fileName,
                  });
                  this.uploadImage(response.uri,response.fileName)
                  .then(url => {
                    console.log(url),this.setState({avatarSource: url}) 
                    setTimeout(() => firebaseApp.database().ref('user/'+userId).update({ ImageURL: this.state.avatarSource }), 8000)
                  },
                  (err)=>{
                    console.log(err);
                  })
                  
        // setTimeout(() => firebaseApp.database().ref('user/'+userId).update({ ImageURL: this.state.avatarSource }), 9000))                
                
          .catch(error => console.log(error))
                }          
              });   }
    uploadImage(uri,name, mime = 'application/octet-stream') { // function to upload image to firebase
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
                      uploadBlob.close();
                      this.setState({hght:0,opac:0});
                      return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                      resolve(url);
                    })
                    .catch((error) => {
                      reject(error);
                  })
                })
            }  
            editStatus() { this.setState({
              inputVisible:true,
              editStatus:true,
              heightStatus:0,
              editHeight:'auto',
              editOpacity:1,
              opacityStatus:0,
              editWidth:'85%',
              penHeight:0,
              penOpacity:0,
              saveHeight:25,
              saveOpacity:1
            }); }    
            updateStatus(){
              this.setState({
                inputVisible:false,
                editStatus:false,
                heightStatus:'auto',
                editHeight:0,
                editOpacity:0,
                opacityStatus:1,
                editWidth:'0%',
                penHeight:25,
                penOpacity:1,
                saveHeight:0,
                saveOpacity:0
              });
              var userId = firebaseApp.auth().currentUser.uid;
              firebaseApp.database().ref('user/'+userId).update({ status: this.state.status });
            }
    getStatus(){
      var userId = firebaseApp.auth().currentUser.uid;

    }        
   
    render()
    {  var name;
      var Phone_No;
      var date = new Date().toString();
      var userId = firebaseApp.auth().currentUser.uid;
      firebaseApp.database().ref().child('user').orderByChild('UID').equalTo(userId).on("value",function(snapshot) {
        
         snapshot.forEach(function(data) {
              name = data.val().Name;
              URL= data.val().ImageURL;
              Phone_No = data.val().Phone_No;
              
         });
     });
        return(            
  <ParallaxView 
    backgroundSource={{ uri:this.state.avatarSource}}
    windowHeight={height*0.7}
    header={(
      <View>
 <View style={styles.overlay}>
      <ActivityIndicator
        color='#075e54'
        animating={this.state.animating}
        style={{height:this.state.hght,opacity:this.state.opac}}
        size={100}
      />
</View>
     <View style={{flexDirection:'row'}}>
       <Icon name='arrow-back' size={30} style={styles.backicon} onPress={() => this.props.navigation.goBack() } />
       <TouchableOpacity style={styles.editbutton} onPress={() => this.uploadPhoto(userId)}>
          <Icon name="edit" color="#075e54" size={33}/>
       </TouchableOpacity>
     </View>
        <Text style={styles.title}>{name}</Text>        
      </View>
    )}  scrollableViewStyle={{ backgroundColor: '#ece5dd' }} >

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
        <View style={{flexDirection:'row'}}>
        <Text  style={[styles.text,{width:'85%',height:this.state.heightStatus,opacity:this.state.opacityStatus}]}>{this.state.status}</Text>
        <TouchableOpacity style={{alignSelf: 'flex-end',opacity:this.state.penOpacity}} onPress={() => { this.editStatus() }} >
          <Icon name="edit" color="#075e54" size={this.state.penHeight} style={{ padding: 5 }}
          />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}>
        <TextInput multiline={true} maxLength={200} visible={this.state.inputVisible} value={this.state.status} onChangeText={(status) => this.setState({status})} editable={this.state.editStatus} style={{width:this.state.editWidth,height:this.state.editHeight,opacity:this.state.editOpacity}}/>
        <TouchableOpacity style={{alignSelf: 'flex-end',opacity:this.state.saveOpacity}}  blurOnSubmit={true} onPress={() => { this.updateStatus() }} >
          <Icon name="save" color="#075e54" size={this.state.saveHeight} style={{ padding: 5 }}
          />
        </TouchableOpacity>
        </View>
        <Text style={styles.subText}>{date.substring(0,15)}</Text>
      </View>
      <View style={styles.number}>
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={styles.text}>{Phone_No}</Text>
          <Text style={styles.subText}>Mobile</Text>
        </View>
      </View>
    </View>
  </ParallaxView>
  );
}
}
const styles = StyleSheet.create({
  editbutton: {
 justifyContent: 'flex-end',
  alignItems: 'flex-end',
  },
  backicon:{
    flex:2,
    color:'black',
    //alignSelf:'flex-start'
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: '600',
    marginTop: '80%',
    padding: 20,
  },
  card: {
    marginTop: 8,
  },
  overlay: {
    flex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  } ,
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#f5f5f5',
    backgroundColor: '#fff',
  },
  encrypt: {
    height: 70,
    padding:30,
   //paddingHorizontal: 20,
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
  container: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 100
 }
});