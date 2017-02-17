import { 
    StyleSheet,
    Platform, 
    PixelRatio,
    Dimensions,
} from 'react-native';

import t from 'tcomb-form-native'

// colors from https://flatuicolors.com/   
export const colors = {
  black: "#1d1f21",
  very_dark_gray: "#80827D", // 01
  dark_gray: "#373b41", // 02
  gray: "#969896", // 03
  light_gray: "#b2b2b2", // 04
  very_light_gray: "#cfcfcf", // 05
  almost_white: "#f5f5f5", // 06
  white: "#ffffff", // 07
  red: "#cc6666", // 08
  //orange: "#de935f", // 09
  orange: "#f57f17",
  yellow: "#f0c674", // 0A
  green: "#b5bd68", // 0B
  cyan: "#8abeb7", // 0C
  blue: "#81a2be", // 0D
  almost_blue: "#0084ff",
  message_blue: "rgb(0, 132, 255)",
  purple: "#b294bb", // 0E
  brown: "#a3685a", // 0F,
  carrot: '#e67e22', // carrot
  emerald: '#2ecc71', // emerald
  peter_river: '#3498db', // peter river
  wisteria: '#8e44ad', // wisteria
  alizarin: '#e74c3c', // alizarin
  turquoise: '#1abc9c', // turquoise
  midnight_blue: '#2c3e50', // midnight blue
  sunflower: "#f1c40f",
  asbestos: "#7f8c8d",
  test:"#212121"
  

}

const choose_palette = (name) => {
    switch(name){
        case "light_gray": 
            palette_default
            break;
        default: 
            palette_default
    }
}

const palette_default = palette

export const palette = {
    text_color: colors.black,
    title_color: colors.back,
    left_slide_text_color: colors.black,
    right_slide_text_color: colors.white,
    avatar_text_color: colors.white,
    left_time_text_color: colors.dark_gray,
    right_time_text_color: colors.white,

    tab_color: colors.very_light_gray,
    link_color: colors.black,
    right_link_color: colors.black,
    button_color: colors.black,
    hashtag_color: colors.black,
    quote_color: colors.light_gray,
    code_color: colors.black,

    border_color: colors.very_light_gray,
    border_color2: colors.black,
    
    icon_color: colors.white,
    icon_color2: colors.black,

    background_color: colors.white,
    container_background_color: colors.white,
    wrapper_background_color: colors.white,
    left_wrapper_background_color: colors.almost_white,
    right_wrapper_background_color: colors.message_blue,
    input_wrapper_background_color: colors.almost_white,
    
    navbar_background_color: colors.orange,
    toolbar_background_color: colors.orange,
           
}

//let palette = choose_palette("light_gray")

export const spacing = {
    zero: 0,
    small: 5,
    between_small_medium: 8,
    medium: 10,
    betwen_medium_large: 12,
    large: 16,
    huge: 60
}

export const font = {
    tiny_weight: "100",
    small_weight: "200",
    medium_weight: "400",
    large_weight: "600",

    tiny_size: 10,
    small_size: 12,
    between_small_medium_size: 14,
    medium_size: 16,
    large_size: 18,
    strong_size: 20,

    family:'',
}

export const line = {
    thin_height: 12,
    small_height: 14,
    medium_height: 16,
    large_height: 20,
    auto_height: 1 / PixelRatio.get(),
    
    zero_width: 0,
    thin_width: 1,
    small_width: 2,
    medium_width: 3,
    large_width: 4,
    auto_width: 1 / PixelRatio.get(),
    
    zero_radius : 0,
    thin_radius : 3,
    small_radius : 13,
    medium_radius : 15,
    between_medium_large_radius: 18,
    large_radius : 20,
    auto_radius: 1 / PixelRatio.get(),

    style : 'dashed' // solid, dotted, dashed
}

export const icon = {
 /*
   margin:Platform.select({
      ios: spacing.medium,
      android: spacing.small,
    }), 
    marginLeft: Platform.select({
      ios: spacing.zero,
      android: spacing.small,
    }),
*/

    //alignSelf:'center'
}


let Form = t.form.Form;
// clone the default stylesheet
export const formStylesheet = Form.stylesheet

