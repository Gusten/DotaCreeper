'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
  View
} from 'react-native';
import { steamApiKey } from './steamApiKey';

var id;
var data;
var killScore = {rad: 0, dir: 0};

class MatchDetails extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.navigate.bind(this);
    this.refreshMatchData = this.refreshMatchData.bind(this);
    this.refreshMatchData();
  }

  componentWillMount() {
	this.interval = setInterval(this.refreshMatchData, 15000);
  }	

  componentWillUnmount() {
	clearInterval(this.interval);
  }

  refreshMatchData() {
  	fetch("https://api.steampowered.com/IDOTA2Match_570/GetMatchDetails/v1/?key=" + steamApiKey + "&match_id=" + this.props.matchId)
  		.then((response) => response.json())
  		.then((responseData) => {
  			if(responseData["radiant_score"] && responseData["dire_score"]) {
  				killScore = {rad: responseData["radiant_score"],
  							 dir: responseData["dire_score"]};
  			}
  		})
  	.done();
  }

  navigate(name) {
  	this.props.navigator.pop();
  }

  render() {    
    return (
      <View style={styles.container}>
	    <TouchableHighlight underlayColor="white" onPress={this.navigate} style={styles.listViewItem}>
	      <Text style={{ fontSize:18 }}>{"Go back"}</Text>
	    </TouchableHighlight>
	    <TouchableHighlight underlayColor="white" style={styles.listViewItem}>
	      <Text style={{ fontSize:18 }}>{(killScore["rad"] + " vs " + killScore["dir"])}</Text>
	    </TouchableHighlight>
        <Image
          style={styles.minimap}
          source={require('./minimap.png')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listViewItem: {
    height:60, 
    backgroundColor: '#efefef', 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd', 
    flexDirection:'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  container: {
    flex: 1,
	  backgroundColor: '#fff',
  },
  minimap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  },
});

module.exports = MatchDetails;