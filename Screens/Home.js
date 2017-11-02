import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image ,Linking, ToastAndroid,
   ActivityIndicator,BackHandler,Dimensions } from 'react-native';
import { Container, Content, Footer, Form, Item, Input, Button, Header } from 'native-base';
import { StackNavigator, } from 'react-navigation';
import ResponsiveImage from 'react-native-responsive-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { width, height } = Dimensions.get('window');//get the dimension of the device screen
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'HOME',
    header:null,
  };
  async Login(email, password) { //function for user login
      const { navigate } = this.props.navigation; 
    if (email =='' || password== '')
    {
      this.setState({hght:0,opac:0});
alert('Enter Email and Password');
    }
    else {
      try { 
        this.setState({hght:80,
          opac:1});
         firebaseApp.auth().signInWithEmailAndPassword(email, password)  //firebase signIn authenciation
           .then((firebaseUser)=> {
            //alert('login in');
            navigate('Main');
            this.setState({
              email: '',
              password: '',
              hght:0,opac:0
            }); 
  
          }, (error)=>{ // errror handler if error accur during login
            this.setState({hght:0,opac:0});
            var errorCode = error.code;
            var errorMessage = error.message;
             if (errorCode === 'auth/wrong-password') {
             alert('Wrong password!');
             this.setState({hght:0,opac:0});
             }
            else  if (errorCode === 'auth/invalid-email') {
               alert('Invalid Email!');
               this.setState({hght:0,opac:0});
             }
             else  if (errorCode === 'auth/user-not-found') {
               alert('User Not Found!');
               this.setState({hght:0,opac:0});
             }
             else { 
              alert(errorMessage);
              this.setState({hght:0,opac:0});
             }
          })          
          }
           catch (error) {
             console.log(error.toString())
          }  
    }
            
    }    
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      animating:true,
      errors: [],
      hght:0,
      opac:0,
      showToast: false,
      count:0
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
}
componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  this.setState({
    count:0,
  })
}
onBackPress(){
 
 BackHandler.exitApp()
 return false;
  
}
  render() {
    const { navigate } = this.props.navigation;
    return (
     <KeyboardAwareScrollView>
      <Container>
        <Content contentContainerStyle={{ flex: 1 }} disableKBDismissScroll>
        
          <View style={styles.upper}>
            <View style={styles.upperContent}>
              <View style={styles.logoDiv}>
                <ResponsiveImage source={ require('./pics/back.png') } initWidth="155" initHeight="128" style={{ alignSelf: 'center',borderRadius:10 }} />
              <Text style={{color:'#075e54',fontSize:20}}>ChitChat</Text>
              </View>
              <View style={styles.welcomeDiv}>
                <Text style={styles.welcome}> Welcome </Text>
              </View>
              <View style={styles.inputDiv}>
                <Input placeholder="Username" placeholderTextColor="gray" keyboardType="email-address"
                  onChangeText={(email) => this.setState({ email })} value={this.state.email} style={styles.inputbox} returnKeyType={'next'}
                  onSubmitEditing={() => this.pswdInput._root.focus()} />
                <Input placeholder="Password" secureTextEntry ref={(input) => { this.pswdInput = input; }} placeholderTextColor="gray"
                  onChangeText={(password) => this.setState({ password })} returnKeyType={'go'} value={this.state.password} style={styles.inputbox}
                  onSubmitEditing={() => this.Login(this.state.email, this.state.password)} />
              </View>
              
              <View style={styles.buttonDiv}>
                <Button rounded bordered onPress={() => { this.Login(this.state.email, this.state.password) }} style={styles.button}>
                  <Text style={styles.buttonText}>
                    LOG  IN
                </Text>
                </Button>
              </View>
              <View style={styles.overlay}>
         <ActivityIndicator  color='#075e54' animating={this.state.animating} size={70}
         style={{ height:this.state.hght,opacity:this.state.opac,}} 
           //style={{ height:100,opacity:1}} 
            />
     </View> 
            </View>
          </View>

          <View style={styles.lower} >
            <Text style={styles.bottomText} onPress={ ()=>{ navigate('SignIn')}}>Not Registered? SIGN UP!</Text>
        </View >
        </Content>       
      </Container>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaebeb'
  },
  upper: {
    flex: 8,
    alignItems: 'center',
    flexDirection:'row'
  },
  upperContent: {
    flexDirection: 'column',
    width:'100%'
  },
  logoDiv: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
   // backgroundColor:'#075e54',
  },
  welcomeDiv: {
    flex: 3,
    justifyContent: 'center',
    // backgroundColor: '#00f'
  },
  inputDiv: {
    flex: 4,
    justifyContent: 'center',
    // backgroundColor: '#0f0'
  },
  buttonDiv: {
    flex: 8,
    justifyContent: 'center',
    // backgroundColor: '#ff0'
  },
  lower: {
    flex: 1
  },
  welcome: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '300',
    color: '#364354'
  },
  overlay: { 
    height:65,
    width:70,  
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    position: "absolute",
    elevation: 4,
     top: '30%',
     //right: 0,
     //bottom:'70%',
     //left: 0,
     flexDirection: 'column',
     //backgroundColor:'blue'
       //justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    // padding:80,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: '#075e54',
    backgroundColor:'#075e54',
    width: '60%',
    height: 50
  },
  buttonText:{
    color: 'white',
    fontSize: 16
  },
  inputbox: {
    color: '#50616F',
    width: '100%',
    borderColor: '#E7ECEC',
    borderWidth: 1,
    backgroundColor: 'white',
    fontSize: 16,
    height: 30,
    paddingLeft: 30
  },
  text: {
    alignSelf: 'center',
    fontSize: 17,
    color: '#364354'
  },
  bottomText:{
    color: '#364354',
    fontSize: 16,
    fontWeight: '300',
    alignSelf: 'center',
  }
});