// overriding the text color
formStylesheet.controlLabel.normal = {
    color: 'black',
    fontSize: 14,
    alignSelf:'flex-start',
    marginLeft:5,
    marginBottom: 5,
    marginTop: 5,
}
formStylesheet.textbox.normal = {
    color: '#000000',
    fontSize: 14,
    height: 36,
    padding: 7,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderColor: colors.very_dark_gray, // <= relevant style here
    borderWidth: 1,
    marginBottom: 5,
    marginLeft:5,
    marginRight:5,
}

export const camera = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});



export const splash = StyleSheet.create({
  container: {
    flex:1, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor: palette.background_color,
  },
    left_wrapper: {
      borderRadius: line.medium_radius,
      backgroundColor: palette.left_wrapper_background_color,
    },
    right_wrapper: {
      borderRadius: line.medium_radius,
      backgroundColor: palette.right_wrapper_background_color,
    },
    wrapper2: {
       flexDirection:'row',
        borderRadius: line.medium_radius,
        marginTop: spacing.large,
        
    },
    signWrapper:{
        flexDirection:'column', 
        justifyContent: 'center',
        marginTop: spacing.large,
        marginBottom: spacing.medium,
    },
    signTextInput:{
      height: 40, 
      borderColor: palette.border_color2, 
      backgroundColor: palette.wrapper_background_color, 
      borderWidth: line.thin_width,
      color: colors.black,
      fontSize: font.medium_size,
      lineHeight: line.medium_height,
 
    },
    scrollWrapper:{
        marginTop: spacing.medium,
        marginBottom: spacing.medium,
    },
    form: {
      width:250, 
      alignSelf:'center'
    },
    h1:{
      color: palette.title_color,
      fontWeight: font.large_weight,
      fontSize: font.large_size,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
        alignSelf: 'center'

    },
    text: {
      color: palette.title_color,
      fontSize: font.medium_size,
        lineHeight: line.large_height,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
        alignSelf: 'center'
    },
    titleText: {
      color: palette.title_color,
      fontWeight: font.large_weight,
      fontSize: font.medium_size,
      
    },
     icon: {
      alignItems: 'center',
       marginLeft: spacing.medium,
  },
  iconContainer: {
      alignItems: 'center',
       marginLeft: spacing.medium,
       marginBottom: spacing.medium,
       borderTopWidth: line.tiny_width,
       borderTopColor: palette.border_color,
  },
});



export const chat = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background_color,
  },
});


export const input_toolbar = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center"
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mailto: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: line.auto_width,
    borderBottomColor: palette.border_color,

  },
  accessory: {
    height: 44,
  },
  tool: {
      flexDirection:'row',
      height:30,
      alignItems: 'center',
      marginLeft: spacing.small,
      
  },
  toolText: {
      fontSize: font.small_size,
      color: palette.button_color, 
      paddingLeft: spacing.small,  
  },
  icon:{
      color: palette.icon_color
  },
   iconText: {
      fontSize: font.strong_size,
      fontFamily: 'iconfont',
      color: '#666'
  },

  toolbar: {
      flexDirection: 'row',
      flex:1,
      justifyContent:"space-around",
      backgroundColor: palette.toolbar_background_color,
      borderWidth: line.auto_width,
      borderLeftWidth: line.zero_width,
      borderRightWidth: line.zero_width,
      borderColor:  colors.very_light_gray,
  },
});

export const nav_buttons = StyleSheet.create({
  buttonsBox: {
    flex: 1, 
    flexDirection: "row",
  },
  button: {
    flex: 1, 
    alignItems: "center",
  },
  buttonText: {
    fontSize: 10,
  },
})

//backgroundColor: palette.background_color,
    
export const composer = StyleSheet.create({
  textInputBox: {
    flex: 2,
    backgroundColor: palette.input_wrapper_background_color,
    borderRadius: line.medium_radius,
    marginRight: spacing.small,
    marginLeft: spacing.small,
    marginBottom: spacing.small,
  },
  textInput: {
    flex: 2,
    color: palette.left_slide_text_color,
    marginLeft: spacing.medium,
    fontSize: font.medium_size,
    lineHeight: line.medium_height,
    marginTop: Platform.select({
      ios: 6,
      android: 0,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 3,
    }),
  },
});

