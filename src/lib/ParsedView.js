
import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';

import {
  Linking,
  MapView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ListView,
  Text,
  Image,
  View,
  TouchableHighlight,
} from 'react-native';

import TextExtraction from './TextExtraction';


class ParsedView extends Component {

  setNativeProps(nativeProps) {
    this._root.setNativeProps(nativeProps);
  }

  getPatterns() {
    return this.props.patterns.map((patternOption) => {
      return patternOption;
    });
  }

  renderCustomView(index, props) {
    const {type, ...rest} = props
    console.log(`type: ${type}`)
    switch(type){
      case "url":
      case "phone":
      case "email":
        return (this.renderLinkView(index, props));
      case "hashtag":
        return (this.renderLinkView(index, props));
      case "bold":
      case "italic":
      case "underline":
      case "strikethrough":
      case "blockquote":
      case "code":
      case "h1":
      case "h2":
      case "h3":
        return (this.renderTextView(index, props));
      default:
        null;
    }


  }

  renderTextView(index, props) {
    console.log("text view matched")
    const {children, type, style, ...rest} = props
    console.log(`children: ${children} ; type: ${type}`)
    console.log(style)
    return(
      <Text
        key={`parsedView-${index}`}
        {...props}

      />
    );
  }

  renderLinkView(index, props) {
    console.log("link view matched")
    //let textcomp = () => {return (<Text style={props.style.text}>{text}</Text>)}
    return(
      <TouchableOpacity
        key={`parsedView-${index}`}
        style = {props.style}
        onPress = {props.onPress}
      >
        <Text style={props.style}>{props.children}</Text>
      </TouchableOpacity>
    );
  }

  renderButtonView(index, props) {
    console.log("button view matched")
    return(
      <TouchableOpacity
        key={`parsedView-${index}`}
        style = {props.style}
        onPress = {props.onPress}
      >
        <Text style={props.style}>{props.children}</Text>
      </TouchableOpacity>
    );
  }

  renderListView(index, props){
    let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(props.children)
    console.log("list view matched")

    return (

      <ListView
        key={`parsedView-${index}`}
        dataSource={dataSource}
        renderRow={(rowData) =>
          <TouchableHighlight onPress={() => props.onPress(rowData)}>
            <View style={[props.styles[props.position].container]}>
              <Text style={[props.styles[props.position].text]}># {rowData}</Text>
            </View>
          </TouchableHighlight>
        }
      />

    )

  }

  renderImageView(index, props) {
    console.log("image view matched")
    return(
      <Image
        key={`parsedView-${index}`}
        style={props.styles.image}
        source={{uri: props.children}}
      />
    );
  }

  renderMapView(index, props) {
    console.log("link view matched")
    const locationText = props.children
    return(

      <TouchableOpacity
        key={`parsedView-${index}`}
        style={prop.styles.container}
        onPress={() => {
          const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${locationText.latitude},${locationText.longitude}`,
            android: `http://maps.google.com/?q=${locationText.latitude},${locationText.longitude}`
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
          style={props.styles[props.position].mapView}
          region={{
            latitude: locationText.latitude,
            longitude: locationText.longitude,
          }}
          annotations={[{
            latitude: locationText.latitude,
            longitude: locationText.longitude,
          }]}
          scrollEnabled={false}
          zoomEnabled={false}
        />
      </TouchableOpacity>
    );
  }



  getParsedText() {
    const children = this.props.children
    const patterns = this.props.patterns
    console.log(patterns)
    if (typeof children !== 'string') { return children; }

    const textExtraction = new TextExtraction(children, patterns);

    return textExtraction.parse().map((props, index) => {
      console.log(props)
      return (
        this.renderCustomView(index, props)
      );
    });
  }

  renderDefaultView() {
    console.log(`text to parse: ${this.props.children}`)
    //{this.getParsedText()}

    return (
      <Text
        ref={ref => this._root = ref}
        {...this.props}
      >

      </Text>
    );

  }

  render() {
    console.log(`text to parse: ${this.props.children}`)
    //

    return (
      <View>
       {this.renderDefaultView()}
        {this.getParsedText()}
      </View>
    );

  }

}

export default ParsedView;
