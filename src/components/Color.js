function Color({ selected, id, setSelected }) {
  return (
    <div
      className={`colors ${selected === id ? "selected" : ""}`}
      id={id}
      onClick={() => {
        setSelected(id);
      }}
    ></div>
  );
}

export default Color;