export const thought = StyleSheet.create({
  textInput: {
    color: palette.text_color,
    fontSize: font.medium_size,
    lineHeight: line.medium_height,
  },
  container: {
    flex:1,
    backgroundColor: palette.background_color,
  },
  primary: {
    flex:1,
    borderRadius: line.medium_radius,
      marginRight: spacing.medium,
      marginLeft: spacing.medium,
      marginTop: spacing.medium,
      marginBottom: spacing.medium
  },
  formContainer: {
    borderRadius: line.medium_radius,
    padding: spacing.small,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    marginRight: spacing.medium,
      marginLeft: spacing.medium,
      marginTop: spacing.medium,
      marginBottom: spacing.medium

  },
  
  inputPrimary: {
    flexDirection: 'row',
    flex:1,
    borderRadius: line.medium_radius,
      backgroundColor: palette.input_wrapper_background_color,
      marginRight: spacing.medium,
      marginLeft: spacing.medium,
      marginTop: spacing.medium,
      marginBottom: spacing.medium

  },
  pingto: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: line.auto_width,
    borderBottomColor: palette.border_color,

  },
  
  icon:{
      color: palette.icon_color
  },
   iconText: {
      fontSize: font.strong_size,
      fontFamily: 'iconfont',
      color: '#666'
  },
 
  listContainer: {
    
    borderRadius: line.medium_radius,
    padding: spacing.small,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
 
  },
  listH1:{
      color: palette.title_color,
      fontWeight: font.large_weight,
      fontSize: font.large_size,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
        alignSelf: 'center'

    },
  listH3:{
      color: palette.right_slide_text_color,
      fontWeight: font.small_weight,
      fontSize: font.small_size,
        marginTop: spacing.medium,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
        alignSelf: 'center'

    },

  listWrapper: {
    //flex:2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: line.medium_radius,
    marginLeft: spacing.large,
    marginRight: spacing.large,
  },
  channelWrapper: {
    //flex:2,
  //  alignItems: 'center',
  //  justifyContent: 'center',
  //  flexDirection: 'row',
  //  flexWrap: 'wrap',
    borderRadius: line.medium_radius,
  //  backgroundColor: colors.almost_white,
    marginTop: spacing.huge,
  //  marginLeft: spacing.large,
  //  marginRight: spacing.large,
  },
  rowWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: line.thin_radius,
    backgroundColor: colors.almost_white,
    marginLeft: spacing.medium,
    marginRight: spacing.medium, 
     marginTop: spacing.medium, 
     marginBottom: spacing.small, 
  },
  channelRowWrapper: {
    // justifyContent: 'center',
     alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopWidth: line.thin_width,
    borderTopColor: colors.almost_white,
    //backgroundColor: colors.almost_white,
    marginLeft: spacing.medium,
    marginRight: spacing.medium, 
     marginTop: spacing.medium, 
     marginBottom: spacing.small, 
  },
  rowIcon: {
    marginLeft: spacing.medium, 
    alignSelf:'center'
  },
  rowText: {
      alignSelf:'center',
      //color: palette.left_slide_text_color,
      color: colors.orange,
      fontWeight: font.large_weight,
     // fontSize: font.medium_size,
      lineHeight: line.medium_height,
      marginTop: spacing.small,
      marginBottom: spacing.small,
      marginRight: spacing.small,
      
    },
  channelRowText: {
      alignSelf:'center',
      color: palette.left_slide_text_color,
      fontWeight: font.large_weight,
      lineHeight: line.medium_height,
      marginTop: spacing.small,
      marginBottom: spacing.small,
      marginLeft: spacing.small,
      marginRight: spacing.small,     
    },

  
});

