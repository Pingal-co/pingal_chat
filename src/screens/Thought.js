import React, { Component } from 'react';

import {
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  TextInput,
  ScrollView,
  ListView,
  StyleSheet,
    Platform, 
    PixelRatio,
    Dimensions,
} from 'react-native';

import CustomNavBar from '../components/CustomNavBar.js'
import ChatServer from '../model/ChatServer';
import {DB} from '../model/LocalStorage'
import {observer} from 'mobx-react/native'

import FontIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import t from 'tcomb-form-native'
// device info
import DeviceInfo from 'react-native-device-info'
// user name generator
import {fruits, titles, adjectives, nouns, encouraging_words, animals} from '../data/names.js'

import {thought as styles, palette, line, spacing, formStylesheet} from '../styles/styles.js'

import autobind from 'autobind-decorator'
const DEFAULT_USER = "anonymous"



@autobind
@observer
export default class Thought extends Component{
    constructor(props){     
        super(props)     
        
        this.state = {
            category_type: '',
            value: {},
            location:{},
        }

          


        // debug
        //this.onDebug()
    }

    setLobby(){
        this.chat_server = this.props.server(this.user._id)
        this.topic = 'thought:lobby'      
        this.lobby = this.chat_server.lobby(this.topic, this.onReceive) 
    }

    componentWillMount(){
        let uid = DeviceInfo.getUniqueID()
        this.device_info = {
            unique_id: uid,
            brand: DeviceInfo.getBrand(),
            name: DeviceInfo.getDeviceName(),
            user_agent: DeviceInfo.getUserAgent(),
            locale: DeviceInfo.getDeviceLocale(),
            country: DeviceInfo.getDeviceCountry(),
        }
        
        DB.device.add(this.device_info)

       // DB.user.find().then(resp => this.setState({user: resp}))
        DB.user.find({
            where: {deviceid: uid},
            limit: 1
         }
        ).then(resp => this.setUser(resp))


    }

    componentDidMount(){
        //this.setSlides()
        this.addLocation()


    }

    
    setUser(user) {
        console.log("setting user")
        console.log(user)
        if (user) {
            this.user = user
        } else {
            this.user =  {
                _id: Math.round(Math.random() * 1000000), // sent messages should have same user._id
                name: this.device_info.unique_id,
                hash: this.generateUserName(), // hash
                deviceid: this.device_info.unique_id, 
                avatar:'',
                email: '',
                phone: '',
            }
        }
        console.log(this.getUser())
        this.props.store.user.setUser(this.getUser())
        this.setLobby()
    }

    getUser(){
        return this.user
    }

