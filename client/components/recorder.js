'use strict';
import React from 'react';
import { connect, } from 'react-redux';
// import { Storage, } from 'aws-amplify';
import Modal from './modal';
import { selectMP3toEdit, } from '../store/';
import { Link, } from 'react-router-dom';
import RecorderPlaybackSubmit from './recorderPlaybackSubmit';
// Storage.configure(awsExports)

// import FileSaver from 'file-saver';
require('../../public/web-audio-recorder-js/WebAudioRecorder');

/**
 * COMPONENT
 */
class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doneRecording: false,
      recorder: undefined,
      recordingTime: 'Not Recording',
      intervalID: null,
      isPaused: false,
      isRecording: false,
    };
    this.animationId = null;
    this.getAudio = this.getAudio.bind(this);
    this.handleStartRecording = this.handleStartRecording.bind(this);
    this.handleStopRecording = this.handleStopRecording.bind(this);
    this.getRecordingTime = this.getRecordingTime.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handlePauseRecording = this.handlePauseRecording.bind(this);
    this.handleResumeRecording = this.handleResumeRecording.bind(this);
    // this.getAudio()
  }
  clearCanvas(red = 0, green = 0, blue = 0) {
    const canvas = this.recorderVisualizer;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const canvasCtx = canvas.getContext('2d');

    canvasCtx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }
  componentDidMount() {
    if (this.props.isLoggedIn) this.clearCanvas();
  }
  setUpVisualizer(analyser) {
    const canvas = this.recorderVisualizer;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    analyser.fftSize = 256;
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;

    var bufferLengthAlt = analyser.frequencyBinCount;
    var dataArrayAlt = new Uint8Array(bufferLengthAlt);
    const canvasCtx = canvas.getContext('2d');

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
    this.isDrawing = true;
    var drawAlt = () => {
      this.animationId = requestAnimationFrame(drawAlt);

      analyser.getByteFrequencyData(dataArrayAlt);

      // use refs "string" then this.refs.string to reference the node within the class
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      var barWidth = WIDTH / bufferLengthAlt * 2.5;
      var barHeight;
      var xPos = 0;

      for (var i = 0; i < bufferLengthAlt; i++) {
        barHeight = dataArrayAlt[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        canvasCtx.fillRect(
          xPos,
          HEIGHT - barHeight / 2,
          barWidth,
          barHeight / 2
        );

        xPos += barWidth + 1;
      }
    };

    drawAlt();
  }

  getAudio() {
    if (navigator.mediaDevices) {
      return navigator.mediaDevices
        .getUserMedia({ audio: true, video: false, })
        .then(stream => {
          // Create a MediaStreamAudioSourceNode
          // Feed the HTMLMediaElement into it
          var audioCtx = new AudioContext();
          var source = audioCtx.createMediaStreamSource(stream);
          this.analyser = audioCtx.createAnalyser();
          const configs = {
            workerDir: `/web-audio-recorder-js/`,
            encoding: 'mp3',
          };
          const recorder = new window.WebAudioRecorder(source, configs);

          // 'this' keeps getting loss, lets bind it ALL!
          for (let key in recorder) {
            if (typeof recorder[key] === 'function') {
              recorder[key] = recorder[key].bind(recorder);
            }
          }
          this.audioSrc = source;

          this.recorder = recorder;
          // callback for events
          recorder.onComplete = (rec, blob) => {
            this.recording = blob;
            this.setState({ isRecording: true, });
            // handleGoToEditor(blob);
            // addBlobToS3(blob, 'mp3').then(fileName => {
            //   // Storage.get(fileName).then(resultPath => {
            //   //   console.log('resultPath: ', resultPath);
            //   // });
            // });
          };
        });
    } else {
      Recorder.recordingError('Unable to find Media Devices.');
    }
  }
  static recordingError(msg) {
    alert('There was an error when attempting to record: \n' + msg);
  }
  getRecordingTime(msg = '') {
    const recorder = this.recorder;
    const time = recorder.recordingTime();
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milisecs = (time - Math.floor(time)).toFixed(5) * 1000;
    const recordingTime = `${minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }.${milisecs < 100 ? '0' : ''}${
      milisecs < 10 ? '0' : ''
    }${milisecs} ${msg}`.trim();
    this.setState({ recordingTime, });
  }
  handleStartRecording() {
    try {
      this.getAudio() //once audio is grabbed!
        .then(() => {
          this.countDown(3);
        });
    } catch (error) {
      Recorder.recordingError('Unable to start recording');
    }
  }
  countDown(secs) {
    if (secs === -1) {
      this.audioSrc.connect(this.analyser); //new
      this.setUpVisualizer(this.analyser);
      this.recorder.startRecording();
      const intervalID = setInterval(this.getRecordingTime, 100); // tenth of a second
      this.setState({ intervalID, });
    } else {
      switch (secs + 1) {
        case 2:
          this.clearCanvas(255, 255, 0); // yellow
          break;
        case 1:
          this.clearCanvas(0, 255, 0); // green
          break;
        default:
          this.clearCanvas(255, 0, 0); // red
          break;
      }
      this.setState({ recordingTime: secs, });
      setTimeout(() => {
        this.countDown(secs - 1);
      }, 1000);
    }
  }

  handlePauseRecording() {
    //TODO
    this.setState({ isPaused: true, });
    this.state.recorder.stop();
  }

  handleResumeRecording() {
    this.setState({ isPaused: true, }); //TODO
    this.state.recorder.record();
  }

  handleResetRecording() {
    //TODO
  }
  handleStopRecording() {
    if (this.state.intervalID !== null) {
      clearInterval(this.state.intervalID);
      this.setState({ intervalID: null, doneRecording: true, });
    }
    if (this.animationId !== null) {
      //let the animation die before stopping
      setTimeout(() => {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }, 2000);
    }
    if (this.recorder) {
      this.getRecordingTime(' - Recording Stopped');
      this.recorder.finishRecording();
      this.audioSrc.disconnect();
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h2>{this.state.recordingTime}</h2>
            <div>
              <canvas
                className="visualizer"
                width="800"
                height="150"
                ref={canvas => {
                  this.recorderVisualizer = canvas;
                }}
              />
            </div>
          </div>
          {this.state.doneRecording ? (
            <div id="doneOptions">
              <button className="recorderBtn">Reset</button>
              <button className="recorderBtn">Listen</button>
              <Link id="editorLink" to="addMediaForm">
                Go to Editor{' '}
              </Link>
            </div>
          ) : (
            <div>
              <div>
                <button
                  className="recorderBtn"
                  onClick={() => {
                    this.props.isLoggedIn
                      ? this.handleStartRecording()
                      : this.props.history.push('/loginModal');
                  }}
                >
                  Start
                </button>
                {this.state.isPaused ? (
                  <button
                    className="recorderBtn"
                    onClick={this.handleResumeRecording}
                  >
                    Resume
                  </button>
                ) : (
                  <button
                    className="recorderBtn"
                    onClick={this.handlePauseRecording}
                  >
                    Pause
                  </button>
                )}
                <button
                  className="recorderBtn"
                  onClick={this.handleStopRecording}
                >
                  Stop
                </button>
              </div>
              {this.props.isLoggedIn ? '' : <Modal />}
            </div>
          )}
        </div>
        {this.state.isRecording ? (
          <RecorderPlaybackSubmit storySrc={this.recording} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatchtoProps = dispatch => ({
  handleGoToEditor: blob => dispatch(selectMP3toEdit(blob)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(Recorder);
