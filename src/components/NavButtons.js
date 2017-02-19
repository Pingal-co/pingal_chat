import React, { Component } from 'react';

import {
  View,
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native';

import {nav_buttons as styles, palette} from '../styles/styles.js';
import FontIcon from 'react-native-vector-icons/FontAwesome';

export default class NavButtons extends Component {
	constructor(props) {
		super(props);

		this.onNavigation = this.onNavigation.bind(this);
	}

	onNavigation(params) {
		this.props.navigator.push({
            id: 'messages'
        });
	}

	render() {
		return(
			<View style={styles.buttonsBox}>
				<View style={styles.button}>
					<FontIcon name={"smile-o"} size={24} color={"black"} />
					<Text style={styles.buttonText}>Pingal</Text>
				</View>
				<TouchableHighlight onPress={this.onNavigation}>
					<View style={styles.button}>
						<FontIcon name={"comment-o"} size={24} color={"black"} />
						<Text style={styles.buttonText}>Messages</Text>
					</View>
				</TouchableHighlight>
			</View>
		)
	}
}