export const slide_maker = StyleSheet.create({
  textInput: {
    color: palette.text_color,
    backgroundColor: palette.wrapper_background_color,
    fontSize: font.medium_size,
    lineHeight: line.medium_height,
  },
   signTextInput:{
      flex:1, 
      borderColor: palette.border_color2, 
      backgroundColor: palette.wrapper_background_color, 
      borderWidth: line.thin_width,
      color: colors.black,
      fontSize: font.medium_size,
      lineHeight: line.medium_height,
 
    },
  container: {
    flex:1,
    borderTopWidth: line.auto_width,
    borderTopColor: palette.border_color,
    backgroundColor: palette.container_background_color,  
    },
  primary: {
    flex:1,
    borderRadius: line.medium_radius,
      backgroundColor: palette.right_wrapper_background_color,
      marginRight: spacing.medium,
      marginLeft: spacing.medium,
      marginTop: spacing.medium,
      marginBottom: spacing.medium
  },
  secondary:{
    flex:1,
    backgroundColor: palette.left_wrapper_background_color,
    borderRadius: line.medium_radius,
    marginRight: spacing.medium,
      marginLeft: spacing.medium,
      marginTop: spacing.medium,
      marginBottom: spacing.medium
      
  },
  mailto: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: line.auto_width,
    borderBottomColor: palette.border_color,

  },
  accessory: {
    flex:1,
    marginBottom: spacing.medium
  },
  wrapper:{
    flex:3,
    flexDirection: 'row',
  },
  toolbar: {
      flexDirection: 'row',
      flex:1,
      justifyContent:"space-around",
      borderWidth: line.auto_width,
      borderLeftWidth: line.zero_width,
      borderRightWidth: line.zero_width,
      borderColor:  colors.very_light_gray,
  },
  tool: {
      flexDirection:'row',
      height:30,
      alignItems: 'center',
      marginLeft: spacing.small,
      
  },
  toolText: {
      fontSize: font.small_size,
      color: palette.button_color, 
      paddingLeft: spacing.small,  
  },
  icon:{
      color: palette.icon_color
  },
   iconText: {
      fontSize: font.strong_size,
      fontFamily: 'iconfont',
      color: '#666'
  },
 
  listContainer: {
    flex:1,
    borderRadius: line.medium_radius,
    padding: spacing.small,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
 
  },
  listH1:{
      color: palette.title_color,
      fontWeight: font.large_weight,
      fontSize: font.large_size,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
        alignSelf: 'center'

    },
  listH3:{
      color: palette.title_color,
      fontWeight: font.small_weight,
      fontSize: font.small_size,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
        alignSelf: 'center'

    },
  rowText: {
      alignSelf:'center',
      color: palette.left_slide_text_color,
      fontSize: font.medium_size,
      lineHeight: line.medium_height,
      marginTop: spacing.small,
      marginBottom: spacing.small,
      marginRight: spacing.small,
      
    },
  listWrapper: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: line.medium_radius,
    marginLeft: spacing.large,
    marginRight: spacing.large,
  },
  rowWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: line.medium_radius,
    backgroundColor: colors.white,
    marginLeft: spacing.medium,
    marginRight: spacing.medium, 
     marginTop: spacing.medium, 
     marginBottom: spacing.small, 
  },
  rowIcon: {
    marginLeft: spacing.medium, 
    alignSelf:'center'
  },

  
});
//backgroundColor: palette.toolbar_background_color,
      




export const slide = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: spacing.between_small_medium,
      marginRight: spacing.zero,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: spacing.zero,
      marginRight: spacing.between_small_medium,
    },
  }),
};


export const slide_sheet = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: line.medium_radius,
      backgroundColor: palette.left_wrapper_background_color,
      marginRight: spacing.huge,
    },
    containerToNext: {
      borderBottomLeftRadius: line.thin_radius,
    },
    containerToPrevious: {
      borderTopLeftRadius: line.thin_radius,
    },
    text: {
      alignSelf:'flex-start',
      color: palette.left_slide_text_color,
      fontSize: font.medium_size,
        lineHeight: line.large_height,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
    },
    mapView: {
      width: 150,
      height: 100,
      borderRadius: 13,
      margin: 3,
    },
    cardHeight: {
      height: 200,
    }
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: line.medium_radius,
      backgroundColor: palette.right_wrapper_background_color,
      marginLeft: spacing.huge,
    },
    containerToNext: {
      borderBottomRightRadius: line.thin_radius,
    },
    containerToPrevious: {
      borderTopRightRadius: line.thin_radius,
    },
    text: {
      alignSelf:'flex-start',
      color: palette.right_slide_text_color,
      fontSize: font.medium_size,
        lineHeight: line.large_height,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
    },
    mapView: {
      width: 150,
      height: 100,
      borderRadius: 13,
      margin: 3,
    },
  }),
};