// import React, { Component } from 'react';
// import {  AppRegistry,StatusBar, StyleSheet, Navigator, View,Image,TextInput,ScrollView,
//  ToastAndroid, ActivityIndicator,BackHandler,Dimensions} from 'react-native';
// import { Container,Body, Form, Item,Input, Label,Button, Text ,Header,
//    Content,Left, Right, Icon, Toast} from 'native-base';
//    import { StackNavigator,} from 'react-navigation';
//   //  import MainScreen from './MainScreen';
//   //  import SignInScreen from './SignInScreen';
//   //  import ChatScreen from './ChatScreen';
//   //  import MessageScreen from './MessageScreen';
//   //  import ProfileScreen from './ProfileScreen';
//   //  import UserProfileScreen from './UserProfileScreen';
//    import ResponsiveImage from 'react-native-responsive-image';
//    import firebaseApp from './Firebase';

//    const { width, height } = Dimensions.get('window');//get the dimension of the device screen
// export default class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'HOME',
//     header:null,
//   };
//   async Login(email, password) { //function for user login
//       const { navigate } = this.props.navigation; 
//     if (email =='' || password== '')
//     {
//       this.setState({hght:0,opac:0});
// alert('Enter Email and Password');
//     }
//     else {
//       try { 
//         this.setState({hght:80,
//           opac:1});
//          firebaseApp.auth().signInWithEmailAndPassword(email, password)  //firebase signIn authenciation
//            .then((firebaseUser)=> {
//             //alert('login in');
//             navigate('Main');
//             this.setState({
//               email: '',
//               password: '',
//               hght:0,opac:0
//             }); 
  
//           }, (error)=>{ // errror handler if error accur during login
//             this.setState({hght:0,opac:0});
//             var errorCode = error.code;
//             var errorMessage = error.message;
//              if (errorCode === 'auth/wrong-password') {
//              alert('Wrong password!');
//              this.setState({hght:0,opac:0});
//              }
//             else  if (errorCode === 'auth/invalid-email') {
//                alert('Invalid Email!');
//                this.setState({hght:0,opac:0});
//              }
//              else  if (errorCode === 'auth/user-not-found') {
//                alert('User Not Found!');
//                this.setState({hght:0,opac:0});
//              }
//              else { 
//               alert(errorMessage);
//               this.setState({hght:0,opac:0});
//              }
//           })          
//           }
//            catch (error) {
//              console.log(error.toString())
//           }  
//     }
            
