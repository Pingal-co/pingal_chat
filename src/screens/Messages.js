import React, { Component } from 'react';
import { View, Text, Navigator } from 'react-native';

export default class Messages extends Component {
  static get defaultProps() {
    return {
      title: 'Messages'
    };
  }

  render() {
    return (
      <View>
        <Text>These are {this.props.title}.</Text>
      </View>
    )
  }
}