export const slide_image = StyleSheet.create({
  container: {
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: line.small_radius,
    margin: 3,
    resizeMode: 'cover',
  },
});


export const slide_text = {
  left: StyleSheet.create({
    container: {
    },
    wrapper: {
      borderRadius: line.medium_radius,
      backgroundColor: palette.left_wrapper_background_color,
      marginRight: spacing.huge,
    },
    text: {
      color: palette.left_slide_text_color,
      fontSize: font.medium_size,
        lineHeight: line.large_height,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
    },
    link: {
      color: palette.link_color,
      textDecorationLine: 'underline',
     fontSize: font.medium_size,
     lineHeight: line.large_height,
     marginTop: spacing.small,
     marginBottom: spacing.small,
     marginLeft: spacing.medium,
     marginRight: spacing.medium,
        },
    hashtag: {
      color: colors.hashtag_color,
    },
    bold: {
      fontWeight: font.large_weight,
    },

    italic: {
      fontStyle: 'italic',
    },
    bolditalic: {
      fontWeight: font.large_weight,
      fontStyle: 'italic',
    },
    h1: {
      fontSize: font.large_size,
      fontWeight: font.large_weight,
    },
    h2: {
      fontSize: font.medium_size,
      fontWeight: font.medium_weight,
    },
    h3: {
      fontSize: font.between_small_medium_size,
    },
    strikethrough: {
      textDecorationLine: 'line-through',
    },
    underline: {
      textDecorationLine: 'underline',
    },
    blockquote: {
      color: colors.quote_color,
    },
    code: {
      color: colors.code_color,
      fontStyle: 'italic',

    },
  }),
  right: StyleSheet.create({
    container: {
    },
    wrapper: {
       borderRadius: line.medium_radius,
       backgroundColor: palette.wrapper_background_color,
       marginRight: spacing.huge,
    },
    text: {
      color: palette.right_slide_text_color,
        fontSize: font.medium_size,
        lineHeight: line.large_height,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
    },
    link: {
      color: colors.right_link_color,
      textDecorationLine: 'underline',
        fontSize: font.medium_size,
        lineHeight: line.large_height,
        marginTop: spacing.small,
        marginBottom: spacing.small,
        marginLeft: spacing.medium,
        marginRight: spacing.medium,
    },
    hashtag: {
      color: colors.hashtag_color,
    },
    bold: {
      fontWeight: font.large_weight,
    },
    italic: {
      fontStyle: 'italic',
    },
    bolditalic: {
      fontWeight: font.large_weight,
      fontStyle: 'italic',
    },
    h1: {
      fontSize: font.large_size,
      fontWeight: font.large_weight,
    },
    h2: {
      fontSize: font.medium_size,
      fontWeight: font.medium_weight,
    },
    h3: {
      fontSize: font.between_small_medium_size,
    },
    strikethrough: {
      textDecorationLine: 'line-through',
    },
    underline: {
      textDecorationLine: 'underline',
    },
    blockquote: {
      color: colors.quote_color,
    },
    code: {
      color: colors.code_color,
      fontStyle: 'italic',

    },
  }),
};



export const action = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: spacing.medium,
    marginBottom: spacing.medium,
  },
  wrapper: {
    borderRadius: line.small_radius,
    borderColor: palette.border_color,
    borderWidth: line.small_width,
    flex: 1,
  },
  iconText: {
    color: palette.text_color,
    fontWeight: font.large_weight,
    fontSize: font.medium_size,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});


export const avatar = {
  left: StyleSheet.create({
    container: {
      marginRight: spacing.between_small_medium,
    },
    image: {
      height: 36,
      width: 36,
      borderRadius: line.between_medium_large_radius,
    },
  }),
  right: StyleSheet.create({
    container: {
      marginLeft: spacing.between_small_medium,
    },
    image: {
      height: 36,
      width: 36,
      borderRadius: line.between_medium_large_radius,
    },
  }),
};