    generateUserName(){
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
    
    onSend(slides=[]){
        const event="add:thought"
        console.log('send to chat server')
        let slide={}       
        let data = this.refs.form.getValue()
        slide['user_hash'] = this.user.hash
        for (prop in data) {
            if (prop === this.state.category_type) {
                slide['category'] = prop
                slide['thought'] = data[prop]
            }
        }
        // get location
        slide['location'] = this.state.location
        slide['device_info'] = this.device_info

        console.log(data)
        console.log(slide)
        slides=[slide]
        this.chat_server.send(this.lobby, slides, event)
    }

    addLocation(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let location = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }
                this.setState({location})
            },
            (error) => {
                console.log("Error in getting native location: trying by ip .. ", error.message)
                // ios only allows https : http need to enabled manually
                // http://ip-api.com/json
                fetch('https://geoip.nekudo.com/api/')
                    .then((response) => {
                        if (response.status >= 200 && response.status < 300) {
                        return response;
                        } else {
                            let e = new Error(response.statusText);
                            e.response = response;
                            throw e;
                        }
                    })
                    .then((response) => {
                     let location = response.json()
                     console.log("location based on ip", location)
                    })
                    .catch((e) => console.log("Error in fetching location by ip ",e))
            },
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
          );
    }

 

    onReceive(message){
        //ChatServer(user.name)
        //.then(this.onNavigation({server: _, ...params}))
        //
        let store = this.props.store
        console.log("received")
        console.log(message)
        let topic_id = `${message.params.room_id}` 
        let topic = message.params.room_name 
        let user = message.user
        let body = message.body
        let server = ChatServer(user._id)
        store.channel.setChannel({topic_id: topic_id, topic: topic})
        store.channel.addChannelTabs([message.params.room_name])
        store.user.setUser(message.user)
        //store.server.setServer(server)
        //console.log(store.server.server)

        // server: server,
        let params = {
                topic_id: topic_id,
                topic: topic,              
                user: user,
                channel_tabs: [topic],
                server: server,
                body: body
            }
       console.log(params)
       // add thought to db
       DB.thought.add({thought: message.body, category: this.state.category_type, topic: message.topic })
       // add user hash to db
       DB.hash.add({user: message.user._id, hash: message.user.name})
       // add user to db if user_id does not exists in db
       /*
       let u = DB.user.find({
                where: {_id: message.user._id},
                limit: 1
        })
        */
        DB.user.add({user: message.user._id, hash: message.user.name, params: message.user})



       // Navigate to the right chat_lobby
       this.onNavigation(params)
          
    }

    onChannelPress(data){
        // get the channel id call on Navigation 
        let store = this.props.store
        /*
             // server: server,
        let params = {
                topic_id: data.topic_id,
                topic: data.topic, 
                channel_tabs: [data.topic],             
                user: store.user.getUser(),
                server: this.chat_server
            }
         // Navigate to the chat_lobby
       ``this.onNavigation(params)
        */
        console.log(`navigate to channel: ${data.topic} and id: ${data.topic_id} for user: `)
        console.log(store.user.getUser())
    }

    onNavigation(params){
         this.props.navigator.push({
            id: 'lobby',
            params: params

        })        
    }

    onDebug(){
       console.log("Device Unique ID", DeviceInfo.getUniqueID());
       console.log("Device Manufacturer", DeviceInfo.getManufacturer());
       console.log("Device Brand", DeviceInfo.getBrand());
       console.log("Device Model", DeviceInfo.getModel());
       console.log("Device ID", DeviceInfo.getDeviceId());  
       console.log("System Name", DeviceInfo.getSystemName());
       console.log("System Version", DeviceInfo.getSystemVersion());  // e.g. 9.0
       console.log("Bundle ID", DeviceInfo.getBundleId());
       console.log("Build Number", DeviceInfo.getBuildNumber());  // e.g. 89
       console.log("App Version", DeviceInfo.getVersion());  
       console.log("App Version (Readable)", DeviceInfo.getReadableVersion());  // e.g. 1.1.0.89

       console.log("Device Name", DeviceInfo.getDeviceName());  // e.g. Becca's iPhone 6

       console.log("User Agent", DeviceInfo.getUserAgent()); // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)

       console.log("Device Locale", DeviceInfo.getDeviceLocale()); // e.g en-US

       console.log("Device Country", DeviceInfo.getDeviceCountry()); // e.g US

        //console.log("Timezone", DeviceInfo.getTimezone()); // e.g America/Mexico_City

        //console.log("App Instance ID", DeviceInfo.getInstanceID()); // ANDROID ONLY - see https://developers.google.com/instance-id/
        console.log(this.state)
    }


   onCategoryType(value){
        this.setState((previousState) => {
            return {
                category_type: value,
            };
        }); 
        console.log(`category_type :${this.state.category_type}`)   
    }


    renderCategoryType(){
      const list = [
      //    {'type': 'activity', 'icon': 'paw', 'description': 'on activity ...'},
     //  {'type': 'i_am_a', 'icon': 'group', 'description': 'on identity'},
     //     {'type': 'skill', 'icon': 'photo', 'description': "on skills ..."},
     //     {'type': 'gaming', 'icon': 'gamepad', 'description': 'shopping for'},
        //  {'type': 'learned', 'icon': 'book', 'description': 'Today I learned ...'},
     //    {'type': 'health', 'icon': 'heartbeat', 'description': 'on health ...'},
        {'type': 'passion', 'icon': 'coffee', 'description': "enthusiast in"},
        {'type': 'shopping', 'icon': 'shopping-cart', 'description': 'for shopping ideas'},

 
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
                onPress={() => {this.onCategoryType(rowData.type)}}>
                
              <View style={[styles.rowWrapper]}>
                <FontIcon name={rowData.icon} style={[styles.rowIcon]} size={15} color={palette.icon_color2} />
                <Text style={[styles.rowText]}> {rowData.description}</Text>
              </View>

            </TouchableHighlight>
          }
        />
      )
    }


  renderButtons(){
        const list = [ 
             {'type': 'ping', 'icon': 'mars-double', 'description': 'Send command to Pingal'},          
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
                    onPress={() => { this.onSend()}}>
                
                <View style={[styles.rowWrapper]}>
                    <FontIcon name={rowData.icon} style={[styles.rowIcon]} size={15} color={palette.icon_color2} />
                    <Text style={[styles.rowText]}> {rowData.description}</Text>
                </View>

                </TouchableHighlight>
            }
            />
        )
    }

