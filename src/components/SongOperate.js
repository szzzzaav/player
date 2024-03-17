import { useState } from "react";
import Icon from "./Icon";
import Next from "./Next";
import Prev from "./Prev";
import { useSetUp } from "../contexts/SetUpContext";

function SongOperate({
  children,
  isHidden,
  handleClickPlayAndPause,
  isPlaying,
}) {
  const { handleOpenLyric: onClickLyric } = useSetUp();
  const [openBgColor, setOpenBgColor] = useState(false);
  const handleClickBgColor = function () {
    setOpenBgColor((openBgColor) => !openBgColor);
  };

  return (
    <div className={`controllerBar songOperates ${isHidden ? "hidden" : ""}`}>
      <div className="songOperateBar">
        <Icon
          className={"lyricDisplay"}
          iconString={"&#xe602;"}
          onClickIcon={onClickLyric}
        />
        <Prev />
        {!isPlaying && (
          <Icon
            className={"play"}
            iconString={"&#xea82;"}
            onClickIcon={handleClickPlayAndPause}
          />
        )}
        {isPlaying && (
          <Icon
            className={"pause"}
            iconString={"&#xea81;"}
            onClickIcon={handleClickPlayAndPause}
          />
        )}
        <Next />
        <Icon
          className={"bgColor"}
          iconString={"&#xe689;"}
          onClickIcon={handleClickBgColor}
        />
      </div>
      {openBgColor && children}
    </div>
  );
}

export default SongOperate;
