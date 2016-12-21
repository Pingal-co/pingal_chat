import React, { Component, PropTypes } from 'react';
import {
  Modal,
  View,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  Text
} from 'react-native';

import Composer from './Composer';
import Send from './Send';
//import MailTo from './MailTo';
// import PhotoGallery from './PhotoGallery';
import CustomActions from './CustomActions';
//import Actions from './Actions';

import {input_toolbar as styles, palette} from '../styles/styles.js'
//import iconfontConf from '../lib/iconfontConf'
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

export default class InputToolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toolvisible: false
    }
  //  this.renderMailTo = this.renderMailTo.bind(this);
    //this.renderGallery = this.renderGallery.bind(this);
    //this.renderContext = this.renderContext.bind(this);
    //this.renderCamera = this.renderCamera.bind(this);
    //this.renderCommand = this.renderCommand.bind(this);

  }

  /*
  renderMailTo() {
    //return <MailTo {...this.props}/>;
    return (
      <PhotoGallery {...this.props} />
    )
  }
  */
 /*
  renderGallery() {
    console.log("gallery")

    return (
        <PhotoGallery {...this.props} />
    )
  }

  renderContext() {
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
*/
  setToolVisible(name) {
    this.setState({toolvisible: name});
    console.log(`selected tool :${this.state.toolvisible}`)
  }

  renderTool(props) {
    let icon=props.icon
    let tool=props.tool
    let text=props.text

    const myIcon = (icon) => {return (<FontIcon name={icon} size={15} color={palette.icon_color} />)}
    /*
      <Text style={styles.toolText}>
                      {myIcon(icon)}
                    </Text>
                   
    */
        if(this.enableTool(tool)) {
            return (
                <TouchableOpacity
                  style={styles.tool}
                  onPress = {() => this.props.navigator.push({
                    id: tool,
                    params: {...this.props}
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

  /*
  renderCustomActions(){
    const tool = this.state.toolvisible
    return <PhotoGallery {...this.props} />
  }
  */
  renderActions() {
    /*
      <Modal
              animationType={'none'}
              transparent={true}
              visible={!!this.state.toolvisible}
              onRequestClose={() => {
                this.setToolVisible(false);
              }}
            >
            <PhotoGallery {...this.props} />
          </Modal>

    */
    if (this.props.actionBar){
      return (
        <View style={styles.toolbar}>
          {this.renderTool({tool: 'add', icon:'plus-square-o', text: "Server"})}
          {this.renderTool({tool: 'slide_maker', icon:'android', text: "Bots"})}
          {this.renderTool({tool: 'context', icon: 'map-o', text: "Context"})}
          {this.renderTool({tool: 'album', icon: 'photo', text: "Album"})}
          {this.renderTool({tool: 'camera', icon: 'camera-retro', text: "Camera" })} 
          {this.renderTool({tool:'bots', icon:'android', text: "Bots"})}
          
        </View>
      )
    } 
    return (
       <View/>
    )
  }

  renderSend() {
    const renderSend = this.props.renderSend

    if (renderSend) {
      return renderSend(this.props);
    }
    return <Send {...this.props}/>;
  }

  renderComposer() {
    return (
      <Composer {...this.props} />
    );
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
    /*
    {this.renderActions()}
    <View style={styles.mailto}>
    {this.renderMailTo()}
    </View>
      {this.renderAccessory()}
    */
    return (
      <View style={styles.container}>
        <View style={styles.primary}>
           
          {this.renderComposer()}
          {this.renderSend()}
       
        </View>
        



      </View>
    );
  }
}


InputToolbar.defaultProps = {
  enableTools: 'add, slide-maker',
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  actionBar: true,
  placeholder: ''
};
