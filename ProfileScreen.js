import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ParallaxView from 'react-native-parallax-view';

export default class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
    header:null,
    });
    render()
    {
      var date = new Date().toString();
      var user = this.props.navigation.state.params;
        return(            
  <ParallaxView
    backgroundSource={{ uri: user.url }}
    windowHeight={400}
    header={(
      <View>
        {/* <TouchableOpacity style={styles.header} onPress={() => alert('back')}>
          <Icon
            name="arrow-back" color="#fff" size={23}
            style={{ paddingLeft: 10 }}
          />
        </TouchableOpacity> */}
        <Text style={styles.title}>{user.name}</Text>
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
          <Text style={styles.text}>{user.phone}</Text>
          <Text style={styles.subText}>Mobile</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="chat" color="#075e54" size={23} style={{ padding: 5 }}  />
          <Icon name="call" color="#075e54" size={23} style={{ padding: 5 }}  />
          <Icon name="videocam" color="#075e54" size={23} style={{ padding: 5 }}/>
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