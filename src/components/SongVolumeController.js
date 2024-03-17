import { useEffect, useState } from "react";
import Icon from "./Icon";

function SongVolumeController({
  mute,
  onClickVolume,
  volume,
  onChangeVolume,
  isHidden,
}) {
  const [progressWidth, setProgressWidth] = useState(0);
  useEffect(() => {
    const elWidth = 382;
    setProgressWidth(mute ? 0 : (volume / 100) * elWidth);
  }, [mute, volume, setProgressWidth]);
  return (
    <div className={`controllerBar ${isHidden ? "hidden" : ""}`}>
      <div className="volume">
        <Icon onClickIcon={onClickVolume} iconString={"&#xe63c;"} />
        <div className="volumeContainerWrapper">
          <div className="volumeContainer">
            <div className="bgProgress">
              <div
                className="colorProgress"
                style={{ width: progressWidth }}
              ></div>
            </div>
            <input
              type="range"
              className="volumeController"
              max="100"
              min="0"
              value={mute ? 0 : volume}
              onChange={(e) => onChangeVolume(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongVolumeController;
