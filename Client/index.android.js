/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  Image,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var steamApiKey = "6F39056ADA5041ED08F9480773890A58";
var RNFS = require('react-native-fs');

class DotaCreeper extends Component {
  
  refresh() {
	fetch("https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v1/?key=" + steamApiKey)
		.then((response) => response.json())
		.then((responseData) => {
			for(var i = 0; i < responseData.result.games.length; i++){
				if(responseData.result.games[i].hasOwnProperty("radiant_team")) {
					//console.log(responseData.result.games[i]["radiant_team"]["team_name"])
				}
			}
		})
	.done();
  }	
	
  componentDidMount() {
	  this.interval = setInterval(this.refresh, 15000);
  }	
  
  componentWillUnmount() {
	  clearInterval(this.interval);
  }

  render() {
    return (
      <View style={styles.container}>
		<Image
		  style={styles.icon}
		  source={require('./minimap.png')}
		/>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('DotaCreeper', () => DotaCreeper);
