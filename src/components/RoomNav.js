import React, { Component, PropTypes } from 'react';

import {
  TouchableHighlight, 
  View, 
  ScrollView,
  ListView,
  Text
} from 'react-native'

import {room_nav as styles, palette} from '../styles/styles.js';


export default class RoomNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var {rooms} = this.props;
		console.log(rooms);
		return (
			<View style={{flex: 10}}>
				<ScrollView>
					{rooms.map((room, index) =>
						<View key={index} style={styles.roomCard}>
							<View style={styles.picture}></View>
							<Text style={styles.text}>{room.name}</Text>
						</View>
					)}
				</ScrollView>
			</View>
		)
	}
}