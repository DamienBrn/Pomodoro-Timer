
import Timer from './Components/Timer'
import React from 'react'
import {shallow} from 'enzyme'

'use strict'

const wrapper = shallow(<Timer/>)
const componentInstance = wrapper.instance()



describe('My timer ', () => {
    it('Shallow rendering', () => {
        expect(wrapper).toMatchSnapshot()
    })


    //=======================================USER INPUT===========================================================

    it('Should update state customeTimeValue to 20', ()=>{
        componentInstance.setState({...componentInstance.state, customTimeValue : {focus : '20'}})
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
        componentInstance.setState({...componentInstance.state, customTimeValue : {focus : '20'}})
        expect(componentInstance.isValueOutOfRange('focus')).toEqual(20)
    })
    it('isValueOutOfRange with 67 should return 59', ()=>{
        componentInstance.setState({...componentInstance.state, customTimeValue : {focus : '67'}})
        expect(componentInstance.isValueOutOfRange('focus')).toEqual(59)
    })

    //==================================================================================================

    it('displayTwoDigits with 1 should return 01', ()=>{
        expect(componentInstance.displayTwoDigits(1)).toEqual('01')
    })
    it('displayTwoDigits with 10 should return 10', ()=>{
        expect(componentInstance.displayTwoDigits(10)).toEqual(10)
    })

    //====================================INNER WORKING==============================================================

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

    it('pauseTimer should return timerIsActive === false and coutdown undefined', ()=>{
        componentInstance.setState({...componentInstance.state, timerIsActive : true})
        componentInstance.pauseTimer()
        expect(componentInstance.state.timerIsActive).toEqual(false)
    })

    //=================================STYLING FUNCTIONS=================================================================

    it('setTimerBorderColor with timerIsActive === false should return blue', ()=>{
        componentInstance.setState({...componentInstance.state, timerIsActive : false})
        expect(componentInstance.setTimerBorderColor()).toMatchSnapshot()
    })
    it('setTimerBorderColor with focus state should return red', ()=>{
        componentInstance.setState({...componentInstance.state,timerIsActive : true, timerState : 'focus'})
        expect(componentInstance.setTimerBorderColor()).toMatchSnapshot()
    })
    it('setTimerBorderColor with break state should return green', ()=>{
        componentInstance.setState({...componentInstance.state, timerIsActive : true ,timerState : 'break'})
        expect(componentInstance.setTimerBorderColor()).toMatchSnapshot()
    })


    it('setTimerStateMessage with timer is paused should return ...', ()=>{
        componentInstance.setState({...componentInstance.state, timerIsActive : false})
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

    it('timerIsActiveOrTimeIsOrigin with "active timer" and "time is origin" should return true', ()=>{
        componentInstance.setState({...componentInstance.state, timerIsActive : true})
        expect(componentInstance.timerIsActiveOrTimeIsOrigin()).toMatchSnapshot()
    })
    it('timerIsActiveOrTimeIsOrigin with "timer is not active" "time is origin" should return true', ()=>{
        componentInstance.setState({...componentInstance.state, timerIsActive : false})
        expect(componentInstance.timerIsActiveOrTimeIsOrigin()).toMatchSnapshot()
    })
    it('timerIsActiveOrTimeIsOrigin with "timer is not active" "time is not origin" should return false', ()=>{
        componentInstance.setState({...componentInstance.state, timerIsActive : false})
        expect(componentInstance.timerIsActiveOrTimeIsOrigin()).toMatchSnapshot()
    })


    //==================================================================================================






  });

