import BgColorChange from "./BgColorChange";
import SongCoverContainer from "./SongCoverContainer";
import SongDetailsAndUserOperate from "./SongDetailsAndUserOperate";
import SongOperate from "./SongOperate";
import SongProgressController from "./SongProgressController";
import SongVolumeController from "./SongVolumeController";
import Loader from "./Loader";
import { useState, useRef } from "react";
import { useLoad } from "../contexts/loadContext";

function LeftStage() {
  const { isLoading, Song, timeProgressEl } = useLoad();
  const [openSongControl, setOpenSongControl] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(80);
  const started = useRef(false);

  const handleClickPlayAndPause = function () {
    setIsPlaying((isPlaying) => !isPlaying);
    if (!isPlaying) {
      if (!started.current) {
        Song.jump(0);
        started.current = true;
      } else {
        Song.continueplay();
      }
    } else {
      Song.pause();
    }
  };

  const handleClickVolume = function () {
    setMute((mute) => !mute);
    if (!mute) Song.volume(0);
    else Song.volume(volume / 100);
  };

  const handleChangeVolume = function (v) {
    setVolume(v);
    Song.volume(v / 100);
  };

  return (
    <div className="leftStage">
      {isLoading && <Loader />}
      <SongCoverContainer isHidden={isLoading} />
      <SongDetailsAndUserOperate isHidden={isLoading} />
      <SongVolumeController
        mute={mute}
        onClickVolume={handleClickVolume}
        volume={volume}
        onChangeVolume={handleChangeVolume}
        isHidden={isLoading}
      />
      <SongOperate
        isHidden={isLoading}
        handleClickPlayAndPause={handleClickPlayAndPause}
        isPlaying={isPlaying}
      >
        <BgColorChange />
      </SongOperate>
      <SongProgressController
        isHidden={isLoading}
        Song={Song}
        openSongControl={openSongControl}
        setOpenSongControl={setOpenSongControl}
        songProgress={songProgress}
        setSongProgress={setSongProgress}
      />
      <div className={`time ${isLoading ? "hidden" : ""}`}>
        <div
          className={`currentTime ${openSongControl ? "hidden" : ""}`}
          ref={timeProgressEl}
        >
          00:00
        </div>
        {openSongControl && <div>{Song.songtimeFormat(songProgress)}</div>}
        <div className="songLength">
          {Song ? Song.songtimeFormat(Song.getduration()) : "00:00"}
        </div>
      </div>
    </div>
  );
}

export default LeftStage;
