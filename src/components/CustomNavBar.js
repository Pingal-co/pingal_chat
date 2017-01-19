import React, { Component } from 'react';
import {
  View,
  Text, 
  TouchableOpacity
} from 'react-native';

import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

import FontIcon from 'react-native-vector-icons/FontAwesome';
import IconI from 'react-native-vector-icons/Ionicons';

import {navbar as styles, palette, icon as icon_style} from '../styles/styles.js'
import autobind from 'autobind-decorator'

@autobind
export default class CustomNavBar extends Component {
  constructor(props){
    super(props)
  }

  render() {
    /*
    Channel Name: {prefix}{name}
    prefix is a string combination of [#,&,$,!]

    &channel : mute (no input toolbar)
    !channel : private (invitation only)
    $channel : paid (sponsored, promotion)
    [$&!] channel : paid + mute + private
    #channel : Public, talk, unpaid channel

    User Name: {prefix} {name}
    :name : bot
    :name -h : bot help command
    #name: channel
    !name : unverified user
    @name : human
    .name : id
    */

    const onSend = this.props.onSend
    const leftButton = this.props.leftButton
    let onLeftPress = this.props.onLeftPress
    const rightButton = this.props.rightButton
    let onRightPress = this.props.onRightPress
    //console.log("topBar")
    //console.log(this.props)
    let button_icon = (name) => { 
          return (
              <FontIcon 
                  name={name} 
                  style={icon_style} 
                  size={20} 
                  color={palette.icon_color} 
              />
    )}

    let button_text = (text) => {
      return (
          <NavButtonText 
            style={styles.iconText}
          >
            {text}
          </NavButtonText>
      )
    }
    //{button_icon(button.icon)}
    let tab = (text, index) => {
        
        return(
        <NavButton 
            key={index}
            style={styles.tabContainer} 
            onPress={() => this.props.navigator.push({
              id:'lobby', 
              params:{
                topic: text, 
                server: this.props.server,
                user: this.props.user,
                channel_tabs: this.props.channel_tabs,
                muteInputToolbar: false,}
              })
            }>           
              {button_text(text)}
        </NavButton>
        )
    };
    //console.log('rendering topbar ...')
    let buttons = this.props.channel_tabs
    if (!!buttons && buttons.length > 0) {
      let tabs = buttons.map(
        (button, index) => tab(button, index))
     
      //console.log('topbar with buttons')
      //console.log(buttons)
    
      return (     
          <NavBar style={{
            statusBar:styles.statusBar,
            navBar:styles.chatnavBar
          }}>
            {(leftButton) ?
             ( <NavButton style={styles.tabContainer} onPress={onLeftPress}>
              {button_icon(leftButton)}          
              </NavButton> ) :
              <View/>
            }
            <InvertibleScrollView horizontal={true}>
              {tabs}
              </InvertibleScrollView> 
            { (rightButton) ?
              (<NavButton style={styles.tabContainer} onPress={onRightPress}>
                {button_icon(rightButton)}
              </NavButton>) :
              <View/>
            }
          </NavBar> 
        
      )
    }
    //console.log('no topbar: empty_view')
    return (
        <NavBar style={{
          statusBar:styles.statusBar,
          navBar:[styles.chatnavBar,{borderBottomWidth:0}]
        }}>
        </NavBar>  
      );
  }
  
  

}

CustomNavBar.defaultProps = {
  leftButton: '',
  onLeftPress: () => {},
  title: '',
  rightButton: '',
  onRightPress: () => {},
};


/*
    <NavButtonText style={styles.toolText}>
            {leftButton}
          </NavButtonText>
    <NavButtonText style={styles.toolText}>
            {rightButton}
    </NavButtonText>
    */
    /*
    (
      <NavBar >
        <NavButton style={styles.tool} onPress={onLeftPress}>
          {myIcon(leftButton)}          
        </NavButton>
        <NavTitle style={styles.toolText}>
          {title}
        </NavTitle>
        <NavButton style={styles.tool} onPress={onRightPress}>
          {myIcon(rightButton)}
        </NavButton>
      </NavBar>

    );
    */

    /*
(
            <View style={{
                    flexDirection:'row',
                    height: 90,
                    justifyContent:'space-between'
                     }}>
                  
                    <TouchableOpacity 
                        style={{flex:1,}}
                        onPress={onLeftPress}                   
                    >
                       {myIcon(leftButton)} 
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex:1,}}
                        onPress={onTitlePress}                   
                    >
                       <Text style={styles.titleText}> {title} </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex: 1, }} 
                        onPress={onRightPress}>
                        {myIcon(rightButton)} 
                    </TouchableOpacity>
            </View>

        )
    */

/*

render() {
    const onSend = this.props.onSend
    const leftButton = this.props.leftButton
    const onLeftPress = this.props.onLeftPress
    const title = this.props.title
    const onTitlePress = this.props.onTitlePress
    const rightButton = this.props.rightButton
    const onRightPress = this.props.onRightPress

    
    
    let myIcon = (name) => {return (
      <IconI name={name} style={icon} size={25} color={palette.icon_color} />
    )}
    return  (
      <NavBar style={{
        statusBar:styles.statusBar,
        navBar:styles.navBar
      }}>
        <NavButton style={styles.icon} onPress={onLeftPress}>
          {myIcon(leftButton)}          
        </NavButton>
        <NavTitle style={styles.titleText}>
          {title}
        </NavTitle>
        <NavButton style={styles.icon} onPress={onRightPress}>
          {myIcon(rightButton)}
        </NavButton>
      </NavBar>

    );
  }

*/