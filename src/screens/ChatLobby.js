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

import moment from 'moment/min/moment-with-locales.min';


@autobind
@observer
export default class ChatLobby extends Component {
  constructor(props) {
      super(props);

      this.user = this.props.route.params.user 
      this.topic = this.props.route.params.topic
      this.topic_id = this.props.route.params.topic_id
      this.channel_tabs = this.props.route.params.channel_tabs || []

      //this.server = ChatServer(this.user._id)
      this.server = this.props.route.params.server
      this.channel = this.server.lobby(this.topic_id, this.onReceive)
 
      this.state = {
        slides: [],
        mute: this.props.mute,
        edit:this.props.edit,
        edit_slide_id: this.props.edit_slide_id
      };
 
  }

  componentWillMount(){
     // To do : load data from chat server
     /*
      let slides = require('../data/slides.js')
        //console.log(slides);
        this.setState(() => {
        return {
            slides: slides,
        };
        });
    */
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

    renderTopbar() {
        let shareOptions = {
            title: `Pingal: ${this.props.topic}`,
            message: `Join me my Pingal channel ${this.props.topic}`,
            url: "http://facebook.github.io/react-native/",
        }
            
        const topbarProps = {    
            channel_tabs: this.channel_tabs,
            leftButton: "step-backward",
            onLeftPress: () => {
                this.props.navigator.push({ 
                    id: 'thought', 
                  }) 
            },
            rightButton: "whatsapp",
            onRightPress: () => {               
                Share.shareSingle({
                    ...shareOptions, 
                    "social": "whatsapp"
                })
            },
             
        }

        return (
            <CustomNavBar {...topbarProps} />
        ) 
    }

    render(){

      let store = this.props.store
      console.log(store.user.getUser())
      console.log(store.channel.getChannel())
    // 

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

ChatLobby.defaultProps = {
  mute: false,
  edit: true,
  edit_slide_id: Math.round(Math.random() * 1000000)
}


      /*
       <Screen
                server={this.server}
                user={this.user}
                topic={this.topic}
                channel_tabs={this.channel_tabs}
                navigator={this.props.navigator}
                actionBar={true}  
                muteInputToolbar={this.mute}              
                {...this.props}
                
            />
      */


  /*
      slide = {
          _id: ,
          slide_id:
          body:
          timestamp:
          user: {}
          abc: []
      }
      temp_slide_id : a tracker to regenerate slide components 
      edit_slide_id: a temporary id to ensure we are updating the correct slide
      slide_id: the slide id in the database
    */
    /*
    let temp_slide_id = Math.round(Math.random() * 1000000) 
    let slide_id = temp_slide_id
    let slide={
            _id: temp_slide_id,
            edit: this.state.edit,
            edit_id: this.state.edit_slide_id,
            slide_id: slide_id,
            body: text.body,            
            user: {
                _id: text.params.user_id,
                name: text.user.name,
                // avatar: 'https://facebook.github.io/react/img/logo_og.png',
            },
            timestamp: text.timestamp,
            }
    */
    /*
    if (!this.state.edit) {
        // slide_id = text.params.id
        this.setState({edit: true })
        // add the slide to DB
        // DB.slide.add(text)
    } else {     
        this.setState((previousState) => {   
            return {
                slides: Channel.update(previousState.slides, slide),
            };
        });
    }
    */


    // [{_id:'', user._id:'', body:''}]
    /*
    this.setState((previousState) => Channel.update(previousState.slides, slide))
  
   static update(currentSlides = [], slide) {
     currentSlides.forEach((currentslide) => {
        if (slide.user._id === currentslide.user._id) {
                currentslide = slide
             }
        }
        
        return currentSlides
    }

    */
    /*
    
    if (!this.state.edit) {
        
    }
    */ 

          // To do: chat
     // this.onSend = this.onSend.bind(this);
     // this.onSave = this.onSave.bind(this);
     // this.onReceive = this.onReceive.bind(this);
     // this.onNavigation = this.onNavigation.bind(this)