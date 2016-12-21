import React, { Component } from 'react';
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

export default class CustomView extends Component {
  constructor(props) {
    super(props)
  }
  _onChannelPress(lobby){
    console.log(lobby);
    this.props.navigator.push({ component_name: 'lobby', lobby: `room:${lobby}`});
  }
  render() {
    console.log("CustomView....")
    console.log(this.props.currentSlide)



    if (this.props.currentSlide.location) {
      return (
        <TouchableOpacity style={[styles.container, this.props.containerStyle]} onPress={() => {
          const url = Platform.select({
            ios: `http://maps.apple.com/?ll=${this.props.currentSlide.location.latitude},${this.props.currentSlide.location.longitude}`,
            android: `http://maps.google.com/?q=${this.props.currentSlide.location.latitude},${this.props.currentSlide.location.longitude}`
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
            style={[styles[this.props.position].mapView, this.props.mapViewStyle]}
            region={{
              latitude: this.props.currentSlide.location.latitude,
              longitude: this.props.currentSlide.location.longitude,
            }}
            annotations={[{
              latitude: this.props.currentSlide.location.latitude,
              longitude: this.props.currentSlide.location.longitude,
            }]}
            scrollEnabled={false}
            zoomEnabled={false}
          />
        </TouchableOpacity>
      );
    }

    if (this.props.currentSlide.channels){
      let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
      let dataSource = ds.cloneWithRows(this.props.currentSlide.channels)
      console.log(this.props.currentSlide.channels)

      return (

        <ListView
          dataSource={dataSource}
          renderRow={(rowData) =>
            <TouchableHighlight onPress={() => this._onChannelPress(rowData)}>
              <View style={[styles[this.props.position].container, this.props.containerStyle[this.props.position]]}>
                <Text style={[styles[this.props.position].text, this.props.textStyle[this.props.position]]}># {rowData}</Text>
              </View>
            </TouchableHighlight>
          }
        />

      )

    }
    return null;
  }
}

const textStyle = {
  fontSize: 16,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10,
};

const styles = {
  left: StyleSheet.create({
    container: {
    },
    text: {
      color: 'black',
      ...textStyle,
    },
    link: {
      color: 'black',
      textDecorationLine: 'underline',
    },
    mapView: {
      width: 150,
      height: 100,
      borderRadius: 13,
      margin: 3,
    },
  }),
  right: StyleSheet.create({
    container: {
    },
    text: {
      color: 'white',
      ...textStyle,
    },
    link: {
      color: 'white',
      textDecorationLine: 'underline',
    },
    mapView: {
      width: 150,
      height: 100,
      borderRadius: 13,
      margin: 3,
    },
  }),
};


CustomView.defaultProps = {
  containerStyle: {},
  position: 'left',
  textStyle: {},
  linkStyle: {},
  mapViewStyle: {},
  currentSlide: {},
};

/*
listItem: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f7f8fc',
  borderBottomWidth: 0.5,
  borderColor: '#D0DBE4',
  padding: 5
},
listIcon: {
  justifyContent: 'flex-start',
  paddingLeft: 10,
  paddingRight: 15
},
channelIcon: {
  width: 30,
  height: 30
},
listInfo: {
  flex: 1,
  justifyContent: 'flex-start'
},
titleLabel: {
  fontSize: 15,
  fontWeight: '600',
  color: '#60768b',
},
memberLabel: {
  fontSize: 13,
  fontWeight: '400',
  color: '#abb8c4',
}

*/
