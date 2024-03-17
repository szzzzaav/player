function SongControlProgress({
  onMouseLeave,
  isHidden,
  songProgress,
  dur,
  onSongProgressChange,
  onMouseUp,
}) {
  const width = (songProgress / dur) * 400 || 0;
  return (
    <div
      className={`songControllProgress ${isHidden ? "hidden" : ""}`}
      onMouseLeave={onMouseLeave}
    >
      <div className="songControllProgressContainerWrapper">
        <div className="songControllProgressContainer">
          <div className="bgProgress">
            <div className="colorProgress" style={{ width: width }}></div>
          </div>
          <input
            type="range"
            className="songControllProgressController"
            max="100"
            min="0"
            value={(songProgress / dur) * 100 || 0}
            onChange={onSongProgressChange}
            onMouseUp={() => onMouseUp(songProgress)}
          />
        </div>
      </div>
    </div>
  );
}

export default SongControlProgress;
