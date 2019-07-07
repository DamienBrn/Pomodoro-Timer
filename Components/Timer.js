import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Picker, Button} from 'react-native'
import Vibrate from '../utils/vibrate'


export default class Timer extends React.Component{

    render(){
        return(
            <View style={styles.container}>

                <View style={[styles.buttons_container, styles.time_options_container]}>
                    <TouchableOpacity onPress={()=>this.changeChosenTime(timeOptions.firstOption)} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format, styles.button_colors, timeChosen.focus !== timeOptions.firstOption[0] ? styles.disabled_button : null ]}>
                            {timeOptions.firstOption[0]}/{timeOptions.firstOption[1]} min
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.changeChosenTime(timeOptions.secondOption)} disabled={this.state.timerIsActive}>
                        <Text style={[styles.button_format, styles.button_colors, timeChosen.focus !== timeOptions.secondOption[0] ? styles.disabled_button : null ]}>
                            {timeOptions.secondOption[0]}/{timeOptions.secondOption[1]} min
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
                                onChangeText={(value)=> this.valueHasChanged(value, 'focus')} 
                                onSubmitEditing={()=>this.setCustomTimeValue('focus')}
                                onFocus={()=>this.placeholder = ''}
                            />
                            <Button style={styles.button_custom_user_input} title="Ok" onPress={()=>this.setCustomTimeValue('focus')} />
                        </View>
                        <View style={[styles.margin_top, styles.flex_direction_row, styles.chosen_time]}>
                            <Text style={[styles.font_white, styles.big_bold_font]}>Focus :</Text> 
                            <Text style={[styles.font_white, styles.big_bold_font, styles.width_number]}>{timeChosen.focus}</Text>
                        </View>
                    </View>

                    <View>
                        <View style={styles.flex_direction_row}>
                            <TextInput style={styles.user_input} 
                                value={this.state.customTimeValue['break']} 
                                placeholder="Break time" 
                                keyboardType='numeric' 
                                maxLength={2} 
                                onChangeText={(value)=> this.valueHasChanged(value, 'break')} 
                                onSubmitEditing={()=>this.setCustomTimeValue('break')}
                                onFocus={()=>this.placeholder = ''}
                            />
                            <Button style={styles.button_custom_user_input} title="Ok" onPress={()=>this.setCustomTimeValue('break')} />
                        </View>
                        <View style={[styles.margin_top, styles.flex_direction_row, styles.chosen_time]}>
                            <Text style={[styles.font_white, styles.big_bold_font]}>Break :</Text> 
                            <Text style={[styles.font_white, styles.big_bold_font, styles.width_number]}>{timeChosen.break}</Text>
                        </View>
                    </View>

                </View>


                <View style={[styles.timer_value_container, this.setBorderColor()]} >
                    <Text style={styles.timer_value}>{this.displayTwoDigits(this.state.timer[this.state.timerState].minutes)} : {this.displayTwoDigits(this.state.timer[this.state.timerState].seconds)}</Text>
                    <Text style={[styles.timer_message, this.setTimerMessageTextColor()]}>{this.setTimerMessage()}</Text>
                </View>
            
                <View style={styles.buttons_container}>
                    <TouchableOpacity title="Start" activeOpacity={this.state.timerIsActive ? 1 : 0.7} onPress={()=>this.setActionOnPress()}>
                        <Text style={[styles.button_format , styles.button_colors, this.setActionLabel() === 'Pause' ? styles.pause_button : null ]} >{this.setActionLabel()}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity title="Reset" onPress={()=>this.resetTimer()} disabled={this.state.timerIsActive || this.state.timer[this.state.timerState].minutes === timeChosen[this.state.timerState]}>
                        <Text style={[styles.button_format , styles.button_colors, this.state.timerIsActive || this.state.timer[this.state.timerState].minutes === timeChosen[this.state.timerState] ? styles.disabled_button : null ]} >Reset</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

    
    constructor(props){
        super(props)
        coutDown = null,

        timeOptions = {
            firstOption : [5, 1],
            secondOption : [25, 5]
        },

        timeChosen = {
            focus : timeOptions.firstOption[0],
            break : timeOptions.firstOption[1]
        }  

        this.state={
            timer : {
                focus:{
                    minutes : timeChosen.focus,
                    seconds : 0
                },

                break : {
                    minutes : timeChosen.break,
                    seconds : 0
                }
            },

            timerIsActive : false,
            timerState : 'focus',

            customTimeValue: {
                focus : null,
                break :null
            },
        }
    }


    changeChosenTime(chosenTimeCouple){
        this.setState({
            timer : {
                ...this.state.timer,
                focus : {
                    minutes : chosenTimeCouple[0],
                    seconds : 0
                },
                break : {
                    minutes : chosenTimeCouple[1],
                    seconds : 0
                }
            }
        })

        timeChosen.focus = chosenTimeCouple[0]
        timeChosen.break = chosenTimeCouple[1]
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

    resetTimer(state = undefined){
        if(state == undefined){
            state = this.state.timerState
        }
        this.setState({
            timer : {
                ...this.state.timer,
                [state] : {
                    minutes : timeChosen[state],
                    seconds : 0
                }
            },
        })
    }

    

    decrementTimer(){
        let state = this.state.timerState
        coutDown = setInterval(()=>{
            this.setState((previousState)=>{
                return {
                    timer : {
                        ...this.state.timer,
                        [state] : {
                            minutes : this.decrementMinutes(previousState.timer[state].minutes, previousState.timer[state].seconds - 1),
                            seconds : this.decrementSeconds(previousState.timer[state].seconds - 1),
                        }
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
        let state = this.state.timerState
        if(this.state.timer[state].minutes === 0 && this.state.timer[state].seconds === 0){
            clearInterval(coutDown)
            Vibrate()
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

    valueHasChanged(value, state){
        this.setState({
            customTimeValue :
            {
                ...this.state.customTimeValue,
                [state] : value
            }
        })
    }

    setCustomTimeValue(state){
        if(+this.state.customTimeValue[state] && this.state.customTimeValue[state] != null && !this.state.timerIsActive){
                    timeChosen[state] = this.isValueOutOfRange(state)
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
        return this.state.customTimeValue[state] > 59 ? 59 : this.state.customTimeValue[state]
    }

    //*** 

    setBorderColor(){
        let borderColor
        if(!this.state.timerIsActive){
            borderColor = styles.timer_value_border_pause
        }else{
            borderColor = styles['timer_value_border_' + this.state.timerState]
        }
        return  borderColor
    }


    setActionLabel(){
        let state = this.state.timerState
        let actionLabel = 'Start'

        if(!this.state.timerIsActive && this.state.timer[state].minutes !== timeChosen[state] || this.state.timerIsActive){
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
        let timerMessage = this.state.timerState.toUpperCase()

        if(!this.state.timerIsActive){
            timerMessage = '...'
        }

        return timerMessage.toUpperCase()
    }

    setTimerMessageTextColor(){
        return  styles['timer_message_' + this.state.timerState]
    }

}



const styles = StyleSheet.create({

    container : {
        flex : 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#1f1f1f',
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
        textAlign : 'center',
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

    inputs_container : {
        flex : 2,
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'flex-start',
        width : '100%',
       // backgroundColor : 'yellow'
    },

    flex_direction_row : {
        flexDirection : 'row'
    },

    user_input : {
        backgroundColor : '#2E2E2E',
        color : '#ffffff',
        padding : 10,
        height : 35,
        width : 100,
        borderRadius : 5,
    },

    chosen_time : {
        justifyContent : 'space-around'
    },

    width_number : {
        width : 30,
        textAlign : 'center'
    },

})