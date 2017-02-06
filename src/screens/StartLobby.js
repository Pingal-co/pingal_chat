import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';


import Channel from '../components/Channel';

import ChatServer from '../model/ChatServer';
import {DB} from '../model/LocalStorage'
import {observer} from 'mobx-react/native'
import autobind from 'autobind-decorator'
import Share, {ShareSheet, Button} from 'react-native-share';
import CustomNavBar from '../components/CustomNavBar';

// device info
import DeviceInfo from 'react-native-device-info'
// user name generator
import {fruits, titles, adjectives, nouns, encouraging_words, animals} from '../data/names.js'


import moment from 'moment/min/moment-with-locales.min';

const DEFAULT_USER = "anonymous"

@autobind
@observer
export default class StartLobby extends Component {
  constructor(props) {
      super(props);

      this.state = {
        slides: [],
        location:{},
        mute: this.props.mute,
        edit:this.props.edit,
        edit_slide_id: this.props.edit_slide_id
      };
      this.topic = 'thought:lobby'
      this.channel_tabs =['Pingal']
 
  }

  setDefaultSlides(){
      // To do : load data from chat server
    
      let slides = require('../data/slides.js')
        //console.log(slides);
        this.setState(() => {
        return {
            slides: slides,
        };
        });

  }

  setLobby(){
        this.chat_server = this.props.server(this.user._id)      
        this.lobby = this.chat_server.lobby(this.topic, this.onReceive) 
  }

   setLocation(){
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
        this.setDefaultSlides()
        this.setLocation()

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
      this.server.send(this.channel, slides)
  }
  
  onSave(){
      let edit_slide_id = Math.round(Math.random() * 1000000)
      this.setState({
          edit:false,
          edit_slide_id: edit_slide_id
      })
      console.log(this.state)
  }
  

   onReceive(text) {
        console.log("Rendering received msg")

        // convert timestamp
        text["inserted_at"] = new Date(text["inserted_at"])
        text["updated_at"] = new Date(text["updated_at"])
        text["date"] = moment(text["inserted_at"]).format('YYYY/MM/DD')
        console.log(text)
        this.setState((previousState) => {   
            return {
                slides: Channel.update(previousState.slides, text),
            };
        });

    }
   
   onNavigation(params){
         this.props.navigator.push({
            id: 'lobby',
            params: params

        })        
    }
    /*
    onNavigation(id='lobby', params){
        let previous={
            topic: this.topic,
            server: this.server,
            user: this.user,
            channel_tabs: this.channel_tabs,
            muteInputToolbar: false,
        }
        console.log("navigation to screen")
        console.log(params)
        let current = Object.assign({}, previous, params)
        console.log(id)
        console.log(current)
        this.props.navigator.push(
            {id: id, 
            params: current 
            })
    }
    */

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

    renderTopbar() {

        
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

      let store = this.props.store
      console.log(store.user.getUser())
      console.log(store.channel.getChannel())
    // 
      console.log(this.topic)
      console.log(this.channel_tabs)
      console.log(this.user)

      return (
            <Channel
                store={store}
                navigator={this.props.navigator}
                server={this.server}

                slides={this.state.slides}
                muteInputToolbar={this.state.mute}

                topic={this.topic}
                channel_tabs={this.channel_tabs}
                user={this.user}

                onSend={this.onSend}
                onSave={this.onSave}
                onNavigation={this.onNavigation} 
                renderTopbar={this.renderTopbar}   
                {...this.props}
            />
        )

  }
}

StartLobby.defaultProps = {
  mute: false,
  edit: true,
  edit_slide_id: Math.round(Math.random() * 1000000)
}


 