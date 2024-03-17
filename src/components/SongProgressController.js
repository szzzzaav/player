import SongControlProgress from "./SongControlProgress";
import SongCurrentProgress from "./SongCurrentProgress";

function SongProgressController({
  isHidden,
  Song,
  openSongControl,
  setOpenSongControl,
  songProgress,
  setSongProgress,
}) {
  const handleControlToggle = function () {
    setOpenSongControl((openSongControl) => !openSongControl);
  };

  const onMouseEnter = function (e) {
    e.preventDefault();
    handleControlToggle();
    setSongProgress(Song.getprocesstime());
  };

  const onSongProgressChange = function (e) {
    e.preventDefault();
    const v = (e.target.value / 100) * Song.getduration();
    setSongProgress(v);
  };

  const onMouseUp = function (v) {
    Song.jump(v, true);
  };

  return (
    <div className={`controllerBar songControl ${isHidden ? "hidden" : ""}`}>
      <SongCurrentProgress
        onMouseEnter={onMouseEnter}
        isHidden={openSongControl}
      />
      <SongControlProgress
        onMouseLeave={handleControlToggle}
        isHidden={!openSongControl}
        songProgress={songProgress}
        dur={Song?.getduration()}
        onSongProgressChange={onSongProgressChange}
        onMouseUp={onMouseUp}
      />
    </div>
  );
}

export default SongProgressController;
