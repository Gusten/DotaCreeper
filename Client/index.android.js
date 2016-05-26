'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid
} from 'react-native';
import Main from './Main';
import MatchDetails from './MatchDetails';

var navigator;

class DotaCreeper extends Component {
  constructor(props) {
    super(props);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(route, navigator) {
    if(route.name == 'Main') {
      return <Main navigator={navigator} {...route.passProps}  />
    }
    if(route.name == 'MatchDetails') {
      return <MatchDetails navigator={navigator} {...route.passProps}  />
    }
  }

  render() {
    return (
      <Navigator
        ref={(nav) => { navigator = nav; }}
        style={{ flex:1 }}
        initialRoute={{ name: 'Main' }}
        renderScene={ this.renderScene } />
    )
  }
}

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
});

AppRegistry.registerComponent('DotaCreeper', () => DotaCreeper);
