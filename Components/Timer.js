import React from 'react'
import { StyleSheet, Text, View } from 'react-native';



export default class Timer extends React.Component{


    constructor(props){
        super(props)
        this.state={
            timerMinutesValue:0,
            timerSecondsValue:20,
        }
    }

    render(){
        return(
            <View>
                <Text style={styles.timerValue}>{this.displayTwoDigits(this.state.timerMinutesValue)} : {this.displayTwoDigits(this.state.timerSecondsValue)}</Text>
            </View>
        )
    }


    displayTwoDigits(numberOfDigits){
        return (numberOfDigits < 10) ? ('0' + numberOfDigits) : numberOfDigits
    }

    componentDidMount(){
        this.decrementTimer()
    }


    decrementTimer(){
        const timer = setInterval(()=>{
            this.setState((previousState)=>{
                return {
                    timerSecondsValue : this.decrementSeconds(previousState.timerSecondsValue - 1),
                    timerMinutesValue : this.decrementMinutes(previousState.timerMinutesValue, previousState.timerSecondsValue - 1)
                }
             })

             this.checkIfTimerHasEnded()

        },1000)
    }

    
    decrementSeconds(seconds){
        return (seconds) === -1 ? 59 : seconds
    }
    
    decrementMinutes(minutes, seconds){
        return (seconds) === -1 ? minutes - 1 : minutes
    }


    checkIfTimerHasEnded(){
        if(this.state.timerMinutesValue === 0 && this.state.timerSecondsValue === 0){
            clearInterval(timer)
        }
    }




}



const styles = StyleSheet.create({

    timerValue:{
        fontSize:72
    }
})