//     }    
//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',
//       animating:true,
//       errors: [],
//       hght:0,
//       opac:0,
//       showToast: false,
//       count:0
//     }
//   }
//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
// }
// componentWillUnmount() {
//   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
//   this.setState({
//     count:0,
//   })
// }
// onBackPress(){
 
//  BackHandler.exitApp()
//  return false;
  
// }
//   render() {
//     const { navigate } = this.props.navigation;
//     return (
      
//       <Container style={{ backgroundColor:'#075e54',flexDirection: 'column',}}>
//       <Content style={{flexDirection: 'column',width:'100%'}}>
//       <ScrollView overScrollMode={'auto'}>
//       {/* <ResponsiveImage source={ require('./pics/back.png') } style={{alignSelf:'center',}} initWidth="238" initHeight="238"/>  */}
//       <Header style={styles.header}>
//           <Body>
//             <Image source={ require('./pics/back.png') } style={styles.titleImage} />
//           </Body>
//         </Header>
//         <View style={{flex:3}}>
//         <TextInput placeholder="Email" placeholderTextColor="gray" keyboardType="email-address"
//         onChangeText={(email) => this.setState({ email })}   value={this.state.email}  style={styles.inputbox} returnKeyType={'next'}
//         onSubmitEditing={()=>this.pswdInput.focus()} />
//         <TextInput placeholder="Password" secureTextEntry ref={(input) => { this.pswdInput = input; }} placeholderTextColor="gray" 
//  onChangeText={(password) => this.setState({password})} returnKeyType={'go'} value={this.state.password} style={styles.inputbox}
//  onSubmitEditing={()=> this.Login(this.state.email,this.state.password)}/>
//              </View> 
//              <View style={styles.overlay}>
//         <ActivityIndicator
//           color='white'
//           animating={this.state.animating}
//           style={{height:this.state.hght,opacity:this.state.opac,elevation:4}}
//           size={100}
//         />
//   </View> 
//           <View style={{flex:3,flexDirection:'column',height:'100%'}}>
//           <View style={{height:120}}>
//              <Button rounded bordered onPress={() =>{ this.Login(this.state.email,this.state.password)}} style={styles.button}>
//           <Text style={styles.text}>
//             LOG  IN
//           </Text>
//         </Button></View>
//         <View style={{alignItems:'center',justifyContent:'center',bottom:1,}} >
//         <Text  style={styles.view} onPress={() => navigate('SignIn')}>Dont have an account? SignUp</Text>
//           </View >
//           </View> 
//      </ScrollView>
//         </Content>
//       </Container>
//     );
//   }
// }



// var styles = StyleSheet.create({
//   container: {
//     borderRadius: 4,
//     borderWidth: 0,
//     borderColor: 'white',
   
//   },
//   header: {
//     backgroundColor: '#075e54',
//     borderBottomColor: 'transparent',
//     height: height*0.4,
//   },
//   titleImage: {
//     height: height*0.5,
//     width: '50%',
//     alignSelf: 'center',
//     resizeMode: 'contain'
//   },
//   overlay: {
//     flex: 1,
//     top: 0,
//     right: 0,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//   } ,
//   button :{
//    // fontWeight:'bold',
//   //  fontSize:25,
//   padding:5,
//   margin:10,
//     color:'white',
//  alignSelf:'center',
//  justifyContent:'center',
//  borderColor:'white',
//   },
//   view: {
// textAlign: "center",
// color:'white',
//   },
//   inputbox: {
//     color:'white',
//   //  borderColor:'white',
//     fontWeight:'bold',
//     fontSize:20,
//     padding:10,
//     height:60,
//     maxHeight:70
//     //textAlign: "center",
//    // borderBottomWidth:2, 
//   },
//   text:{
//     fontWeight:'bold',
//     //  fontSize:25,
//       color:'white',
//    alignSelf:'center',
//    justifyContent:'center',
//    borderColor:'white',
//    fontSize:20,
//   },
// });
