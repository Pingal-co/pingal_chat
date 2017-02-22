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

		this.onNavigation = this.onNavigation.bind(this);
	}

	onNavigation(params) {
		this.props.navigator.push({
            id: 'start'
        });
	}

	render() {
		var {rooms} = this.props;
		console.log(rooms);
		return (
			<View style={{flex: 10}}>
				<ScrollView>
					{rooms.map((room, index) =>
						<TouchableHighlight key={index} onPress={this.onNavigation}>
							<View style={styles.roomCard}>
								<View style={styles.picture}></View>
								<Text style={styles.text}>{room.name}</Text>
							</View>
						</TouchableHighlight>
					)}
				</ScrollView>
			</View>
		)
	}
}