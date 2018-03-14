import React, { Component } from 'react';
 
class Example extends Component {    
    constructor() {
      super();
      this.state = { time: {}, seconds: 60, play: false };
      this.timer = 0;

      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
      this.pauseTimer = this.pauseTimer.bind(this);
      this.stopTImer = this.stopTimer.bind(this);
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }

    buttonStatusToString(param) {
        if (param === true) {
            return "Pause"
        }
        else return "Start"
    }
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }
  
    stopTimer = () => {
        clearInterval(this.timer);
        this.setState({
            time: this.secondsToTime(0),
            seconds: 0,
            play: false
          });        
    }

    pauseTimer = () => {
        clearInterval(this.timer);
        if (this.state.play === true) {
            this.setState({
                play: false
            });       
        }
        else {
            this.timer = setInterval(() => this.countDown(), 1000);    
        }    
    }

    setTimer = (param) => {
        this.setState({
            time: this.secondsToTime(param),
            seconds: param          
        });         
    }

    startTimer = () => {
        this.timer = setInterval(() => this.countDown(), 1000);
    }

    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        play: true
      });
      
      // Check if we're at zero.
      if (seconds === 0) { 
        clearInterval(this.timer);
      }
    }
  
    render() {
      return(
        <div>
          <button onClick={this.startTimer}>Start</button>

          <button onClick={this.pauseTimer}>{this.buttonStatusToString(this.state.play)}</button>
          
          <button onClick={this.stopTimer}>Cancel</button>
          m: {this.state.time.m} s: {this.state.time.s}
        </div>
      );
    }
  }
  
  export default Example;

