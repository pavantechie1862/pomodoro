import { Component } from "react";
import { FaPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import "./index.css";

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimit: 25,
    currentRunningSeconds: 0,
  };

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer = () => {
    clearInterval(this.intervalId);
  };

  onClickResetTimer = () => {
    this.setState({
      isTimerRunning: false,
      timerLimit: 25,
      currentRunningSeconds: 0,
    });
    this.clearTimer();
  };

  decreaseTimerLimit = () => {
    const { timerLimit } = this.state;
    if (timerLimit > 1) {
      this.setState((prevState) => ({ timerLimit: prevState.timerLimit - 1 }));
    }
  };

  incrementTimerLimit = () => {
    this.setState((prevState) => ({ timerLimit: prevState.timerLimit + 1 }));
  };

  startTimerCountDown = () => {
    const { currentRunningSeconds, timerLimit } = this.state;
    const isTimeCompleted = currentRunningSeconds === timerLimit * 60;
    if (isTimeCompleted) {
      this.setState({ isTimerRunning: false, currentRunningSeconds: 0 });
      this.clearTimer();
    } else {
      this.setState((prevState) => ({
        currentRunningSeconds: prevState.currentRunningSeconds + 1,
      }));
    }
  };

  startStopTimer = () => {
    const { isTimerRunning, currentRunningSeconds, timerLimit } = this.state;
    this.setState((prevState) => ({
      isTimerRunning: !prevState.isTimerRunning,
    }));
    const isTimeCompleted = currentRunningSeconds === timerLimit * 60;
    if (isTimeCompleted) {
      this.setState({ isTimerRunning: false });
      this.clearTimer();
    }
    if (isTimerRunning) {
      this.clearTimer();
      this.setState({ isTimerRunning: false });
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown();
      }, 1000);
    }
  };

  renderTimerControlOptions = () => {
    const { isTimerRunning } = this.state;

    const startStopText = isTimerRunning ? "Pause" : "Start";
    return (
      <div className="control-options-container">
        <button
          className="start-stop-button"
          type="button"
          onClick={this.startStopTimer}
        >
          <div className="start-stop-container">
            {isTimerRunning && <FaRegPlayCircle className="start-stop-icon" />}
            {!isTimerRunning && <FaPauseCircle className="start-stop-icon" />}
            <h1 className="start-stop-text">{startStopText}</h1>
          </div>
        </button>

        <button
          className="start-stop-button"
          type="button"
          onClick={this.onClickResetTimer}
        >
          <div className="start-stop-container">
            <BiReset className="start-stop-icon" />
            <h1 className="start-stop-text">Reset</h1>
          </div>
        </button>
      </div>
    );
  };

  renderSetTimerControls = () => {
    const { timerLimit, currentRunningSeconds } = this.state;
    const isButtonDisabled = currentRunningSeconds > 0;
    return (
      <div className="set-timer-controls">
        <div className="set-limit-heading-container">
          <p className="set-timer-heading">Set Timer Limit</p>
        </div>
        <div className="inc-dec-time-container">
          <button
            className="inc-sec-button"
            type="button"
            onClick={this.decreaseTimerLimit}
            disabled={isButtonDisabled}
          >
            <h1 className="inc-dec-icon">-</h1>
          </button>
          <div className="time-limit-text-container">
            <p className="time-limit-text">{timerLimit}</p>
          </div>
          <button
            className="inc-sec-button"
            type="button"
            onClick={this.incrementTimerLimit}
            disabled={isButtonDisabled}
          >
            <h1 className="inc-dec-icon">+</h1>
          </button>
        </div>
      </div>
    );
  };

  convertTimeToTimerFormat = () => {
    const { timerLimit, currentRunningSeconds } = this.state;
    const timeInSeconds = timerLimit * 60 - currentRunningSeconds;
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`;
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutesInStringFormat}:${secondsInStringFormat}`;
  };

  render() {
    const { isTimerRunning } = this.state;
    const timerStatusText = isTimerRunning ? "Running" : "Paused";
    return (
      <div className="app-container">
        <div className="header-container">
          <h1 className="timer-heading">Digital Timer</h1>
        </div>
        <div className="display-timer-container">
          <div className="show-time-container">
            <div className="timer-block">
              <h1 className="time-text">{this.convertTimeToTimerFormat()}</h1>
              <p className="time-status">{timerStatusText}</p>
            </div>
          </div>
          <div className="timer-control-container">
            {this.renderTimerControlOptions()}
            {this.renderSetTimerControls()}
          </div>
        </div>
      </div>
    );
  }
}

export default DigitalTimer;
