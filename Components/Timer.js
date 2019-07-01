import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker, Button} from 'react-native'
import Vibrate from '../utils/vibrate'


export default class Timer extends React.Component{

    render(){
        return(
            <View style={styles.container}>

                <View style={[styles.buttons_container, styles.time_options_container]}>
                    <TouchableOpacity onPress={()=>this.changeChosenTime(timeOptions.five)} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format, styles.button_colors, chosenTimeInMinutes !== timeOptions.five ? styles.disabled_button : null ]}>
                            {timeOptions.five} min
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.changeChosenTime(timeOptions.twentyFive)} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format, styles.button_colors, chosenTimeInMinutes !== timeOptions.twentyFive ? styles.disabled_button : null ]}>
                            {timeOptions.twentyFive} min
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.custom_user_input_container} >
                    <TextInput style={styles.user_input} value={this.state.customTimeValue} 
                    placeholder="custom time" 
                    keyboardType='numeric' 
                    maxLength={2} 
                    onChangeText={(value)=> this.valueHasChanged(value)} 
                    onSubmitEditing={()=>this.setCustomTimeValue()}
                    onFocus={()=>this.placeholder = ''}
                    />
                    <Button style={styles.button_custom_user_input} title="Ok" onPress={()=>this.setCustomTimeValue()} />
                </View>

                <View style={styles.timer_value_container} >
                    <Text style={[styles.timer_value, this.setBorderColor()]}>{this.displayTwoDigits(this.state.timerMinutesValue)} : {this.displayTwoDigits(this.state.timerSecondsValue)}</Text>
                </View>
            
                <View style={styles.buttons_container}>
                    <TouchableOpacity title="Start" activeOpacity={this.state.timerIsActive ? 1 : 0.7} onPress={()=>this.startTimer()} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format , styles.button_colors, this.state.timerIsActive ? styles.disabled_button : null ]} >Start</Text>
                    </TouchableOpacity>

                    <TouchableOpacity title="Pause" onPress={()=>this.pauseTimer()}>
                        <Text style={[styles.button_format , styles.button_colors, !this.state.timerIsActive ? styles.disabled_button : null ]} >Pause</Text>
                    </TouchableOpacity>

                    <TouchableOpacity title="Reset" onPress={()=>this.resetTimer()} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format , styles.button_colors, this.state.timerIsActive ? styles.disabled_button : null ]} >Reset</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    
    constructor(props){
        super(props)
        coutDown = null,
        timeOptions = {
            five :5,
            twentyFive : 25
        }
        chosenTimeInMinutes = 5,

        this.state={
            timerMinutesValue : chosenTimeInMinutes,
            timerSecondsValue : 0,
            timerIsActive : false,
            customTimeValue : null
        }
    }

    changeChosenTime(chosenTime){
        this.setState({
            timerMinutesValue : chosenTime,
            timerSecondsValue : 0
        })
        chosenTimeInMinutes = chosenTime
    }


    displayTwoDigits(numberOfDigits){
        return (numberOfDigits < 10) ? ('0' + numberOfDigits) : numberOfDigits
    }


    startTimer(){
        if(!this.state.timerIsActive){
            this.setState({timerIsActive : true})
            this.decrementTimer()
        }
    }

    pauseTimer(){
        this.setState({timerIsActive : false})
        clearInterval(coutDown)
    }

    resetTimer(){
        this.setState({
            timerMinutesValue : chosenTimeInMinutes,
            timerSecondsValue : 0
        })
    }

    decrementTimer(){
        coutDown = setInterval(()=>{
            this.setState((previousState)=>{
                return {
                    timerSecondsValue : this.decrementSeconds(previousState.timerSecondsValue - 1),
                    timerMinutesValue : this.decrementMinutes(previousState.timerMinutesValue, previousState.timerSecondsValue - 1)
                }
             })

             this.checkIfTimerHasEnded(coutDown)

        },1000)
    }

    
    decrementSeconds(seconds){
        return (seconds) === -1 ? 59 : seconds
    }
    
    decrementMinutes(minutes, seconds){
        return (seconds) === -1 ? minutes - 1 : minutes
    }


    checkIfTimerHasEnded(coutDown){
        if(this.state.timerMinutesValue === 0 && this.state.timerSecondsValue === 0){
            clearInterval(coutDown)
            Vibrate()
        }
    }

    valueHasChanged(value){
        this.setState({
            customTimeValue : value
        })
    }

    setCustomTimeValue(){
        let regex = new RegExp('\\.|-');

        if(!regex.test(this.state.customTimeValue) && this.state.customTimeValue != null && !this.state.timerIsActive){
            chosenTimeInMinutes = this.isValueOutOfRange()
            this.setState({
                timerMinutesValue : this.isValueOutOfRange(),
            })
        }
        this.setState({customTimeValue : null})
    }

    isValueOutOfRange(){
        return this.state.customTimeValue > 59 ? 59 : this.state.customTimeValue
    }

    setBorderColor(){
        return (
            !this.state.timerIsActive && this.state.timerMinutesValue !== chosenTimeInMinutes ? 
            styles.timer_value_border_inactive : styles.timer_value_border_active
        )
    }

}


const styles = StyleSheet.create({

    container : {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#1f1f1f',
    },

    timer_value_container : {
        flex: 10,
        justifyContent : 'center',
        alignItems : 'center',
        //backgroundColor : 'green'
    },


    timer_value : {
        textAlign : 'center',
        fontSize : 60,
        color  : '#ffffff',
        height : 250,
        lineHeight : 240,
        width : 250,
        borderRadius : 250/2,
        borderWidth : 4,
    },

    timer_value_border_active : {
        borderColor : '#2b6cb3',
    },


    timer_value_border_inactive : {
        borderColor : '#a32727',
    },

    buttons_container : {
        flex : 4,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center',
        //backgroundColor : 'red',
        width:'100%'
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

    custom_user_input_container : {
        flex : 2,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'flex-start',
       // backgroundColor : 'yellow'
    },

    user_input : {
        backgroundColor : '#2E2E2E',
        color : '#ffffff',
        padding : 10,
        height : 35,
        width : 250,
        borderRadius : 5,
    },

})