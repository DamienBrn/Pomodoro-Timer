import Timer from './Components/Timer'
import React from 'react'
import {shallow} from 'enzyme'


'use strict'

const wrapper = shallow(<Timer/>)
const componentInstance = wrapper.instance()
const initialState = componentInstance.state


beforeEach(()=>{
    componentInstance.setState({...initialState})
})


describe('My timer ', () => {

    it('Shallow rendering', () => {
        expect(wrapper).toMatchSnapshot()
    })

    describe('User input', ()=>{
        it('Should update state customeTimeValue to 20', ()=>{
            componentInstance.setState({...componentInstance.state, customTimeValue : {...componentInstance.state.customTimeValue, focus : '20'}})
            expect(componentInstance.state.customTimeValue.focus).toEqual('20')
        })
 
        it('inputValueHasChanged with "23" and "focus state" should return 23', ()=>{
            componentInstance.inputValueHasChanged('23', 'focus')
            expect(componentInstance.state.customTimeValue.focus).toEqual('23')
        })
        it('inputValueHasChanged with "23" and "break state" should return 23', ()=>{
            componentInstance.inputValueHasChanged('23', 'break')
            expect(componentInstance.state.customTimeValue.break).toEqual('23')
        })
        it('inputValueHasChanged with "." and "focus state" should return .', ()=>{
            componentInstance.inputValueHasChanged('.', 'focus')
            expect(componentInstance.state.customTimeValue.focus).toEqual('.')
        })
        it('inputValueHasChanged with "-" and "break state" should return -', ()=>{
            componentInstance.inputValueHasChanged('-', 'break')
            expect(componentInstance.state.customTimeValue.break).toEqual('-')
        })


        it('isValueOutOfRange with 20 should return 20', ()=>{
            componentInstance.setState({...componentInstance.state, customTimeValue : {...componentInstance.state.customTimeValue, focus : '20'}})
            expect(componentInstance.isValueOutOfRange('focus')).toEqual(20)
        })
        it('isValueOutOfRange with 67 should return 59', ()=>{
            componentInstance.setState({...componentInstance.state, customTimeValue : {...componentInstance.state.customTimeValue, focus : '67'}})
            expect(componentInstance.isValueOutOfRange('focus')).toEqual(59)
        })

        it('setCustomTimeValue with "focus state" and "timer is not active" and "custom time value is \'6\'" should return 6 and then null', ()=>{
            componentInstance.setState({...componentInstance.state,
                timerIsActive : false,
                customTimeValue : {...componentInstance.state.customTimeValue,
                    focus : '6'
                }
            })
            componentInstance.setCustomTimeValue('focus')
            expect(componentInstance.chosenTime.focus).toEqual(6)
            expect(componentInstance.state.customTimeValue.focus).toEqual(null)
        })
        it('setCustomTimeValue with "focus state" and "custom time value is \'.\'" should return 6 and then null', ()=>{
            componentInstance.setState({...componentInstance.state,
                timerIsActive : false,
                customTimeValue : {...componentInstance.state.customTimeValue,
                    focus : '.'
                }
            })
            componentInstance.setCustomTimeValue('focus')
            expect(componentInstance.chosenTime.focus).toEqual(6)
            expect(componentInstance.state.customTimeValue.focus).toEqual(null)
        })
        it('setCustomTimeValue with "focus state" and "custom time value is \'78\'" should return 59 and then null', ()=>{
            componentInstance.setState({...componentInstance.state,
                timerIsActive : false,
                customTimeValue : {...componentInstance.state.customTimeValue,
                    focus : '78'
                }
            })
            componentInstance.setCustomTimeValue('focus')
            expect(componentInstance.chosenTime.focus).toEqual(59)
            expect(componentInstance.state.customTimeValue.focus).toEqual(null)
        })
        it('setCustomTimeValue with "break state" and "timer is not active" and "custom time value is \'6\'" should return 6 and then null', ()=>{
            componentInstance.setState({...componentInstance.state,
                timerIsActive : false,
                customTimeValue : {...componentInstance.state.customTimeValue,
                    break : '6'
                }
            })
            componentInstance.setCustomTimeValue('break')
            expect(componentInstance.chosenTime.break).toEqual(6)
            expect(componentInstance.state.customTimeValue.break).toEqual(null)
        })
    })
    
    
    describe('Format data display', ()=>{
        it('displayTwoDigits with 1 should return 01', ()=>{
            expect(componentInstance.displayTwoDigits(1)).toEqual('01')
        })
        it('displayTwoDigits with 10 should return 10', ()=>{
            expect(componentInstance.displayTwoDigits(10)).toEqual(10)
        })
    })


    describe('Inner working', ()=>{



        it('changeChosenTimeDefaultOptions with "first option" should return 5 and 1', ()=>{
            componentInstance.timeOptions.firstOption.focus = 5
            componentInstance.timeOptions.firstOption.break = 1
            
            componentInstance.changeChosenTimeDefaultOptions(componentInstance.timeOptions.firstOption)
            expect(componentInstance.state.timer.focus.minutes).toEqual(5)
            expect(componentInstance.state.timer.break.minutes).toEqual(1)
            expect(componentInstance.chosenTime.focus).toEqual(5)
            expect(componentInstance.chosenTime.break).toEqual(1)
        })
        it('changeChosenTimeDefaultOptions with "second option" should return 25 and 5', ()=>{
            componentInstance.timeOptions.secondOption.focus = 25
            componentInstance.timeOptions.secondOption.break = 5
            
            componentInstance.changeChosenTimeDefaultOptions(componentInstance.timeOptions.secondOption)
            expect(componentInstance.state.timer.focus.minutes).toEqual(25)
            expect(componentInstance.state.timer.break.minutes).toEqual(5)
            expect(componentInstance.chosenTime.focus).toEqual(25)
            expect(componentInstance.chosenTime.break).toEqual(5)
        })


        it('isDecrementSecondsOutOfRange with 30 should return 30', ()=>{
            expect(componentInstance.isDecrementSecondsOutOfRange(30)).toEqual(30)
        })
        it('isDecrementSecondsOutOfRange with -1 should return 59', ()=>{
            expect(componentInstance.isDecrementSecondsOutOfRange(-1)).toEqual(59)
        })


        it('isDecrementMinutesOutOfRange with (5, 30) should return 5', ()=>{
            expect(componentInstance.isDecrementMinutesOutOfRange(5, 30)).toEqual(5)
        })
        it('isDecrementMinutesOutOfRange with (5, -1) should return 4', ()=>{
            expect(componentInstance.isDecrementMinutesOutOfRange(5, -1)).toEqual(4)
        })


        it('changeTimerState with focus should return break', ()=>{
            componentInstance.setState({...componentInstance.state, timerState:'focus'})
            componentInstance.changeTimerState()
            expect(componentInstance.state.timerState).toEqual('break')
        })
        it('changeTimerState with break should return focus', ()=>{
            componentInstance.setState({...componentInstance.state, timerState:'break'})
            componentInstance.changeTimerState()
            expect(componentInstance.state.timerState).toEqual('focus')
        })

        it('pauseTimer should return timerIsActive === false and coutdown null', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : true})
            componentInstance.pauseTimer()
            expect(componentInstance.state.timerIsActive).toEqual(false)
        })

//IL FAUT RESET LES TIMERS MAIS JE SAIS PAS COMMENT FAIRE AAAAAAAAAAAAAAAAAAAAAAAAA

       /* it('startTimer', ()=>{
            jest.useFakeTimers()
            componentInstance.setState({...componentInstance.state,
                timerIsActive : false,
                timerState : 'focus',
                timer : {...componentInstance.state.timer,
                    focus :{...componentInstance.state.timer.focus,
                        minutes : 5,
                        seconds : 0
                    } 
                }
            })
            componentInstance.startTimer()
            expect(componentInstance.state.timerIsActive).toEqual(true)
            jest.useRealTimers()
        })*/
        test.todo('startTimer')

        it('decrementTimer in "focus state" after 1 second should return 4:59', ()=>{
            jest.useFakeTimers();
            componentInstance.setState({...componentInstance.state,     
                timer : {...componentInstance.state.timer,
                    focus : {...componentInstance.state.timer.focus,
                        minutes : 5,
                        seconds : 0
                    }
                },
                timerState  :'focus'
            })
            expect(componentInstance.state.timer.focus.minutes).toEqual(5);
            expect(componentInstance.state.timer.focus.seconds).toEqual(0);
            componentInstance.decrementTimer();
            jest.advanceTimersByTime(1000);
            expect(componentInstance.state.timer.focus.minutes).toEqual(4);
            expect(componentInstance.state.timer.focus.seconds).toEqual(59);
            jest.useRealTimers();
        })

      /*  it('decrementTimer in "focus state" after 1 minute should return 4:00', ()=>{
            jest.useFakeTimers();
            componentInstance.setState({...componentInstance.state, timer : {
                focus : {
                    minutes : 5,
                    seconds : 0
                }
            },
            timerState  :'focus'})
            expect(componentInstance.state.timer.focus.minutes).toEqual(5);
            expect(componentInstance.state.timer.focus.seconds).toEqual(0);
            componentInstance.decrementTimer();
            jest.advanceTimersByTime(1000);
            expect(componentInstance.state.timer.focus.minutes).toEqual(4);
            expect(componentInstance.state.timer.focus.seconds).toEqual(59);
            jest.useRealTimers();
        })*/
    
        test.todo('checkIfTimerHasEnded')

        it('resetTimer with "focus state" and (5, 0) should return (5, 0)', ()=>{
            componentInstance.chosenTime.focus = 5
            componentInstance.resetTimer('focus')
            expect(componentInstance.state.timer.focus.minutes).toEqual(5)
            expect(componentInstance.state.timer.focus.seconds).toEqual(0)
        })
        it('resetTimer with "break state" and (5, 0) should return (5, 0)', ()=>{
            componentInstance.chosenTime.break = 5
            componentInstance.resetTimer('break')
            expect(componentInstance.state.timer.break.minutes).toEqual(5)
            expect(componentInstance.state.timer.break.seconds).toEqual(0)
        })
        it('resetTimer with "focus state" and (5, 0) should return (5, 0)', ()=>{
            componentInstance.setState({...componentInstance.state, timerState : 'focus'})
            componentInstance.chosenTime.focus = 5
            componentInstance.resetTimer()
            expect(componentInstance.state.timer.focus.minutes).toEqual(5)
            expect(componentInstance.state.timer.focus.seconds).toEqual(0)
        })
        it('resetTimer with "break state" and (5, 0) should return (5, 0)', ()=>{
            componentInstance.setState({...componentInstance.state, timerState : 'break'})
            componentInstance.chosenTime.break = 5
            componentInstance.resetTimer()
            expect(componentInstance.state.timer.break.minutes).toEqual(5)
            expect(componentInstance.state.timer.break.seconds).toEqual(0)
        })
    })
        
    describe('Styling functions', ()=>{
        it('setTimerBorderColor with timerIsActive === false should return blue', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : false})
            expect(componentInstance.setTimerBorderColor()).toMatchSnapshot()
        })
        it('setTimerBorderColor with focus state should return red', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : true, timerState : 'focus'})
            expect(componentInstance.setTimerBorderColor()).toMatchSnapshot()
        })


        it('setTimerBorderColor with break state should return green', ()=>{
            componentInstance.setState({...componentInstance.state,
                timer : { ...componentInstance.state.timer,
                    break : {...componentInstance.state.timer.break,
                        minutes : 5,
                        seconds : 0
                    }
                },
                timerIsActive : true , timerState : 'break'})
            expect(componentInstance.setTimerBorderColor()).toEqual({borderColor : '#41b31e'})
        })

     
        it('setTimerStateMessage with timer is paused should return ...', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : false, timerState : 'focus'})
            expect(componentInstance.setTimerStateMessage()).toMatchSnapshot()
        })
        it('setTimerStateMessage with focus state should return FOCUS', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : true, timerState : 'focus'})
            expect(componentInstance.setTimerStateMessage()).toMatchSnapshot()
        })
        it('setTimerStateMessage with break state should return BREAK', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : true, timerState : 'break'})
            expect(componentInstance.setTimerStateMessage()).toMatchSnapshot()
        })

        it('setTimerStateMessageTextColor with focus state should return red', ()=>{
            componentInstance.setState({...componentInstance.state, timerState : 'focus'})
            expect(componentInstance.setTimerStateMessageTextColor()).toMatchSnapshot()
        })
        it('setTimerStateMessageTextColor with break state should return green', ()=>{
            componentInstance.setState({...componentInstance.state, timerState : 'break'})
            expect(componentInstance.setTimerStateMessageTextColor()).toMatchSnapshot()
        })

        it('timerIsActiveOrTimeIsOrigin with "timer is active" and "time is origin" should return true', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : true})
            expect(componentInstance.timerIsActiveOrTimeIsOrigin()).toMatchSnapshot()
        })
        it('timerIsActiveOrTimeIsOrigin with "timer is not active" "time is origin" should return true', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : false,
                timerState : 'focus',
                timer : { ...componentInstance.state.timer,
                    focus : { ...componentInstance.state.timer.focus,
                        minutes : 5
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.timerIsActiveOrTimeIsOrigin()).toMatchSnapshot()
        })
        it('timerIsActiveOrTimeIsOrigin with "timer is active" "time is not origin" should return false', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : true,
                timerState : 'focus',
                timer : { ...componentInstance.state.timer,
                    focus : { ...componentInstance.state.timer.focus,
                        minutes : 3
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.timerIsActiveOrTimeIsOrigin()).toEqual(true)
        })
        it('timerIsActiveOrTimeIsOrigin with "timer is not active" "time is not origin" should return false', ()=>{
            componentInstance.setState({...componentInstance.state, 
                timerIsActive : false,
                timerState : 'focus',
                timer : { ...componentInstance.state.timer,
                    focus : {...componentInstance.state.timer.focus,
                        minutes : 3
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.timerIsActiveOrTimeIsOrigin()).toEqual(false)
        })

        it('setActionLabel with "timer is active" should return "Pause"', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : true})
            expect(componentInstance.setActionLabel()).toEqual('Pause')
        })
        it('setActionLabel with "focus state" and "timer is not active" and "timer has already decremented" should return "Resume"', ()=>{
            componentInstance.setState({...componentInstance.state,                 
                timerIsActive : false,
                timerState : 'focus',
                timer : {...componentInstance.state.timer,
                    focus : {...componentInstance.state.timer.focus,
                        minutes : 3
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.setActionLabel()).toEqual('Resume')
        })
        it('setActionLabel with "focus state" and "timer is not active" and "timer has not decremented" should return "Start"', ()=>{
            componentInstance.setState({...componentInstance.state,                 
                timerIsActive : false,
                timerState : 'focus',
                timer : {...componentInstance.state.timer,
                    focus : {...componentInstance.state.timer.focus,
                        minutes : 5
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.setActionLabel()).toEqual('Start')
        })


        it('isResetButtonDisabled with "timer is active" and "time is origin" should return styles.disabled_button', ()=>{
            componentInstance.setState({...componentInstance.state, 
                timerIsActive : true,
                timerState : 'focus',
                timer : {...componentInstance.state.timer,
                    focus : {...componentInstance.state.timer.focus,
                        minutes : 5
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.isResetButtonDisabled()).toEqual({backgroundColor : 'rgba(41, 112, 227, 0.2)'})
        })
        it('isResetButtonDisabled with "timer is not active" and "time is not origin" should return null', ()=>{
            componentInstance.setState({...componentInstance.state, 
                timerIsActive : false,
                timerState : 'focus',
                timer : {...componentInstance.state.timer,
                    focus : {...componentInstance.state.timer.focus,
                        minutes : 3
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.isResetButtonDisabled()).toEqual(null)
        })


        it('isTimerOnPause with "setActionLabel === Pause" should return styles.pause_button', ()=>{
            componentInstance.setState({...componentInstance.state, timerIsActive : true})
            expect(componentInstance.isTimerOnPause()).toEqual({backgroundColor : '#a32727'})
        })
        it('isTimerOnPause with "setActionLabel === Resume" should return null', ()=>{
            componentInstance.setState({...componentInstance.state,                 
                timerIsActive : false,
                timerState : 'focus',
                timer : {...componentInstance.state.timer,
                    focus : {...componentInstance.state.timer.focus,
                        minutes : 3
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.isTimerOnPause()).toEqual(null)
        })

        it('isOptionDisabled with "time first option === chosen time" should return null', ()=>{
            componentInstance.chosenTime.focus = 5
            componentInstance.timeOptions.firstOption.focus = 5
            componentInstance.chosenTime.break = 5
            componentInstance.timeOptions.firstOption.break = 5

            expect(componentInstance.isOptionDisabled('first')).toEqual(null)
        })
        it('isOptionDisabled with "time first option !== chosen time" should return styles.disabled_button', ()=>{
            componentInstance.chosenTime.focus = 3
            componentInstance.timeOptions.firstOption.focus = 5
            componentInstance.chosenTime.break = 5
            componentInstance.timeOptions.firstOption.break = 5

            expect(componentInstance.isOptionDisabled('first')).toEqual({backgroundColor : 'rgba(41, 112, 227, 0.2)'})
        })
        it('isOptionDisabled with "time second option === chosen time" should return null', ()=>{
            componentInstance.chosenTime.focus = 5
            componentInstance.timeOptions.secondOption.focus = 5
            componentInstance.chosenTime.break = 5
            componentInstance.timeOptions.secondOption.break = 5

            expect(componentInstance.isOptionDisabled('first')).toEqual(null)
        })
        it('isOptionDisabled with "time second option !== chosen time" should return styles.disabled_button', ()=>{
            componentInstance.chosenTime.focus = 3
            componentInstance.timeOptions.secondOption.focus = 5
            componentInstance.chosenTime.break = 5
            componentInstance.timeOptions.secondOption.break = 5

            expect(componentInstance.isOptionDisabled('second')).toEqual({backgroundColor : 'rgba(41, 112, 227, 0.2)'})
        })
/*
        it('setActionOnPress with "Resume" should return startTimer', ()=>{
            componentInstance.setState({...componentInstance.state,                 
                timerIsActive : false,
                timerState : 'focus',
                timer : {...componentInstance.state.timer,
                    focus : {...componentInstance.state.timer.focus,
                        minutes : 3
                    }
                }
            })
            componentInstance.chosenTime.focus = 5
            expect(componentInstance.setActionLabel()).toEqual('Resume')
            let result = componentInstance.setActionOnPress()
            expect(result).toMatchSnapshot()
        })*/
        test.todo('setActionOnPress')
    })
        

});
