
import {reaction, observable, observe, computed, autorun} from 'mobx'
import LocalStore from 'react-native-store';
import autobind from 'autobind-decorator'
import ChatServer from '../model/ChatServer';

export const LocalDB = {
    slide: LocalStore.model('slide'),
    user: LocalStore.model('user'),
    thought: LocalStore.model('thought'),
    device: LocalStore.model('device'),
    hash : LocalStore.model('hash')
}


@autobind
class SlideStore{
    @observable slides = []

    getSlides = () => {
        return this.slides.slice()
    }

    appendSlides = (items) => {
            if (!Array.isArray(items)) {
                items = [items];
            }
            this.slides = items.concat(this.slides.slice());
        }

    prependSlides = (items) => {
            if (!Array.isArray(items)) {
                items= [items];
            }
            this.slides = this.slides.slice().concat(items);
        }

    removeSlide (item) {
        this.slides = this.slides.filter((s) => {
            return s._id !== item._id
        })
    }

    updateSlide = (slide) => {
            slides = this.slides.slice()
            console.log(slides)
            shouldAppend = true
            
            let previous = (currentslide, index) => {
                return (currentslide.user._id === slide.user._id) && ("edit_id" in slide) && (currentslide.edit_id === slide.edit_id)
            }
            
            let duplicate = (currentslide, index) => {
                return (currentslide.user._id === slide.user._id) && (currentslide.slide_id === slide.slide_id)
            }
            
            previousSlideIndex = slides.findIndex(previous)
            if (previousSlideIndex >= 0) { 
                // edit mode and not the first word 
                // save mode but previous edit exist
                //console.log("edited")
            // console.log(previousSlideIndex)        
                slides[previousSlideIndex] = slide
                this.slides = slides
                
            } else if (slides.findIndex(duplicate) < 0) {
                // append only new slides loaded from database
                this.slides = this.appendSlides(slide)
                //console.log("append")
            }
        
        }
}

@autobind
class ThoughtStore {
    @observable thoughts = []

    appendThoughts = (items) => {
        if (!Array.isArray(items)) {
            items = [items];
        }
        this.thoughts = thoughts.concat(this.items);
    }

    getThoughts = () => {
        return this.thoughts
    }

}

@autobind
class UserStore {
        @observable user = {} //{hash: '', phone:'', ...},
        @observable devide = {}

       setUser = (obj) => {
            this.user = obj
        }

        getUser = () => {
            return {
                _id: this.user._id ,
                name: this.user.name,
                avatar: this.user.avatar,
                hash: this.user.hash,
                deviceid: this.user.deviceid
            }
        }

        updateUser = (obj) => {
            for (key in obj) {
                this.user[key] = obj[key]
            } 

        }
}

@autobind
class ChannelStore {
        @observable channel_tabs = []
        @observable channel = {} //{name: '', id:''},
        @observable channel_properties = {} // {mute: false}

       addChannelTabs = (item) => {
            this.channel_tabs.push(item)
        }

        getChannelTabs = () => {
            return this.channel_tabs
        }

        deleteChannelTabs = (item) => {
            this.channel_tabs = this.channel_tabs.filter((c) => {
                return c !== item
            })

        }
    
       setChannel = (obj) => {
            this.channel = obj
        }

        getChannel = () => {
            return {
                topic: this.channel.topic,
                topic_id: this.channel.topic_id
            }
        }

        updateChannel = (obj) => {
            for (key in obj) {
                this.channel[key] = obj[key]
            }

        }

        updateChannelProperty = (obj) => {
            for (key in obj) {
                this.channel_properties[key] = obj[key]
            }

        }

        getChannelProperties = () => {
            return this.channel_properties
        }
}

@autobind
class ServerStore {
        @observable server = {} // chat server socket

        setServer = (user_id) => {
            this.server = obj
        }

        getServer = () => {
            return this.server
        }
}

export let Store = {
  chat: new SlideStore(),
  thought: new ThoughtStore(),
  user: new UserStore(),
  channel: new ChannelStore(),
  server: new ServerStore(),
}
 

