import React, { Component, PropTypes } from 'react';

import {
  TouchableHighlight,
  LayoutAnimation, 
  View, 
  ScrollView,
  ListView 
} from 'react-native'

import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Swiper from 'react-native-swiper';
import SwipeableViews from 'react-swipeable-views/lib/index.native.animated';
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import virtualize from 'react-swipeable-views/lib/virtualize'
import FoldView from 'react-native-foldview';
import LoadEarlier from './LoadEarlier';
import Slide from './Slide';
import moment from 'moment/min/moment-with-locales.min';

export default class SlideContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      height: 280,
    };
    this.renderFooter = this.renderFooter.bind(this);
    this.renderSlide = this.renderSlide.bind(this);
   this.flip = this.flip.bind(this)
  }

  componentWillMount() {
    this.flip = this.flip.bind(this);
    this.handleAnimationStart = this.handleAnimationStart.bind(this);
    this.renderFrontface = this.renderFrontface.bind(this);
    this.renderBackface = this.renderBackface.bind(this);
    this.renderBase = this.renderBase.bind(this);
 
  }
  
  flip() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  handleAnimationStart(duration, height) {
    const isExpanding = this.state.expanded;

    const animationConfig = {
      duration,
      update: {
        type: isExpanding ? LayoutAnimation.Types.easeOut : LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.height,
      },
    };

    LayoutAnimation.configureNext(animationConfig);

    this.setState({
      height,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const slidesHash = this.props.slidesHash
    const loadEarlier = this.props.loadEarlier
    const footer = this.props.footer

    if (slidesHash === nextProps.slidesHash && loadEarlier === nextProps.loadEarlier && footer === nextProps.footer) {
      return false;
    }
    return true;
  }

  renderFooter() {
    const footer = this.props.footer
    if (footer) {
      const footerProps = {
        ...this.props,
      };
      return footer(footerProps);
    }
    return null;
  }

  renderHeader() {
    const loadEarlier = this.props.loadEarlier

    if (loadEarlier === true) {
      const loadEarlierProps = {
        ...this.props,
      };
      return (
        <LoadEarlier {...loadEarlierProps}/>
      );
    }
    return null;
  }

  scrollTo(options) {
    this._invertibleScrollViewRef.scrollTo(options);
  }

 

  renderSlide(slides, user) {
    children = slides.map((slide, index) => {
              if (!slide._id) {
                console.warn('PingalChat: `_id` is missing for slide', JSON.stringify(slide));
              }
              if (!slide.user) {
                console.warn('PingalChat: `user` is missing for slide', JSON.stringify(slide));
                slide.user = {};
              }

              const slideProps = {
              ...this.props,
              key: slide._id,
              currentSlide: slide,
              previousSlide: slides[index + 1] || {},
              nextSlide: slides[index - 1] || {},
              position: slide.user._id === user._id ? 'right' : 'left',
            };
                        
              return <Slide {...slideProps}/>;
        
            })
      return children

  }

  renderBase(slides, user, key){
    /*
     <TouchableHighlight
                onPress={() => {this.flip}}>
            <View
             key= {"fold-base-" + key}
            >
              {this.renderSlide(slides, user)}
            </View>
          </TouchableHighlight>
           <View
         key= {"fold-base-" + key}
        style={{
          backgroundColor: '#D6EFFF',
          flex: 1,
        }}
        />
    */
    return(
        


       <TouchableHighlight
                onPress={() => {this.flip}}>
            <View
             key= {"fold-base-" + key}
            >
              {this.renderSlide(slides, user)}
            </View>
          </TouchableHighlight>
      );
  }
  renderFrontface(slides, user, key){
    //console.log(latest_slide)
    /*
   
          <View
          key= {"fold-front-" + key}
        style={{
          backgroundColor: '#D6EFFF',
          flex: 1,
        }}
      />

    */
    return(
          

       <TouchableHighlight
                onPress={() => {this.flip}}>
            <View
             key= {"fold-front-" + key}
            >
              {this.renderSlide(slides, user)}
            </View>
          </TouchableHighlight>
      );
  }

  renderBackface(slides, user, key){
   // console.log(slides)
    /*
        <View
          key= {"fold-back-" + key}
                  style={{
                    width: 40,
                    height: 40,
                    marginRight: 10,
                    backgroundColor: '#BDC2C9',
                  }}
                />
    */
    return(
      
                <TouchableHighlight
                onPress={() => {this.flip}}>
            <View
             key= {"fold-back-" + key}
            >
              {this.renderSlide(slides, user)}
            </View>
          </TouchableHighlight>
      );
  }

  groupObj(list, name, objprop) {
      let groupedfn = (grouped, item) => {
          let obj = item[name];
          let key = obj[objprop]
          grouped[key] = grouped[key] || [];
          grouped[key].push(item);
          return grouped;
      }
      return list.reduce(groupedfn, {})
    }

  group(list, name) {
      let groupedfn = (grouped, item) => {
          let key = item[name];
          grouped[key] = grouped[key] || [];
          grouped[key].push(item);
          return grouped;
      }
      return list.reduce(groupedfn, {})
    }

  renderGroupedSlide(slides, user){
    // group slides by key and sort by time 
    console.log(slides)
    //grouped = this.groupObj(slides, "user", "_id")
    let grouped = this.group(slides, "user_id")
    //let grouped = this.group(slides, "date")
    console.log(grouped)
    const { height } = this.state;

    let ordered = {}
    Object.keys(grouped).sort(
      (a, b) => {
        return moment(a, 'YYYY/MM/DD').toDate() - moment(b, 'YYYY/MM/DD').toDate();
      }).forEach((key) => {
        ordered[key] = grouped[key]
      })
    console.log(ordered)
    grouped_children = Object.keys(ordered).map((key, index) => {
        let slides = grouped[key]
        
        //const latest_slide = [slides.pop()]
        //let zIndex = 100 - 10*index
        /*
        let fold_view = (
                <View
                  key= {"groupeview-" + key}
                  style={{
                   flex:1,
                  }}>
                    <FoldView
                      key= {"groupedf-" + key} 
                      expanded={this.state.expanded}
                      renderBackface={() => this.renderBackface(slides, user, key)}
                      renderFrontface={() => this.renderFrontface(latest_slide, user, key)}
                    >
                      {this.renderBase(latest_slide, user, key)}
                    </FoldView>
              </View>
        )
        */
        let swiper_view = (
            <Swiper style={{flex:-1}}
              key= {"grouped-" + key} >
              {this.renderSlide(slides, user)}
            </Swiper>
        )
        let swipeable_view = (
            <SwipeableViews style={{flex:-1}}
              key= {"grouped-" + key} >
              {this.renderSlide(slides, user)}
            </SwipeableViews>
        )
        let normal_view = (
            <ScrollView style={{flex:-1}}
              key= {"grouped-" + key} >
              {this.renderSlide(slides, user)}
            </ScrollView>
        )
        return normal_view
    })  
    console.log(grouped_children)
    return (
      <View> 
         {grouped_children}
      </View>
    )  
  }

  render() {
    //console.log(`Message container: ${this.props.slides}`)
    //const invertibleScrollViewProps = {
    //  ...this.props.invertibleScrollViewProps,
    //  inverted: true,
   // }
    const slides = this.props.slides
    const user = this.props.user
    
    return (
      <InvertibleScrollView
        {...this.props.invertibleScrollViewProps}
        ref={component => this._invertibleScrollViewRef = component}
      >
        {this.renderFooter()}
        {this.renderGroupedSlide(slides, user)}     
        {this.renderHeader()}
        
      </InvertibleScrollView>
    );
  }
}

SlideContainer.defaultProps = {
  slides: [],
  user: {},
  footer: null,
  onLoadEarlier: () => {},
};


    //const invertibleScrollViewProps = { 
    //        ...this.props.invertibleScrollViewProps, 
     //       inverted: false,      
      //    }
        //  <InvertibleScrollView {...invertibleScrollViewProps}
        //  </InvertibleScrollView>