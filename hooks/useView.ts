import { useState, useEffect } from "react";

export const useView = () => {
  const [view, setView] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 800) {
        setView("PC");
      } else {
        setView("SP");
      }
    };

    // Initial call to set the view on component mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return view;
};
