import { memo } from "react";

const SongCoverContainer = memo(function SongCoverContainer({ isHidden }) {
  return (
    <div className={`songCoverContainer ${isHidden ? "hidden" : ""}`}>
      <img className="songCover" src="./images/tellme.jpg" alt="songName" />
    </div>
  );
});

export default SongCoverContainer;
