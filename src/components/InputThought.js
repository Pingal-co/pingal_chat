import React, { Component, PropTypes } from 'react';
import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import Composer from './Composer';
import Send from './Send';

import {thought as styles, palette, sendButton} from '../styles/styles.js'

export default class InputThought extends Component {
    constructor(props) {
        super(props)
    }

    renderPing() {
        const text= this.props.text
        const onSend = this.props.onSend
    
        if (text.trim().length > 0) {
        return (
            <TouchableOpacity
                style={sendButton.container}
                onPress={() => { onSend({text: text}, true); }}
            >
                <Text style={sendButton.text}>Ping</Text>
            </TouchableOpacity>
        );
       }
       return <View/>;
      
    }


    renderChannelCategory(){
        placeholder='Find people who match your thoughts'
        if (!!this.props.category_type) {
            placeholder = `${this.props.category_type} : your Thought`
        }
        return (
            <Composer
            placeholder={placeholder}
            {...this.props}
            />

        
        )                     
    }

    render() {
    
        return (
            <View style={styles.container}>
                <View style={styles.inputPrimary}>                
                {this.renderChannelCategory()}
                {this.renderPing()}            
                </View>
                
            </View>
            );
    }

}

InputThought.defaultProps = {
  placeholderTextColor: palette.left_slide_text_color ,
  category_type: '',
};