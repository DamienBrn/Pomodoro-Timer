import React from 'react'
import {Text, View, TouchableOpacity, TextInput, Button} from 'react-native'
import vibrate from '../utils/vibrate'
import {styles} from './Timer_styles'


export default class Timer extends React.Component{

    render(){
        return(
            <View style={styles.main_container}>

                <View style={[styles.buttons_container, styles.buttons_container_top, styles.time_options_container]}>
                    <TouchableOpacity onPress={()=>this.changeChosenTimeDefaultOptions(this.timeOptions.firstOption)} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format, styles.button_colors, this.isOptionDisabled('first')]}>
                            {this.timeOptions.firstOption.focus}/{this.timeOptions.firstOption.break} min
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.changeChosenTimeDefaultOptions(this.timeOptions.secondOption)} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format, styles.button_colors, this.isOptionDisabled('second')]}>
                            {this.timeOptions.secondOption.focus}/{this.timeOptions.secondOption.break} min
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputs_container} >
                    <View>
                        <View style={styles.flex_direction_row}>
                            <TextInput style={styles.user_input} 
                                value={this.state.customTimeValue['focus']} 
                                placeholder="Focus time" 
                                keyboardType='numeric' 
                                maxLength={2} 
                                onChangeText={(value)=> this.inputValueHasChanged(value, 'focus')} 
                                onSubmitEditing={()=>this.setCustomTimeValue('focus')}
                                onFocus={()=>this.placeholder = ''}
                            />
                            <Button style={styles.button_custom_user_input} title="Ok" onPress={()=>this.setCustomTimeValue('focus')} />
                        </View>
                        <View style={[styles.margin_top, styles.flex_direction_row, styles.space_around]}>
                            <Text style={[styles.font_white, styles.big_bold_font]}>Focus :</Text> 
                            <Text style={[styles.font_white, styles.big_bold_font, styles.width_number]}>{this.chosenTime.focus}</Text>
                        </View>
                    </View>

                    <View>
                        <View style={styles.flex_direction_row}>
                            <TextInput style={styles.user_input} 
                                value={this.state.customTimeValue['break']} 
                                placeholder="Break time" 
                                keyboardType='numeric' 
                                maxLength={2} 
                                onChangeText={(value)=> this.inputValueHasChanged(value, 'break')} 
                                onSubmitEditing={()=>this.setCustomTimeValue('break')}
                                onFocus={()=>this.placeholder = ''}
                            />
                            <Button style={styles.button_custom_user_input} title="Ok" onPress={()=>this.setCustomTimeValue('break')} />
                        </View>
                        <View style={[styles.margin_top, styles.flex_direction_row, styles.space_around]}>
                            <Text style={[styles.font_white, styles.big_bold_font]}>Break :</Text> 
                            <Text style={[styles.font_white, styles.big_bold_font, styles.width_number]}>{this.chosenTime.break}</Text>
                        </View>
                    </View>

                </View>


                <View style={[styles.timer_value_container, this.setTimerBorderColor()]} >
                    <Text style={styles.timer_value}>{this.displayTwoDigits(this.state.timer[this.state.timerState].minutes)} : {this.displayTwoDigits(this.state.timer[this.state.timerState].seconds)}</Text>
                    <Text style={[styles.timer_message, this.setTimerStateMessageTextColor()]}>{this.setTimerStateMessage()}</Text>
                </View>
            
                <View style={[styles.buttons_container, styles.buttons_container_bottom]}>
                    <TouchableOpacity title="Start" onPress={()=>this.setActionOnPress()}>
                        <Text style={[styles.button_format , styles.button_colors, this.isTimerOnPause()]} >{this.setActionLabel()}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity title="Reset" onPress={()=>this.resetTimer()} disabled={this.timerIsActiveOrTimeIsOrigin()}>
                        <Text style={[styles.button_format , styles.button_colors, this.isResetButtonDisabled()]} >Reset</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    
    constructor(props){
        super(props)
        this.countDown = null,
        this.timeOptions = {
            firstOption : {
                focus : 5,
                break : 1
            },
            secondOption : {
                focus : 25,
                break : 5
            }
        },
        this.chosenTime = {
            focus : this.timeOptions.firstOption.focus,
            break : this.timeOptions.firstOption.break
        }  
        this.state = {
            timer : {
                focus : {
                    minutes : this.chosenTime.focus,
                    seconds : 0
                },
                break : {
                    minutes : this.chosenTime.break,
                    seconds : 0
                }
            },
            timerIsActive : false,
            timerState : 'focus',
            customTimeValue: {
                focus : null,
                break : null
            },
        }
    }

    changeChosenTimeDefaultOptions(chosenOption){
        this.setState({
            timer : {
                ...this.state.timer,
                focus : {...this.state.timer.focus,
                    minutes : chosenOption.focus,
                    seconds : 0
                },
                break : {...this.state.timer.break,
                    minutes : chosenOption.break,
                    seconds : 0
                }
            }
        })

        this.chosenTime.focus = chosenOption.focus
        this.chosenTime.break = chosenOption.break
    }

    displayTwoDigits(number){
        return (number < 10) ? ('0' + number) : number
    }


