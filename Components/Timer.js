import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Switch} from 'react-native'
import Vibrate from '../utils/vibrate'


export default class Timer extends React.Component{


    constructor(props){
        super(props)
        coutDown = undefined,
        timeOptions = {
            five :5,
            twentyFive : 25
        }
        chosenTimeInMinutes = 5,

        this.state={
            timerMinutesValue : chosenTimeInMinutes,
            timerSecondsValue : 0,
            timerIsActive : false,
        }
    }

    render(){
        return(
            <View>

                <View style={styles.buttons_container}>
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

                <Text style={styles.timer_value}>{this.displayTwoDigits(this.state.timerMinutesValue)} : {this.displayTwoDigits(this.state.timerSecondsValue)}</Text>
            
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

}



const styles = StyleSheet.create({

    timer_value : {
        fontSize : 72,
    },

    buttons_container : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },

    button_colors : {
        color : '#ffffff',
        backgroundColor :'#2970e3',
    },

    button_format : {
        fontSize : 20,
        padding : 5,
        borderRadius : 5,
    },

    disabled_button : {
        backgroundColor : 'rgba(41, 112, 227, 0.2)',
    }
})