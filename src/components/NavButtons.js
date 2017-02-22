import React, { Component } from 'react';

import {
  View,
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native';

import {nav_buttons as styles, palette} from '../styles/styles.js';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import NavButton from './NavButton'

export default class NavButtons extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.route);
		return(
			<View style={styles.buttonsBox}>
				<NavButton {...this.props} navId={"start"} buttonText={"Pingal"} buttonIcon={"smile-o"} />
				<NavButton {...this.props} navId={"rooms"} buttonText={"Messages"} buttonIcon={"comment-o"} />
			</View>
		)
	}
}