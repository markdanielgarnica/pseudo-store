import React, { createContext, useEffect, useState } from "react";
interface ScrollContextValue {
  scrollPosition: number;
  handleSetScrollPosition: React.Dispatch<React.SetStateAction<any>>;
}
export const ScrollContext = createContext<ScrollContextValue>({
  scrollPosition: 0,
  handleSetScrollPosition: () => {},
});

function ScrollProvider({ children }: any) {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleSetScrollPosition(scrollPos: any) {
    setScrollPosition(scrollPos);
    // sessionStorage.setItem("scrollPosition", window.scrollY.toString());
  }
  return (
    <ScrollContext.Provider value={{ scrollPosition, handleSetScrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
}

export default ScrollProvider;
