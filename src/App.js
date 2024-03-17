import Bg from "./components/Bg";
import LeftStage from "./components/LeftStage";
import RightStage from "./components/RightStage";
import Shadow from "./components/Shadow";
import "./style.css";
import "./font/iconfont.css";
import { SetUpContextProvider } from "./contexts/SetUpContext";
import { LoadProvider } from "./contexts/loadContext";

function App() {
  return (
    <LoadProvider>
      <SetUpContextProvider>
        <Bg />
        <Shadow />
        <LeftStage />
        <RightStage />
      </SetUpContextProvider>
    </LoadProvider>
  );
}

export default App;
