import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { steamApiKey } from './steamApiKey';
import ScrollableTabView from 'react-native-scrollable-tab-view';

class Main extends Component {
  constructor(props) {
    super(props);
  	this.refresh = this.refresh.bind(this);
  	this.renderRow = this.renderRow.bind(this);
    this.navigate = this.navigate.bind(this);
    this.state = {
      matchDetails: false,
    };
  }
  
  refresh() {
  	fetch("https://api.steampowered.com/IDOTA2Match_570/GetLiveLeagueGames/v1/?key=" + steamApiKey)
  		.then((response) => response.json())
  		.then((responseData) => {
  			var teamsPlaying = [];
  			for(var i = 0; i < responseData.result.games.length; i++){
  				if(responseData.result.games[i].hasOwnProperty("radiant_team") && responseData.result.games[i].hasOwnProperty("dire_team")) {
    					teamsPlaying.push({
                                name: (responseData.result.games[i]["radiant_team"]["team_name"] +
                            					"   vs   " +
                            					responseData.result.games[i]["dire_team"]["team_name"]),
                                matchId: responseData.result.games[i]["match_id"]});
    			}
  			}
  			this.setState({
  				dataSource: this.state.ds.cloneWithRows(teamsPlaying)
  			});
  		})
  	.done();
  }
  
  componentWillMount() {
	  this.interval = setInterval(this.refresh, 15000);
	  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.setState({
  		ds: ds,
  		dataSource: ds.cloneWithRows(["test"])
    });
  }	
  
  componentWillUnmount() {
	  clearInterval(this.interval);
  }

  navigate(matchId) {
    this.props.navigator.push({
      name: 'MatchDetails',
      passProps: {
        matchId: matchId,
      }
    })
  }

  render() {
    return(
      <ScrollableTabView style={styles.container}>
        <View tabLabel="All live matches">
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
        <View style={styles.container} tabLabel="Your teams">
          <ListView 
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
        <View tabLabel="Finished" />
      </ScrollableTabView>
    );
  }
  
  renderRow(rowData) {
    var matchName = rowData['name'];
    var matchId = rowData['matchId'];
    return(
      <TouchableHighlight underlayColor="white" onPress={() => this.navigate(matchId)} style={styles.listViewItem}>
        <Text style={{ fontSize:18 }}>{matchName}</Text>
      </TouchableHighlight>
    );
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

module.exports = Main;