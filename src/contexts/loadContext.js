import { createContext, useContext, useEffect, useRef, useState } from "react";
import { song } from "../song";

const loadContext = createContext();

const LoadProvider = function ({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const timeProgressEl = useRef(null);
  const Song = useRef(null);
  useEffect(function () {
    const fetchData = async function () {
      setIsLoading(true);
      try {
        const responsebuf = await fetch("./music/anywhereanytime.mp3");
        const ArrayBuffer = await responsebuf.arrayBuffer();
        const responselrc = await fetch("./lyric/Anytime+Anywhere-milet.lrc");
        const text = await responselrc.text();
        const lrcstage = document.querySelector(".lyric_bar");
        const templatebegin = '<div class="lyric_el">';
        const templateend = "</div>";
        const offset = 4;
        const songstageEls = document.querySelectorAll(".stageEl");
        const songProgress = document.querySelector(
          ".songCurrentProgressController"
        );
        const bgProgress = document.querySelector(
          ".songCurrentProgressContainer .colorProgress"
        );
        Song.current = await new song(
          ArrayBuffer,
          songstageEls,
          timeProgressEl.current,
          songProgress,
          bgProgress,
          text,
          lrcstage,
          templatebegin,
          templateend,
          offset
        );
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <loadContext.Provider
      value={{ isLoading, Song: Song.current, timeProgressEl }}
    >
      {children}
    </loadContext.Provider>
  );
};

const useLoad = function () {
  const context = useContext(loadContext);
  return context;
};

export { useLoad, LoadProvider };
