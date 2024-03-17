import { useSetUp } from "../contexts/SetUpContext";
import { useLoad } from "../contexts/loadContext";
import Loader from "./Loader";

function RightStage() {
  const { openLyric } = useSetUp();
  const { isLoading } = useLoad();
  return (
    <div className={`rightStage ${!openLyric ? "hidden" : ""}`}>
      {isLoading && <Loader />}
      <div className={`lyric_bar ${isLoading ? "hidden" : ""}`}>
        <div className="lyric_el"></div>
        <div className="lyric_el"></div>
        <div className="lyric_el"></div>
        <div className="lyric_el"></div>
      </div>
    </div>
  );
}

export default RightStage;
