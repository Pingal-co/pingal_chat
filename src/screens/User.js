import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  PixelRatio,
  View,
  TouchableOpacity,
  Text,
  ListView,
  TouchableHighlight,
} from 'react-native';

import CustomNavBar from '../components/CustomNavBar.js'
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
import {DB} from '../model/LocalStorage'
// user name generator
import {fruits, titles, adjectives, nouns, encouraging_words, animals} from '../data/names.js'
import {thought as styles, palette, formStylesheet} from '../styles/styles.js'

import ChatServer from '../model/ChatServer';
// device info
import DeviceInfo from 'react-native-device-info'
/*
  First time check: if user phone or email exist in the db based on user_id
  If yes, get user thoughts from the db and render them in a user channel
  If no, show sign_in form

*/

const DEFAULT_USER = "anonymous"

export default class User extends Component {
  constructor(props){     
        super(props)     
        this.state = {
            value: {},
        }

        this.user = {
            _id: 1, // sent messages should have same user._id
            name: DEFAULT_USER, // hash
            deviceid: '', 
            avatar: '',
            email: '',
            phone: '',
            hash: ''
        }

        // bind send and receive
        this.onSend = this.onSend.bind(this)
        this.onReceive = this.onReceive.bind(this)
        this.onNavigation = this.onNavigation.bind(this)

        this.onChange = this.onChange.bind(this)
        this.onGenerateUser = this.onGenerateUser.bind(this)    
        this.generateUserName = this.generateUserName.bind(this)

        // Connect to the user channel
        this.chat_server = ChatServer()
        this.topic = `user:${this.user._id}`      
        this.lobby = this.chat_server.lobby(this.topic, this.onReceive.bind(this))

        // debug
        this.onDebug()

  }
  componentWillMount(){
        // push this to backend.
        let uid = DeviceInfo.getUniqueID()
        DB.user.find({
            where: {deviceid: uid},
            limit: 1
         }
        ).then(resp => this.setUser(resp))
  }

  setUser(user) {
        this.user = user
  }

  onSend(slides=[]){
        const event="add:user"
        console.log('send to chat server')     
        slides=[this.refs.form.getValue()]
        this.chat_server.send(this.lobby, slides, event)
  }
  onDebug(){
    console.log("debugging on")
  }

  onReceive(message){
      console.log("received")
      console.log(message)
      // actually push this to the backend
      DB.user.add({user: message.user._id, hash: message.user.name, params: message.user})
      // Navigate to the right chat_lobby
       this.onNavigation()
    }
  
  onNavigation(){
         this.props.navigator.push({
            id: 'lobby'
        })        
  }

  onChange(value){
        this.setState({value})
  }

  onGenerateUser(){
      let value = this.state.value
      value['name_hash'] = this.generateUserName()
      this.onChange(value)
}

  generateUserName(){
      // put this in utils and import it
        let sampler = Math.random
        //let wp = new WP()
        //let wp_adj = wp.randAdjective({count: 1}, (word)=> {return word})
        
        let sample = (words) => words[Math.floor(sampler()*words.length)]
        let uppercaseFirstLetter = (word) => word.charAt(0).toUpperCase() + word.slice(1)
        let removeSpaces = (word) => word.replace(/\s+/, "")

        title = sample(titles)
        adjective = sample(adjectives)
        encouraging_word = sample(encouraging_words)

        animal = sample(animals)
        fruit = sample(fruits)
         noun = sample(nouns)
        //pokemon = sample(pokemons)
        //dinosaur = sample(dinosaurs)
    
        let firstName = [title, adjective]
        let lastName = [animal, fruit, noun]
        let prefix = removeSpaces(sample(firstName))
        let suffix = removeSpaces(sample(lastName))
        user_hash = uppercaseFirstLetter(prefix) + uppercaseFirstLetter(suffix)
        //console.log(user_hash)
        return user_hash
        

    }

  renderForm(){
        let Form = t.form.Form;
        let user_obj={}
        user_obj['phone'] = t.String
        user_obj['name'] = t.String
        user_obj['name_hash'] = t.String
        let UserForm = t.struct(user_obj);
             
        const options = {
            fields: {
                name: {
                stylesheet: formStylesheet // overriding the style of the textbox
                }
            }
        };  

        return (
            <View style={styles.formContainer}>
                <Form
                    ref="form"
                    type={UserForm}
                    options={options}
                    value={this.state.value}
                    onChange={this.onChange}
                    />
            </View>
        )
    }

  renderButtons(){
        const list = [
             {'type': 'user', 'icon': 'at', 'description': 'Generate Name Hash'},  
             {'type': 'ping', 'icon': 'mars-double', 'description': 'Update Profile'},          
        ]
       
        let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        let dataSource = ds.cloneWithRows(list)

        return (
            <ListView contentContainerStyle={styles.listWrapper}
            dataSource={dataSource}
            initialListSize={list.length}
            renderRow={(rowData) =>
                <TouchableHighlight
                    underlayColor={palette.left_wrapper_background_color}
                    onPress={() => { 
                        (rowData.type === "user") ?
                            this.onGenerateUser()
                        :
                            this.onSend()
                      
                      this.onSend()}}>
                
                <View style={[styles.rowWrapper]}>
                    <FontIcon name={rowData.icon} style={[styles.rowIcon]} size={15} color={palette.icon_color2} />
                    <Text style={[styles.rowText]}> {rowData.description}</Text>
                </View>

                </TouchableHighlight>
            }
            />
        )
    }

  renderTopbar() {
        this.channel_tabs =['']
        const topbarProps = {    
            channel_tabs: this.channel_tabs,
            leftButton: "step-backward",
            onLeftPress: () => {
                this.props.navigator.push({ 
                    id: 'thought', 
                    })
                },
                ...this.props    
        }

        return (
        <CustomNavBar {...topbarProps} />

        );
    }

render(){ 
      let container = (
        <View style={styles.container}>
                {this.renderTopbar()}         
                <View>
                    <Text style={styles.listH3}> Profile Verification... </Text> 
                    {this.renderForm()}
                </View>
                <View>
                   {this.renderButtons()}
                </View>
            </View>
      )
        return (
            
                <View style={styles.container}>
                    <KeyboardAwareScrollView >
                        {container}          
                    </KeyboardAwareScrollView>  
                </View>
            
        )

  }

}

User.defaultProps = {
  user: {_id: 1, name: 'Nickname'},
};