export const custom_avatar = {
  avatarStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: line.large_radius,
  },
  textStyle: {
    color: palette.avatar_text_color,
    fontSize: font.medium_size,
    backgroundColor: 'transparent',
    fontWeight: font.tiny_weight,
  },
};


export const day = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.small,
    marginBottom: spacing.medium,
  },
  wrapper: {
    // backgroundColor: '#ccc',
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 5,
    // paddingBottom: 5,
  },
  text: {
    backgroundColor: 'transparent',
    color: palette.text_color,
    fontSize: font.small_size,
    fontWeight: font.large_weight,
  },
});


export const time = {
  left: StyleSheet.create({
    container: {
       marginLeft: spacing.medium,
       marginRight: spacing.medium,
       marginBottom: spacing.small,
    },
    text: {
      color: palette.left_time_text_color,
      fontSize: font.tiny_size,
      backgroundColor: 'transparent',
      textAlign: 'right',
    },
  }),
  right: StyleSheet.create({
    container: {
       marginLeft: spacing.medium,
       marginRight: spacing.medium,
       marginBottom: spacing.small,
    },
    text: {
      color: palette.right_time_text_color,
      fontSize: font.tiny_size,
      backgroundColor: 'transparent',
      textAlign: 'right',
    },
  }),
};


export const load_earlier = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: spacing.small,
    marginBottom: spacing.medium,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#b2b2b2",
    borderRadius: line.medium_radius,
    height: 30,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: font.small_size,
  },
});


export const sendButton = StyleSheet.create({
  container: {
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    marginBottom: spacing.betwen_medium_large,     
},
  text: {
    color: palette.button_color,
    fontWeight: font.large_weight,
    fontSize: font.large_size,
    backgroundColor: 'transparent',
  
  },
});


export const navbar = StyleSheet.create({
  container: {
    borderTopWidth: line.auto_width,
    borderTopColor: palette.border_color,
    backgroundColor: palette.navbar_background_color,
    borderBottomWidth: line.auto_width,
    borderBottomColor: palette.border_color,

  },
  statusBar: {
   backgroundColor: palette.navbar_background_color,

  },
  navBar: {
    backgroundColor: palette.navbar_background_color,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: palette.border_color,
    borderBottomWidth: line.auto_width,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    marginBottom: spacing.small,  
  },
  titleText: {
    color: palette.title_color,
    fontSize: font.small_size,
    fontWeight: font.small_weight,
    backgroundColor: 'transparent',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    paddingLeft: Platform.select({
      ios: spacing.medium,
      android: spacing.zero,
    }),
    paddingRight: Platform.select({
      ios: spacing.medium,
      android: spacing.zero,
    }),
    borderRadius: line.medium,

  },
  chatnavBar: {
    backgroundColor: palette.navbar_background_color,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: palette.border_color,
    borderBottomWidth: line.auto_width,
  },
  icon: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',

      
  },
  iconText: {
    color: palette.avatar_text_color,
    fontWeight: font.medium_weight,
    fontSize: font.medium_size,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
      
});


const TOP_BAR_HEIGHT = 33;
const STATUS_BAR_HEIGHT = 20;

/*
May not be needed

*/
const backButton = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,

  },
  text: {
    color: 'black',
    fontWeight: '200',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
});

const inviteButton = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 5,
  },
  text: {
    color: '#0084ff',
    fontWeight: '600',
    fontSize: 14,
    backgroundColor: 'transparent',
  },
});

const mailto = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 25,
    fontSize: 16,
    lineHeight: line.medium_height,
    height: 15,
    marginTop: Platform.select({
      ios: 8,
      android: 4,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 2,
    }),
  },
});

const network = StyleSheet.create({
  textInput: {
    flex: 1,
    marginLeft: 25,
    fontSize: 16,
    lineHeight: line.medium_height,
    height: 15,

    marginTop: Platform.select({
      ios: 8,
      android: 4,
    }),
    marginBottom: Platform.select({
      ios: 5,
      android: 2,
    }),
  },
});

const networkBar = StyleSheet.create({
 
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b2b2b2',
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 12,
  },
});

