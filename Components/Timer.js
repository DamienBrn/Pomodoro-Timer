import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker, Button} from 'react-native'
import Vibrate from '../utils/vibrate'


export default class Timer extends React.Component{

    render(){
        return(
            <View style={styles.container}>

                <View style={[styles.buttons_container, styles.time_options_container]}>
                    <TouchableOpacity onPress={()=>this.changeChosenTime(timeOptions.firstOption)} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format, styles.button_colors, chosenTimeInMinutes !== timeOptions.firstOption ? styles.disabled_button : null ]}>
                            {timeOptions.firstOption} min
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.changeChosenTime(timeOptions.secondOption)} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format, styles.button_colors, chosenTimeInMinutes !== timeOptions.secondOption ? styles.disabled_button : null ]}>
                            {timeOptions.secondOption} min
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

                <View style={[styles.timer_value_container, this.setBorderColor()]} >
                    <Text style={styles.timer_value}>{this.displayTwoDigits(this.state.timer.minutes)} : {this.displayTwoDigits(this.state.timer.seconds)}</Text>
                    <Text style={styles.timer_message}>{this.setTimerMessage()}</Text>
                </View>
            
                <View style={styles.buttons_container}>
                    <TouchableOpacity title="Start" activeOpacity={this.state.timerIsActive ? 1 : 0.7} onPress={()=>this.setActionOnPress()}>
                        <Text style={[styles.button_format , styles.button_colors, this.setActionLabel() === 'Pause' ? styles.pause_button : null ]} >{this.setActionLabel()}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity title="Reset" onPress={()=>this.resetTimer()} disabled={this.state.timerIsActive || this.state.timer.minutes === chosenTimeInMinutes}>
                        <Text style={[styles.button_format , styles.button_colors, this.state.timerIsActive || this.state.timer.minutes === chosenTimeInMinutes ? styles.disabled_button : null ]} >Reset</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    
    constructor(props){
        super(props)
        coutDown = null,
        timeOptions = {
            firstOption : 5,
            secondOption : 25
        }
        chosenTimeInMinutes = timeOptions.firstOption,

        this.state={
            timer : {
                minutes : chosenTimeInMinutes,
                seconds : 0
            },
            timerIsActive : false,
            customTimeValue : null
        }
    }

    changeChosenTime(chosenTime){
        this.setState({
            timer : {
                ...this.state.timer,
                minutes : chosenTime,
                seconds : 0
            }
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
            timer : {
                ...this.state.timer,
                minutes : chosenTimeInMinutes,
                seconds : 0
            },
            actionLabel : 'Start'
        })
    }

    decrementTimer(){
        coutDown = setInterval(()=>{
            this.setState((previousState)=>{
                return {
                    timer : {
                        ...this.state.timer,
                        minutes : this.decrementMinutes(previousState.timer.minutes, previousState.timer.seconds - 1),
                        seconds : this.decrementSeconds(previousState.timer.seconds - 1),
                    }
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
        if(this.state.timer.minutes === 0 && this.state.timer.seconds === 0){
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

        console.log('current time : ' + this.state.timer.minutes)
        console.log('chosenT time : ' + chosenTimeInMinutes)

        if(!regex.test(this.state.customTimeValue) 
                            && this.state.customTimeValue != null 
                            && !this.state.timerIsActive 
                            && this.state.timer.minutes === chosenTimeInMinutes){

            chosenTimeInMinutes = this.isValueOutOfRange()
            this.setState({
                timer : {
                    ...this.state.timer,
                    minutes : this.isValueOutOfRange()
                }
            })
        }
        this.setState({customTimeValue : null})
    }

    isValueOutOfRange(){
        return this.state.customTimeValue > 59 ? 59 : this.state.customTimeValue
    }


    setBorderColor(){
        return (
            !this.state.timerIsActive && this.state.timer.minutes !== chosenTimeInMinutes ? 
            styles.timer_value_border_inactive : styles.timer_value_border_active
        )
    }


    setActionLabel(){
        let actionLabel = 'Start'

        if(!this.state.timerIsActive && this.state.timer.minutes !== chosenTimeInMinutes || this.state.timerIsActive){
            actionLabel = 'Resume'
        } 
        if(this.state.timerIsActive){
            actionLabel = 'Pause'
        }

        return actionLabel
    }

    setActionOnPress(){
        return this.setActionLabel() === 'Start' || this.setActionLabel() === 'Resume' ? this.startTimer() : this.pauseTimer()
    }

    setTimerMessage(){
        let timerMessage = '...'

        if(this.state.timerIsActive){
            timerMessage = 'Focus'
        }
        if(this.state.timer.minutes === 0 && this.state.timer.seconds === 0){
            timerMessage = 'Break'
        }

        return timerMessage
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
        justifyContent : 'center',
        alignItems : 'center',
        height : 250,
        lineHeight : 240,
        width : 250,
        borderRadius : 250/2,
        borderWidth : 4,
        //backgroundColor : 'green'
    },

    timer_message : {
        fontSize : 34,
        fontWeight : 'bold',
        color : '#ffffff',
    },

    timer_value : {
        textAlign : 'center',
        fontSize : 60,
        color  : '#ffffff',
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

    pause_button : {
        backgroundColor : '#a32727',
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