renderChannels(){
      const list = [
       {'type': 'passion', 'topic_id': 'coffee', 'topic': "Coffee"},
       {'type': 'passion', 'topic_id': 'group', 'topic': 'Photography'},
       {'type': 'passion', 'topic_id': 'photo', 'topic': "Jewellery"},
       {'type': 'passion', 'topic_id': 'gamepad', 'topic': 'WeightLoss'},
       {'type': 'shopping', 'topic_id': 'book', 'topic': 'MenClothing'},
       {'type': 'shopping', 'topic_id': 'heartbeat', 'topic': 'Pre-schoolers'},
       {'type': 'shopping', 'topic_id': 'shopping-cart', 'topic': 'GiftsForMyWife'},
      ]
      let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
      let dataSource = ds.cloneWithRows(list)
 
      return (
        <ListView contentContainerStyle={styles.channelWrapper}
          dataSource={dataSource}
          initialListSize={list.length}
          renderRow={(rowData) =>
            <TouchableHighlight
                 underlayColor={palette.left_wrapper_background_color}
                onPress={() => {this.onChannelPress(rowData)}}>
                
            <View style={[styles.channelRowWrapper]}>
                <Text style={[styles.channelRowText]}>@{rowData.topic}</Text>
            </View>

            </TouchableHighlight>
          }
        />
      )
    }


  renderForm(){
        let Form = t.form.Form;
        let category = this.state.category_type
        let thought_obj={}
        thought_obj[category] = t.String
        // thought_obj['user_hash'] = t.String
        let Thought = t.struct(thought_obj);
             
        let options = {
            fields: {
                name: {
                    stylesheet: formStylesheet // overriding the style of the textbox
                },
            }
        };  
        options['fields'][category] = {placeholder: 'a topic | tag '}

        return (
            <View style={styles.formContainer}>
                <Form
                    ref="form"
                    type={Thought}
                    options={options}
                    value={this.state.value}
                    onChange={this.onChange}
                    />
            </View>
        )
    }

 renderTopbar() {

        this.channel_tabs =['Pingal']
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

  render(){ 
      console.log(this.user)
      // <Text style={styles.listH3}>   Set a topic ... </Text>
      /*
        <View>                     
                                      
                </View>
                <View>
                 
                </View>
      */
      let container = (
        <View style={styles.container}>
                {this.renderTopbar()}         
                <View>
                    <Text style={styles.listH3}> Connect me to people: </Text>                                                
                    {this.renderCategoryType()} 
                    {this.renderForm()}
                     {this.renderButtons()}  
                </View>
                <View>
                    {this.renderChannels()} 
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

Thought.defaultProps = {
    channel_properties: {
        mute: false,
    }
};

/*
const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});
*/



/*
import Composer from './Composer';
import Screen from './Screen';
import CustomChannel from './CustomChannel';
import Send from './Send';
*/

    /*
    onChannelName(event){
        const newText = event.nativeEvent.text;
        this.setState((previousState) => {
            return {
                channel_name: newText,
            };
        }); 
        console.log(`channel_name :${this.state.channel_name}`)   
    }

    onChannelCategory(event){
        const newText = event.nativeEvent.text;
        this.setState((previousState) => {
            return {
                channel_category: newText,
            };
        }); 
        console.log(`channel_category :${this.state.channel_category}`)
 
   }
    */


/*
      const navigator = this.props.navigator
      // renderCustomInputToolbar={this.renderInputToolbar}  

        return (
             <CustomChannel 
                user={this.user}
                navigator={navigator}
                muteInputToolbar={this.state.channel_properties.mute}
                onSend={this.onSend}
                onChannelName={this.onChannelName}
                onChannelCategory={this.onChannelCategory}
                onCategoryType={this.onCategoryType}
                onChannelProperties={this.onChannelProperties}
                slide={this.getSlides()}
                channel_name={this.state.channel_name}
                category_type={this.state.category_type}
                device_info={this.device_info}
            />
        )
*/

/*
setSlides(){
        this._slides = {
             channel_name: this.state.channel_name,
             channel_category: this.state.channel_category ,
             category_type: this.state.category_type,
             channel_properties: this.state.channel_properties,

        }
    }

    getSlides() {
        //console.log(`slides: ${this._slides}`)
        return this._slides;
    }

*/

        /*
         if device exists in db,
            get_user_from_device_id
            set user : postgres_id, device_id (user_name), current_user_hash, avatar, email, verified 
        
        */
/*





*/