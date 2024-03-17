import { useSetUp } from "../contexts/SetUpContext";

function Bg() {
  const { selected: id } = useSetUp();
  return <div className="bg" id={id}></div>;
}

export default Bg;
