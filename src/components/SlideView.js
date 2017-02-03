import React, { Component, PropTypes } from 'react';
import {
  Clipboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Text,
  Linking,
  MapView,
  ListView,
  Image,
  Platform,
  StyleSheet,
} from 'react-native';

import SlideText from './SlideText';
import SlideImage from './SlideImage';
import Time from './Time';
import Composer from './Composer';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';


import {slide_sheet as styles} from '../styles/styles.js'

export default class SlideView extends Component {
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
    this.onChannelPress = this.onChannelPress.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    
    this.state = {
      refs:{}
    }
   
  }

  handleSheetToNext() {
    const isSameUser = this.props.isSameUser
    const isSameDay = this.props.isSameDay
    const currentSlide = this.props.currentSlide
    const nextSlide = this.props.nextSlide
    const position = this.props.position

    if (isSameUser(currentSlide, nextSlide) && isSameDay(currentSlide, nextSlide)) {
      return styles[position].containerToNext;
    }
    return null;
  }

  handleSheetToPrevious() {
    const isSameUser = this.props.isSameUser
    const isSameDay = this.props.isSameDay
    const currentSlide = this.props.currentSlide
    const previousSlide = this.props.previousSlide
    const position = this.props.position

    if (isSameUser(currentSlide, previousSlide) && isSameDay(currentSlide, previousSlide)) {
      return styles[position].containerToPrevious;
    }
    return null;
  }

  renderSlideText() {
    const body = this.props.currentSlide.body
    if (body) {
      return <SlideText {...this.props}/>;
    }
    return null;
  }

  renderSlideImage() {
    const image = this.props.currentSlide.image
    if (image) {
      return <SlideImage {...this.props}/>;
    }
    return null;
  }

  renderTime() {
    const timestamp = this.props.currentSlide.inserted_at
    if (timestamp) {
      return <Time {...this.props}/>;
    }
    return null;
  }

  

  renderSlideButton() {
    let buttons = this.props.currentSlide.buttons
    if (buttons){
      const myIcon = (icon_name) => {return (<IconI name={icon_name} 
            size={25} color={palette.icon_color} />)}
    
      buttons = buttons.map((button) => {
            return(
              <TouchableOpacity 
                style={styles.iconContainer} 
                onPress={button.params.onPress}>
                {myIcon(buttons.params.icon)}
                <Text style={styles.titleText}> 
                {button.params.children} 
                </Text> 
            </TouchableOpacity>
          );
        }
      )
      return buttons
    }
    return null;
    
  }

  renderSlideForm(){
    const fields = this.props.currentSlide.fields 
    const _id = this.props.currentSlide._id
    if (fields) {
      let form =  fields.map((field, index) => { 
          const field_id = field + '_' + _id
          return (
              <Composer
              key={index}
              ref={field_id}
              placeholder={field}
              onChange={(e) => this.onChangeField(field,field_id)}
              text={this.state.refs[field_id]} />

          
          )
        })
      return form
    }
  }

  onChangeField(field, field_id){
    const newText = field.nativeEvent.text;
    let refs = this.state.refs
    refs[field_id] = newText

    this.setState((previousState) => {
        return {
            refs: refs,
        };
        }); 
  }

  onFormSubmit(field_ids=[]){
    const onSend = this.props.onSend
    let refs = this.state.refs
    let slide={}
    slide.form = {}
    field_ids.map(field_id => {
      field = field_id.split("_")[0]
      slide.form[field] = refs[field_id]
    })
    onSend(slide)
  }

  renderSlideList(){
    const list = this.props.currentSlide.channels 
    if (list) {
      let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
      let dataSource = ds.cloneWithRows(list)

      return (

        <ListView
          dataSource={dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => this.onChannelPress(rowData)}>
              <View style={[styles[this.props.position].container]}>
                <Text style={[styles[this.props.position].text]}>@ {rowData}</Text>
              </View>
            </TouchableOpacity>
          }
        />

      )
    }
  }

  onChannelPress(channel) {
    let channel_tabs = this.props.channel_tabs 
    if (channel.startsWith('#')){
      channel = channel.substr(1)
    }
    if (!(channel_tabs.includes(channel))) {
      channel_tabs = [channel].concat(channel_tabs)
    }
    //console.log(`channel list: ${channel_tabs}`);
    //console.log(`channel: ${channel} pressed`);
    this.props.onNavigation(
                    id='lobby',
                    params={
                      topic: channel, 
                      channel_tabs: channel_tabs, 
                    }
              )

  }

  renderSlideMap() {
    const location = this.props.currentSlide.location
    const position = this.props.position
   // console.log("entered map view")
   // console.log(this.props.currentSlide)
   // console.log(location)
    if (!!location) {
      // console.log("rendering map view")
      return (
        <TouchableOpacity style={[styles.container]} onPress={() => {
          const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
            android: `http://maps.google.com/?q=${location.latitude},${location.longitude}`
          });
          Linking.canOpenURL(url).then(supported => {
            if (supported) {
              return Linking.openURL(url);
            }
          }).catch(err => {
            console.error('An error occurred', err);
          });
        }}>
          <MapView
            style={styles[position].mapView}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            annotations={[{
              latitude: location.latitude,
              longitude: location.longitude,
            }]}
            scrollEnabled={false}
            zoomEnabled={false}
          />
        </TouchableOpacity>
      );
    }
  }

  renderCustomView() {
    /*
      if (slide.title) { return titleView() }
      if (slide.login) {return loginView()}
      if (slide.form) {return formView()}
      
      @data |> parse_bot1_view |> parse_bot2_view |> ... 
       @data |> bot1 |> bot2 |> view1 |> view2
       @data |> view1 |> view2 |> view3 |> view4
       slide.board = [{text:''},{'map:'}] // list of slides
    
    slides =  
    [text list text link input map button image image image list]
    
    #channel @server #channel@server
    $name , $address, $city 
    text: :send(bot($name, $address))  
    .image() giphy() .list(#a,#b,#c)
    .map .list $longitude,$latitude 

    .view(), bot(), :button, #channel, @user #channel@user, $field
    

    I want to know if you would like: btna(vote) btnb(vote) btnc(vote)
    abcdefg, ; [a,b,c,d], "" ; # ; $name ; bot(a, b, c;d) ; *abca* ; 
    */
    const renderCustomView = this.props.renderCustomView
    if (renderCustomView) {
      return renderCustomView(this.props);
    }
    return null;
  }

  onLongPress() {
    const body = this.props.currentSlide.body
    const actionSheet = this.context.actionSheet()
    const options = [
      'Copy Text',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;

    if (body) {
      actionSheet.showActionSheetWithOptions({
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            Clipboard.setString(body);
            break;
        }
      });
    }
  }

  render() {
    // console.log("rendering SlideView ...")
    // console.log(this.props)
    const position = this.props.position
    return (
      <View style={styles[position].container}>
        <View style={[styles[position].wrapper, this.handleSheetToNext(), this.handleSheetToPrevious()]}>
          <TouchableWithoutFeedback
            onLongPress={this.onLongPress}
          >
            <View>
              {this.renderSlideImage()}
              {this.renderSlideText()}
              {this.renderSlideList()}
              {this.renderSlideMap()}
              {this.renderCustomView()}
              {this.renderTime()}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}


SlideView.contextTypes = {
  actionSheet: PropTypes.func,
};

SlideView.defaultProps = {
  renderCustomView: null,
  isSameUser: () => {},
  isSameDay: () => {},
  position: 'left',
  currentSlide: {
    body: null,
    timestamp: null,
    image: null,
  },
  nextSlide: {},
  previousSlide: {},
};
