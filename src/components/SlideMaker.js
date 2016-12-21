import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';

import Composer from './Composer';
import Send from './Send';
import MailTo from './MailTo';
import PhotoGallery from './PhotoGallery';
import CustomActions from './CustomActions';
import Actions from './Actions';
import CustomNavBar from './CustomNavBar.js'

import {slide_maker as styles, sendButton, palette} from '../styles/styles.js'
import iconfontConf from '../lib/iconfontConf'
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SlideMaker extends Component {
  constructor(props) {
    super(props)
    this.state = {
       address:'',
       text:'',
       public: true,
       sponsored: false,
       slide: {}
    }
    this.onText = this.onText.bind(this);
    this.onMailTo = this.onMailTo.bind(this);
    this.onPublic = this.onPublic.bind(this);
    this.onSponsored = this.onSponsored.bind(this);
    this.onSend = this.onSend.bind(this);
  
    this.renderComposer = this.renderComposer.bind(this);
    this.renderMailTo = this.renderMailTo.bind(this);
    this.renderSend = this.renderSend.bind(this);
  
}

  onText(e){
    const newText = e.nativeEvent.text;
    this.setState((previousState) => {
      return {
        text: newText,
      };
    });
    console.log(`text :${this.state.text}`)
  }
  onMailTo(e){
    const newText = e.nativeEvent.text;
    this.setState((previousState) => {
        return {
            address: newText,
        };
        }); 
    console.log(`address :${this.state.address}`)
 
  }
  onPublic(flag){
    this.setState({public : flag})
    console.log(`public :${this.state.public}`)
 
  }
  onSponsored(flag){
   this.setState({sponsored : flag})
    console.log(`sponsored :${this.state.sponsored}`)
 
  }

  onSend(){
        const server = this.props.chatserver
        const lobby = this.props.lobby
        let slides = [{
               address: this.state.address,
               text: this.state.text,
               public: this.state.public,
               sponsored: this.state.sponsored,
        }]
        const action="new:slide"
        server.send(lobby, slides, action)

  }

  renderNavBar() {
    const onSend = this.onSend
    const leftButton = "ios-arrow-dropleft"
    const onLeftPress = () => this.props.navigator.pop()
    const title = 'Data Slide'
    const rightButton = "ios-cloud-upload-outline"
    const onRightPress = this.onLogin


    return (
      <CustomNavBar
        leftButton={leftButton}
        onLeftPress={onLeftPress}
        title={title}
        rightButton={rightButton}
        onRightPress={onRightPress}
      >
      </CustomNavBar>

    );
  }

  renderMailTo() {
    //return <MailTo {...this.props}/>;
    let address = this.state.address
    const placeholder = 'MailTo (channel@server OR @server)'
    const onMailTo = this.onMailTo
    const  composerHeight= Platform.select({
            ios: 99,
            android: 123,
        })
   
   /*
    

   */
    return (
        <Composer
        placeholder={placeholder}
        onChange={(e) => onMailTo(e)}
        text={address} />

     
    )
  }

   renderComposer() {
     let text = this.state.text
     const placeholder = 'Write something'
     const onText = this.onText
     const  composerHeight= Platform.select({
            ios: 132,
            android: 164,
        })
   
    return (
      <Composer 
        placeholder={placeholder}
        composerHeight = {composerHeight}
        onChange={(e) => onText(e)}
        text={text}
        style={styles.textInput} />
    );
  }

  renderGallery() {
    console.log("gallery")

    return (
        <PhotoGallery {...this.props} />
    )
  }

  renderCamera() {
    return (
      <PhotoGallery {...this.props} />
    )
  }

  renderCommand() {
    return (
      <PhotoGallery  {...this.props} />
    )
  }

  setToolVisible(name) {
    this.setState({toolvisible: name});
     }

  renderContext() {
    return (
      <View style={styles.toolbar}>
        <Text style={[styles.toolText, {marginTop: 8}]}> Set Properties: </Text>
        {this.renderButton({tool: 'secret', icon: 'lock', text: "Secret"})}
        {this.renderButton({tool: 'sponsored', icon: 'credit-card', text: "Sponsored"})}
        {this.renderButton({tool: 'time', icon: 'clock-o', text: "Time"})}        
      </View>
    )
  }

 renderButton(props) {
    let icon=props.icon
    let tool=props.tool
    let text=props.text

    const myIcon = (icon) => {return (<FontIcon name={icon} size={15} color={palette.icon_color} />)}
        if(this.enableTool(tool)) {
            return (

                <TouchableOpacity
                  style={styles.tool}
                  onPress = {() => {}}
                > 
                      {myIcon(icon)}
                      <Text style={styles.toolText}>
                        {text}
                      </Text>
                </TouchableOpacity>
            )
        }
  }

renderActions() {
    return (
      <View style={styles.toolbar}>
      <Text style={[styles.toolText, {marginTop: 8}]}> Toolbar: </Text>
        {this.renderTool({tool: 'album', icon: 'photo', text: "Album"})}
        {this.renderTool({tool: 'camera', icon: 'camera-retro', text: "Camera" })}  
      </View>
    )
  }

  renderTool(props) {
    let icon=props.icon
    let tool=props.tool
    let text=props.text

    const myIcon = (icon) => {return (<FontIcon name={icon} size={15} color={palette.icon_color} />)}
 
        if(this.enableTool(tool)) {
            return (
                <TouchableOpacity
                  style={styles.tool}
                  onPress = {() => this.props.navigator.push({
                    id: tool
                  })}
                > 
                      {myIcon(icon)}
                      <Text style={styles.toolText}>
                        {text}
                      </Text>
                </TouchableOpacity>
            )
        }
  }

  enableTool(tool) {
      let list = this.props.enableTools
      return ~list.trim().indexOf(tool)
  }


  

  

  renderSend() {
    let slide = this.state.slide
    const onSend = this.onSend
    const name='Send'
    let text = this.state.text

    if (text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={sendButton.container}
          onPress={() => { onSend({text: slide}, true); }}
        >
          <Text style={sendButton.text}>{name}</Text>
        </TouchableOpacity>
      );
    }
    return <View/>;
    
  }

  renderAccessory() {
    const renderAccessory = this.props.renderAccessory

    if (renderAccessory) {
      return (
        <View style={styles.accessory}>
          {renderAccessory(this.props)}
        </View>
      );
    }
    return null;
  }

  render() {
 
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <View style={styles.mailto}>
        {this.renderMailTo()} 
        </View>  
      
        <View style={styles.primary}>
          <View style={styles.wrapper}>     
            {this.renderComposer()} 
            </View>
            <View style={styles.accessory}>
            {this.renderActions()}
            {this.renderContext()}
          </View>
         
        </View> 

        <View style={styles.secondary}>
        </View>
        
      </View>
    );
  }
}


SlideMaker.defaultProps = {
  enableTools: 'album, camera, secret, sponsored, time',
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  slide: {
       address:'',
       text:'',
       public: true,
       sponsored: false,
  }
};
