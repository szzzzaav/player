import Icon from "./Icon";
import { memo } from "react";

const SongDetailsAndUserOperate = memo(function SongDetailsAndUserOperate({
  isHidden,
}) {
  return (
    <div className={`controllerBar ${isHidden ? "hidden" : ""}`}>
      <div className="songDetails">
        <div className="songName">TELL ME</div>
        <div className="singer">MILET</div>
      </div>
      <div className="userOperateBar">
        <Icon className={"love userOperate"} iconString={"&#xeca1;"} />
        <Icon className={"addToUserList userOperate"} iconString={"&#xe6a8;"} />
      </div>
    </div>
  );
});

export default SongDetailsAndUserOperate;
