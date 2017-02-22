import React, { Component } from 'react';

import {
  View,
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native';

import {nav_button as styles, palette} from '../styles/styles.js';
import FontIcon from 'react-native-vector-icons/FontAwesome';

export default class NavButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			iconColor: this.props.route.id == this.props.navId ? "blue" : "black",
			textStyle: this.props.route.id == this.props.navId ? styles.textHighlight : null,
		};

		this.onNavigation = this.onNavigation.bind(this);
	}

	onNavigation(params) {
		this.props.navigator.push({
            id: this.props.navId
        });
	}

	render() {
		const {buttonIcon, buttonText} = this.props;
		return(
			<TouchableHighlight onPress={this.onNavigation} style={styles.touchableHighlight}>
				<View style={styles.button}>
					<FontIcon name={buttonIcon} size={24} color={this.state.iconColor} />
					<Text style={[styles.buttonText, this.state.textStyle]}>{buttonText}</Text>
				</View>
			</TouchableHighlight>
		)
	}
}