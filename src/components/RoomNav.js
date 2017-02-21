import React, { Component, PropTypes } from 'react';

import {
  TouchableHighlight, 
  View, 
  ScrollView,
  ListView,
  Text
} from 'react-native'


export default class RoomNav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		var {rooms} = this.props;
		return (
			<View style={{flex: 10}}>
				<ScrollView>
					{rooms.map((room, index) =>
						<Text key={index}>{room.name}</Text>
					)}
				</ScrollView>
			</View>
		)
	}
}