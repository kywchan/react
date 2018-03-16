import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0em 1em;
  background: transparent;
  color: black;
  border: 2px solid black;
}`; 

const Label = styled.label`
  padding: 0.25em 1em;
  margin: 0em 1em;
  background: transparent;
  color: black;
}`;
class Timer extends Component {    
    constructor() {
      super();
      // state has the following properties
      // time - string representation of seconds
      // seconds - remaining time in seconds
      this.state = { timestamp: new Date(), time: {}, seconds: 60, workflow: "Start" };
      
      // context reference
      this.timer = 0;
      // bind early and often
      this.countDown = this.countDown.bind(this);
      this.workflowTimer = this.workflowTimer.bind(this);
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
  
    componentDidMount() {
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
    }
  
    stopTimer = () => {
        console.log(this.state.timestamp, this.state.workflow, "stopTimer", this.state);
        clearInterval(this.timer);
        this.setState({
            time: this.secondsToTime(60),
            seconds: 60,
            workflow: "Start"
          });        
    }

    workflowTimer = () => {
        console.log(this.state.timestamp, this.state.workflow, "workflowTImer", this.state);
        switch (this.state.workflow) {
            case "Start":
                this.setState({
                    workflow: "Pause" 
                });
                this.timer = setInterval(() => this.countDown(), 1000);
                break;
            case "Pause":
                clearInterval(this.timer);
                this.setState({
                    workflow: "Resume" 
                });
                break;
            case "Resume":
                this.setState({
                    workflow: "Pause" 
                 });
                 this.timer = setInterval(() => this.countDown(), 1000);
                break;
            default:
                console.log(":( - Bad code. We'll keep getting better.");        
        }
      }

    setTimer = (param) => {
        this.setState({
            time: this.secondsToTime(param),
            seconds: param          
        });         
    }

    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });
      
      // Check if we're at zero.
      if (seconds === 0) { 
        clearInterval(this.timer);
      }
    }
  
    render() {
      return(
        <div>
            <Label>m: {this.state.time.m} s: {this.state.time.s}</Label>
            <br/>
            <br/>
            <Button onClick={this.workflowTimer}>{this.state.workflow}</Button>
            <Button onClick={this.stopTimer}>Cancel</Button>
        </div>
      );
    }
  }
  
  export default Timer;

