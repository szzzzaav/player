import { useSetUp } from "../contexts/SetUpContext";
import Color from "./Color";

const colors = ["blue", "pink", "orange"];

function BgColorChange() {
  const { selected, setSelected } = useSetUp();
  return (
    <div className="colorsContainer">
      {colors.map((c) => (
        <Color id={c} selected={selected} setSelected={setSelected} key={c} />
      ))}
    </div>
  );
}

export default BgColorChange;
