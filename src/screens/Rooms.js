import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Navigator,
} from 'react-native';

import Channel from '../components/Channel';

import CustomNavBar from '../components/CustomNavBar';

export default class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],

    }
  }

  setDefaultRooms() {
    // To do : load rooms from server

    let rooms = require('../data/rooms.js')
    this.setState({rooms: rooms})
  }

  renderTopbar() {    
        const topbarProps = {    
            channel_tabs: this.channel_tabs,
            leftButton: "user",
            onLeftPress: () => {
                this.props.navigator.push({ 
                    id: 'user',
                    })
                },
                ...this.props    
        }

        return (
        <CustomNavBar {...topbarProps} />

        );
    } 

  componentDidMount() {
    this.setDefaultRooms()
  }

  render() {
    return (
      <Channel 
          rooms = {this.state.rooms}

          renderTopbar={this.renderTopbar}
          {...this.props}
      />
    )
  }
}