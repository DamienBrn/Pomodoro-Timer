
import {StyleSheet} from 'react-native'


export const styles = StyleSheet.create({

    main_container : {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#1f1f1f',
    },


     //*** Timer ***//

    timer_value_container : {
        justifyContent : 'center',
        alignItems : 'center',
        height : 250,
        lineHeight : 240,
        width : 250,
        borderRadius : 250/2,
        borderWidth : 4,
        marginTop : 50,
        marginBottom : 50
    },

    timer_message : {
        fontSize : 24,
        color : '#ffffff',
    },
    
    timer_message_focus : {
        color : '#a32727',
    },

    timer_message_break : {
        color : '#41b31e'
    },

    timer_value : {
        fontSize : 60,
        color  : '#ffffff',
    },

    timer_value_border_pause : {
        borderColor : '#2b6cb3',
    },

    timer_value_border_focus : {
        borderColor : '#a32727',
    },

    timer_value_border_break : {
        borderColor : '#41b31e',
    },

    //*** End ***//

    //*** Buttons (top and bottom) ***//

    buttons_container : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        width:'100%',
    },

    buttons_container_bottom : {
        flex : 2,
    },

    buttons_container_top : {
        flex : 3,
    },

    button_colors : {
        color : '#ffffff',
        backgroundColor :'#2b6cb3',
    },

    button_format : {
        textAlign : 'center',
        fontSize : 20,
        padding : 5,
        width : 100,
        borderRadius : 30,
    },

    disabled_button : {
        backgroundColor : 'rgba(41, 112, 227, 0.2)',
    },

    pause_button : {
        backgroundColor : '#a32727',
    },

     //*** End ***//

     
     //*** User inputs ***//

    inputs_container : {
        flex : 2,
        flexDirection : 'row',
        justifyContent : 'space-around',
        width : '100%',
    },

    user_input : {
        backgroundColor : '#2E2E2E',
        color : '#ffffff',
        padding : 10,
        height : 35,
        width : 100,
        borderRadius : 5,
    },

    //*** End ***//


    //*** Shared styling ***//

    flex_direction_row : {
        flexDirection : 'row'
    },

    space_around : {
        justifyContent : 'space-around'
    },

    width_number : {
        width : 30,
        textAlign : 'center'
    },

    font_white :{
        color : '#ffffff'
    },

    big_bold_font : {
        fontSize : 20,
        fontWeight : 'bold'
    },

    margin_top : {
        marginTop : 15
    },

})

