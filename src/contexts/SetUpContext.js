import { createContext, useState, useCallback, useContext } from "react";

const setUpContext = createContext();

const SetUpContextProvider = function ({ children }) {
  const [selected, setSelected] = useState("blue");
  const [openLyric, setOpenLyric] = useState(true);
  const handleOpenLyric = useCallback(function () {
    setOpenLyric((openLyric) => !openLyric);
  }, []);
  return (
    <setUpContext.Provider
      value={{
        selected,
        setSelected,
        openLyric,
        handleOpenLyric,
      }}
    >
      {children}
    </setUpContext.Provider>
  );
};

const useSetUp = function () {
  const context = useContext(setUpContext);
  return context;
};

export { useSetUp, SetUpContextProvider };
