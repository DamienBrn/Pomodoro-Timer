import React from 'react'
// import Timer from './components/Timer/Timer'
import Timer from './components/Timer/Timer'
import { registerRootComponent } from 'expo'


class App extends React.Component {
  render(){
    return (
      <Timer/>
    );
  }
}

export default registerRootComponent(App);
