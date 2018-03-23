'use strict';
import React from 'react';
import { connect, } from 'react-redux';
import AmazonUpload from './amazonUpload'
import { selectMP3toEdit } from '../store/addMediaForm'
//import FileSaver from 'file-saver';
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
      animationId: null, //candidate fro removal
      audioSrc: null,
      recordingTime: null,
      intervalID: null,
    };
    this.getAudio = this.getAudio.bind(this);
    this.handleStartRecording = this.handleStartRecording.bind(this);
    this.handleStopRecording = this.handleStopRecording.bind(this);
    this.getRecordingTime = this.getRecordingTime.bind(this);
    //this.assignBlobForUpload = this.assignBlobForUpload.bind(this)
  }
  clearCanvas() {
    const canvas = this.recorderVisualizer;
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const canvasCtx = canvas.getContext('2d');

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  }
  componentDidMount() {
    this.clearCanvas();
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

    var drawAlt = () => {
      //drawVisual = requestAnimationFrame(drawAlt);

      var animationId = requestAnimationFrame(drawAlt);
      this.setState({ animationId, });

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
          this.setState({ audioSrc: source, });
          var analyser = audioCtx.createAnalyser();
          source.connect(analyser);
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

          this.setState({ recorder, });

          this.setUpVisualizer(analyser);
          const self = this
          // callback for events
          recorder.onComplete = function (rec, blob) { // eslint-disable-line no-unused-vars
            self.props.handleGoToEditor(blob) //use this to place the blob on state
          };
        });
    } else {
      Recorder.recordingError('Unable to find Media Devices.')
    }
  }
  static recordingError(msg) {
    alert('There was an error when attempting to record: \n' + msg)
  }
  getRecordingTime() {
    const recorder = this.state.recorder;
    const time = recorder.recordingTime();
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milisecs = (time - Math.floor(time)).toFixed(5) * 1000;
    const recordingTime = `${minutes}:${
      seconds < 10 ? '0' + seconds : seconds
      }.${milisecs < 100 ? '0' : ''}${milisecs < 10 ? '0' : ''}${milisecs}`;
    this.setState({ recordingTime, });
  }
  async handleStartRecording() {
    try {
      await this.getAudio(); //once audio is grabbed!
      this.state.recorder.startRecording();
      const intervalID = setInterval(this.getRecordingTime, 100); // tenth of a second
      this.setState({ intervalID, });
    } catch (error) {
      Recorder.recordingError('Unable to start recording')
    }
  }
  handleStopRecording() {
    if (this.state.intervalID !== null) {
      clearInterval(this.state.intervalID)
      this.setState({ intervalID: null, })
    }
    this.setState({ doneRecording: true })
    this.getRecordingTime()
    this.state.recorder.finishRecording();
    this.state.audioSrc.disconnect();
  }

  render() {
    return (
      <div>
        <div>
          <h2>{this.state.recordingTime}</h2>
          <div>
            <canvas
              className="visualizer"
              width="640"
              height="100"
              ref={canvas => {
                this.recorderVisualizer = canvas;
              }}
            />
          </div>
        </div>
        <div>
          <button onClick={this.handleStartRecording}>Start</button>
          <button onClick={this.handleStopRecording}>Stop</button>
          {


          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchtoProps = (dispatch) => ({
  handleGoToEditor: (blob) => dispatch(selectMP3toEdit(blob))
})

export default connect(mapStateToProps, mapDispatchtoProps)(Recorder);
