import React, { Component } from 'react';
import {
  Navigator,
  StyleSheet,
} from 'react-native';

// channel screens
import Thought from '../screens/Thought'
import Chat from '../screens/ChatLobby'
import Start from '../screens/StartLobby'
import User from '../screens/User'

// model & backends
import ChatServer from '../model/ChatServer';
import {Store, LocalDB} from '../model/Store';

// deployment
import CodePush from "react-native-code-push";
//let HockeyApp = require('react-native-hockeyapp');
//let HOCKEY_APP_ID = ''

let Screens ={
  user: User, 
  lobby: Chat,
  thought: Thought,
  start: Start
}


export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    // init code before call render
    //HockeyApp.configure(HOCKEY_APP_ID, true);
  }

  componentDidMount() {
    CodePush.sync()
   // HockeyApp.start();
   // HockeyApp.checkForUpdate();
  }

  renderScene(route, navigator) {
    let Scrn = Screens[route.id];
    //console.log(`screen: ${Screen} and id: ${route.id}`)
    return <Scrn route={route} navigator={navigator} store={Store} server={ChatServer} localdb={LocalDB}/>
  }
  render() {
    return (
      <Navigator
        style={ styles.container }
        initialRoute={ {
            id: 'start', 
            } }
        renderScene={this.renderScene.bind(this)}
        configureScene={ () => { return Navigator.SceneConfigs.VerticalUpSwipeJump; } }
      />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
