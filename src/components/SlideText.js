import React, { Component, PropTypes } from 'react';
import {
  Linking,
  MapView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import ParsedView from './ParsedView';
import Communications from 'react-native-communications';

import {slide_text as styles} from '../styles/styles.js'


export default class SlideText extends Component {
  constructor(props) {
    super(props);
    this.onUrlPress = this.onUrlPress.bind(this);
    this.onPhonePress = this.onPhonePress.bind(this);
    this.onEmailPress = this.onEmailPress.bind(this);
    this.onChannelPress = this.onChannelPress.bind(this);
    this.renderListView = this.renderListView.bind(this);

  }

  onUrlPress(url) {
    Linking.openURL(url);
  }

  onPhonePress(phone) {
    const options = [
      'Text',
      'Call',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    const actionSheet = this.context.actionSheet()

    actionSheet.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Communications.phonecall(phone, true);
          break;
        case 1:
          Communications.text(phone);
          break;
      }
    });
  }

  onEmailPress(email) {
    Communications.email(email, null, null, null, null);
  }

  onChannelPress(channel) {
    let channel_tabs = this.props.channel_tabs 
    if (channel.startsWith('#')){
      channel = channel.substr(1)
    }
    if (channel_tabs.indexOf(channel) < 0) {
      channel_tabs = [channel].concat(channel_tabs)
    }
    console.log(`channel list: ${channel_tabs}`);
    console.log(`channel: ${channel} pressed`);
    this.props.onNavigation(
                    id='lobby',
                    params={
                      topic: channel, 
                      channel_tabs: channel_tabs, 
                    }
              )

  }

  renderBoldText(matchString, matches){
    console.log("bold text matched")
    //let boldPattern = /\*(\w+)\*/
    //let match = matchString.match(boldPattern)
    return `${matches[1]}`
  }

  renderItalicText(matchString, matches){
    return `${matches[1]}`
  }

  renderStrikethroughText(matchString, matches){
    return `${matches[1]}`
  }

  renderHeadingOneText(matchString, matches){
    return `${matches[1]}`
  }

  renderHeadingTwoText(matchString, matches){
    return `${matches[1]}`
  }

  renderHeadingThreeText(matchString, matches){
    return `${matches[1]}`
  }

  renderBlockquoteText(matchString, matches){
    return `${matches[1]}`
  }

  renderCodeText(matchString, matches){
    return `${matches[1]}`
  }

  renderImage(matchString, matches){
    return `${matches[1]}`
  }

  renderListViewText(matchString, matches){
    console.log("list view text matched")
    //let boldPattern = /\*(\w+)\*/
    //let match = matchString.match(boldPattern)
    return `${matches[1]}`
  }

  renderListView(matchString, matches){
    let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(`${matches[1]}`)
    let rowData = `${matches[1]}`
    console.log("list view matched")
    console.log(`matches: ${matches[0]}, ${matches[1]}, ${rowData}`)
    return(
        <Text style={[styles[this.props.position].text, this.props.textStyle[this.props.position]]}># {rowData}</Text>


    /*
    return (

      <ListView
        dataSource={dataSource}
        renderRow={(rowData) =>
          <TouchableHighlight onPress={() => this.onChannelPress(rowData)}>
            <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
              <Text style={[styles[this.props.position].text, this.props.textStyle[this.props.position]]}># {rowData}</Text>
            </View>
          </TouchableHighlight>
        }
      />
      */

    )

  }

  renderNamedLinks(matchString, matches){
    return `${matches[1]}`
  }

  renderTable(matchString, matches){
    return `${matches[1]}`
  }








  render() {
    const body = this.props.currentSlide.body
    const position = this.props.position
    // console.log(`body: ${body} `)
    const PATTERN = {
      url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/,
      phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}/,
      email: /\S+@\S+\.\S+/,
      bold: /\*(\w+)\*/,
      italic: /\_(\w+)\_/,
      strikethrough: /\~(\w+)\~/,
      hashtag: /#(\w+)/,
      list: /\[(\w+)\]/,
      blockquote: />(\w+)>/,
      code: /```(\w+)```/,
      h3: /\^\^\^(\w+)\^\^\^/,
      h2: /\^\^(\w+)\^\^/,
      h1: /\^(\w+)\^/,
    };

    /*
    <View style={styles[position].container}>
      <Text
        style={styles[position].text}>
        {body}
      </Text>
    </View>

      */


    return (

      <View style={styles[position].container}>
          <ParsedView
            style={styles[position].text}
            patterns={[
              {type: 'url', pattern: PATTERN['url'], style: StyleSheet.flatten([styles[position].link]), onPress: this.onUrlPress},
              {type: 'phone', pattern: PATTERN['phone'], style: StyleSheet.flatten([styles[position].link]), onPress: this.onPhonePress},
              {type: 'email', pattern: PATTERN['email'], style: StyleSheet.flatten([styles[position].link]), onPress: this.onEmailPress},
              {type: 'hashtag', pattern: PATTERN['hashtag'], style: StyleSheet.flatten([styles[position].link]), onPress: this.onChannelPress},
              {type: 'bold', pattern: PATTERN['bold'], style: StyleSheet.flatten([styles[position].bold]),  renderText: this.renderBoldText},
              {type: 'italic', pattern: PATTERN['italic'], style: StyleSheet.flatten([styles[position].italic]), renderText: this.renderItalicText},
              {type: 'strikethrough', pattern: PATTERN['strikethrough'], style: StyleSheet.flatten([styles[position].strikethrough]), renderText: this.renderStrikethroughText},
              {type: 'blockquote', pattern: PATTERN['blockquote'], style: StyleSheet.flatten([styles[position].blockquote]), renderText: this.renderBlockquoteText},
              {type: 'code', pattern: PATTERN['code'], style: StyleSheet.flatten([styles[position].code]),  renderText: this.renderCodeText},
              {type: 'h3', pattern: PATTERN['h3'], style: StyleSheet.flatten([styles[position].h3]),  renderText: this.renderHeadingThreeText},
              {type: 'h2', pattern: PATTERN['h2'], style: StyleSheet.flatten([styles[position].h2]),  renderText: this.renderHeadingTwoText},
              {type: 'h1', pattern: PATTERN['h1'], style: StyleSheet.flatten([styles[position].h1]), renderText: this.renderHeadingOneText},
              {type: 'list', pattern: PATTERN['list'], style: StyleSheet.flatten([styles[position].link]), onPress: this.onChannelPress, renderText: this.renderListView},

            ]}
          >
            {body}
          </ParsedView>
        </View>


    );
  }
}


SlideText.contextTypes = {
  actionSheet: PropTypes.func,
};

SlideText.defaultProps = {
  containerStyle: {},
  position: 'left',
  textStyle: {},
  linkStyle: {},
  currentSlide: {
    body: '',
  },
};