//*** User input functions
    inputValueHasChanged(value, state){
        this.setState({
            customTimeValue :
            {
                ...this.state.customTimeValue,
                [state] : value
            }
        })
    }

    setCustomTimeValue(state){
        if(+this.state.customTimeValue[state] && !this.state.timerIsActive){
                    this.chosenTime[state] = this.isValueOutOfRange(state)
                    this.resetTimer(state)
                    this.setState({
                        customTimeValue :
                            {...this.state.customTimeValue,
                                [state] : null,
                            }
                    })
        }else{
            this.setState({
                customTimeValue :
                    {...this.state.customTimeValue,
                        [state] : null,
                    }
            })
        }
    }

    isValueOutOfRange(state){
        return this.state.customTimeValue[state] > 59 ? 59 : + this.state.customTimeValue[state]
    }

//*** End

//*** Styling Functions

    setTimerBorderColor(){
        let borderColor
        if(!this.state.timerIsActive){
            borderColor = styles.timer_value_border_pause
        }else{
            borderColor = styles['timer_value_border_' + this.state.timerState]
        }
        return  borderColor
    }

    setActionOnPress(){
        return this.setActionLabel() === 'Start' || this.setActionLabel() === 'Resume' ? this.startTimer() : this.pauseTimer()
    }

    setActionLabel(){
        let state = this.state.timerState
        let actionLabel = 'Start'

        if(!this.state.timerIsActive && this.state.timer[state].minutes !== this.chosenTime[state]){
            actionLabel = 'Resume'
        } 
        else if(this.state.timerIsActive){
            actionLabel = 'Pause'
        }
        return actionLabel
    }

    setTimerStateMessage(){
        let timerMessage = this.state.timerState

        if(!this.state.timerIsActive){
            timerMessage = '...'
        }

        return timerMessage.toUpperCase()
    }

    setTimerStateMessageTextColor(){
        return  styles['timer_message_' + this.state.timerState]
    }
 

    isResetButtonDisabled(){
        return this.timerIsActiveOrTimeIsOrigin() ? styles.disabled_button : null 
    }

    isTimerOnPause(){
        return this.setActionLabel() === 'Pause' ? styles.pause_button : null 
    }

    timerIsActiveOrTimeIsOrigin(){
       return this.state.timerIsActive || this.state.timer[this.state.timerState].minutes === this.chosenTime[this.state.timerState]
    }

    isOptionDisabled(optionRank){
        return  this.chosenTime.focus !== this.timeOptions[optionRank + 'Option'].focus 
                || this.chosenTime.break !== this.timeOptions[optionRank + 'Option'].break
                ? styles.disabled_button : null
    }

//*** End

//*** Functional functions

    startTimer(){
        if(!this.state.timerIsActive){
            this.setState({timerIsActive : true})
            this.decrementTimer()
        } 
    }

    decrementTimer(){
        let state = this.state.timerState
        this.countDown = setInterval(()=>{
            this.setState((previousState)=>{
                return {
                    timer : {
                        ...this.state.timer,
                        [state] : {
                            minutes : this.isDecrementMinutesOutOfRange(previousState.timer[state].minutes, previousState.timer[state].seconds - 1),
                            seconds : this.isDecrementSecondsOutOfRange(previousState.timer[state].seconds - 1),
                        }
                    }
                }
             })

             this.checkIfTimerHasEnded(this.countDown)

        },1000)
    }

    isDecrementSecondsOutOfRange(seconds){
        return seconds === -1 ? 59 : seconds
    }
    
    isDecrementMinutesOutOfRange(minutes, seconds){
        return seconds === -1 ? (minutes - 1) : minutes
    }

    checkIfTimerHasEnded(countDown){
        let state = this.state.timerState
        if(this.state.timer[state].minutes === 0 && this.state.timer[state].seconds === 0){
            clearInterval(countDown)
            vibrate()
            this.setState({
                timerIsActive : false
            })
            this.changeTimerState()
            this.resetTimer()
            this.startTimer()
        }
    }


    changeTimerState(){
        if(this.state.timerState === 'focus'){
            this.setState({timerState : 'break'})
        }
        else{
            this.setState({timerState : 'focus'})
        }
    }


    pauseTimer(){
        this.setState({timerIsActive : false})
        clearInterval(this.countDown)
    }

    resetTimer(state = undefined){
        if(state == undefined){
            state = this.state.timerState
        }
        this.setState({
            timer : {
                ...this.state.timer,
                [state] : {
                    minutes : this.chosenTime[state],
                    seconds : 0
                }
            },
        })
    }

//*** End

}

