import React, { Component } from 'react';

import {
  View,
  Text
} from 'react-native';

import {nav_buttons as styles, palette} from '../styles/styles.js';
import FontIcon from 'react-native-vector-icons/FontAwesome';

export default class NavButtons extends Component {
	render() {
		return(
			<View style={styles.buttonsBox}>
				<View style={styles.button}>
					<FontIcon name={"smile-o"} size={24} color={"black"} />
					<Text style={styles.buttonText}>Pingal</Text>
				</View>
				<View style={styles.button}>
					<FontIcon name={"comment-o"} size={24} color={"black"} />
					<Text style={styles.buttonText}>Messages</Text>
				</View>
			</View>
		)
	}
}