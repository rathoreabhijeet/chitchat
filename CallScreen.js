import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessageScreen from './MessageScreen';

const { width } = Dimensions.get('window');

export default class CallScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
     // title: `${navigation.state.params.user}`,
    header:null,
    });

render() {
  const { navigate } = this.props.navigation;
  var Userdata =this.props.navigation.state.params;

return (
  <View style={{ flex: 1 }}>
    <View style={styles.topBar}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name="whatshot" color="#c3c3c3" size={14} />
        <Text style={styles.subText}>ChitChat Call</Text>
      </View>
      <Text style={styles.title}>{this.props.navigation.state.params.name}</Text>
      <Text style={styles.subText}>CALLING</Text>
    </View>
    <Image source={{ uri: this.props.navigation.state.params.url }} style={styles.image}>
      <TouchableOpacity onPress={() => navigate('message')}>
        <View style={styles.icon}>
          <Icon name="call-end" color="#c3c3c3" size={30} /></View>
      </TouchableOpacity>
    </Image>
    <View style={styles.bottomBar}>
      <Icon name="volume-up" color="#c3c3c3" size={30}/>
      <Icon name="chat" color="#c3c3c3" size={30} />
      <Icon name="mic-off" color="#c3c3c3" size={30} />
    </View>
  </View>
  );
} }

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: '#075e54',
    height: 140,
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e20e30',
    marginTop: 250 },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#075e54',
    flex: 1,
  },
  title: {
    color: '#f0efef',
    fontSize: 36,
  },
  subText: {
    color: '#c8c8c8',
    fontSize: 14,
  },
});