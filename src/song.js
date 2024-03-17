import { lyric } from "./lyric.js";

// const UPDATE_INTERVAL = 0.5;

export class song extends lyric {
  //audio控件
  AudioContext;
  AudioSource;
  AudioBuffer;
  bufferData;
  AudioAnalyser;
  AudioGainNode;
  AudioFreqData;

  //时间与状态
  startTimeStamp;
  pauseTimeStamp;
  totalpause;
  started;
  state;
  songLength;

  //可视化舞台
  songstageEls;
  timeProgressEl;
  songprogressEl;
  bgProgress;
  constructor(
    ArrayBuffer,
    songstageEls,
    timeProgressEl,
    songprogressEl,
    bgProgress,
    text,
    lrcstage,
    templatebegin,
    templateend,
    offset
  ) {
    super(text, lrcstage, templatebegin, templateend, offset);
    this.AudioBuffer = ArrayBuffer;
    this.songstageEls = songstageEls;
    this.timeProgressEl = timeProgressEl;
    this.songprogressEl = songprogressEl;
    this.bgProgress = bgProgress;
    this.started = false;
    return (async () => {
      await this.setparams();
      return this;
    })();
  }

  setTime() {
    this.startTimeStamp = 0;
    this.pauseTimeStamp = 0;
    this.totalpause = 0;
  }

  async setparams() {
    this.setTime();
    if (!this.AudioContext) {
      this.AudioContext = new window.AudioContext();
    }
    if (!this.bufferData) {
      this.bufferData = await this.AudioContext.decodeAudioData(
        this.AudioBuffer
      );
    }
    this.songLength = this.bufferData.duration;
    this.AudioSource = this.AudioContext.createBufferSource();
    this.AudioAnalyser = this.AudioContext.createAnalyser();
    this.AudioGainNode = this.AudioContext.createGain();

    this.AudioSource.buffer = this.bufferData;
    this.AudioSource.connect(this.AudioGainNode);
    this.AudioGainNode.connect(this.AudioContext.destination);
    this.AudioSource.connect(this.AudioAnalyser);
    this.AudioFreqData = [];
    this.AudioSource.loop = true;
  }

  resetparams() {
    this.started = false;
    this.AudioSource.disconnect(this.AudioGainNode);
    this.AudioGainNode.disconnect(this.AudioContext.destination);
    this.AudioSource.disconnect(this.AudioAnalyser);
  }

  //继续播放
  continueplay() {
    this.state = "play";
    this.totalpause += this.AudioContext.currentTime - this.pauseTimeStamp;
    this.AudioContext.resume();
  }

  //停止播放
  stop() {
    this.AudioSource.stop();
    this.resetparams();
  }

  //暂停播放
  pause() {
    this.state = "pause";
    this.pauseTimeStamp = this.AudioContext.currentTime;
    this.AudioContext.suspend();
  }

  //跳转播放:time 秒
  jump(time, flag) {
    if (!flag) {
      this.AudioSource.start(0);
      this.started = true;
      this.startTimeStamp = this.AudioContext.currentTime;
      this.draw = this.draw.bind(this);
      this.draw();
      this.showlryonlrcstage(0, "active");
    } else {
      this.stop();
      this.setparams();
      this.AudioSource.start(0, Number(time));

      //cur - total - start
      this.totalpause =
        this.AudioContext.currentTime - time - this.startTimeStamp;
    }
    this.state = "play";
  }

  draw() {
    requestAnimationFrame(this.draw);
    this.AudioFreqData = new Uint8Array(this.AudioAnalyser.frequencyBinCount);
    this.AudioAnalyser.getByteFrequencyData(this.AudioFreqData);
    let time = this.getprocesstime();
    let timestr = this.songtimeFormat(time);
    const T =
      Math.floor(this.AudioFreqData.length / this.songstageEls.length) - 8;
    for (let i = 0; i < this.songstageEls.length; i++) {
      let h = 0;
      for (let j = 1; j <= T; j++) {
        h += Number(this.AudioFreqData[i * T + j]);
      }
      h /= T;
      this.songstageEls[i].style.height = `${h / 9}px`;
    }
    const curl = (100 * Number(time)) / this.songLength;
    super.showlryonlrcstage(time, "active");
    this.timeProgressEl.textContent = timestr;
    this.songprogressEl.value = curl;
    this.bgProgress.style.width = `${curl * 4 + 2}px`;
  }

  getprocesstime() {
    let time =
      this.state === "play"
        ? this.AudioContext.currentTime - this.startTimeStamp - this.totalpause
        : this.pauseTimeStamp - this.totalpause - this.startTimeStamp;
    return time % this.songLength;
  }

  volume(deg) {
    if (deg >= 0 && deg <= 1) {
      try {
        this.AudioGainNode.gain.value = deg;
      } catch (err) {
        alert(err);
      }
    }
  }

  songtimeFormat(time) {
    let second = Math.floor(time % 60);
    let min = Math.floor(time / 60);
    second = `${second}`.padStart(2, "0");
    min = `${min}`.padStart(2, "0");
    return `${min}:${second}`;
  }

  getduration() {
    return this.songLength;
  }
}
