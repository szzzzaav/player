function SongCurrentProgress({ onMouseEnter, isHidden }) {
  const stageElGenerate = function (length, elLength, count) {
    const dis = (length - count * elLength) / (count - 1);
    return Array.from({ length: count }).map((_, i) => {
      return (
        <div
          className="stageEl"
          key={`stgeEl${i}`}
          style={{ left: `${i * elLength + i * dis}px` }}
        ></div>
      );
    });
  };
  return (
    <div
      className={`songCurrentProgress ${isHidden ? "hidden" : ""}`}
      onMouseEnter={onMouseEnter}
    >
      <div className="songCurrentProgressContainerWrapper">
        <div className="songCurrentProgressContainer">
          <div className="visualStage">{stageElGenerate(400, 3, 50)}</div>
          <div className="bgProgress">
            <div className="colorProgress"></div>
          </div>
          <input
            type="range"
            className="songCurrentProgressController"
            max="100"
            min="0"
            value="0"
            onChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

export default SongCurrentProgress;
