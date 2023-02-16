import { useState, useRef, useEffect } from "react";
import sidestyle from "../../Style/Slidebar/Slidebar.module.css";
import SlidebarContents from "./SlidebarContents";
import rightarrow from "../../assets/image/rightarrow.png";
import leftarrow from "../../assets/image/leftarrow.png";

const SlidebarMain = ({ width = 300, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();

  const slideToggle = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  };
  const handleClose = (event) => {
    let sideArea = side.current;
    let sideChildren = side.current.contains(event.target);
    if (isOpen && (!sideArea || !sideChildren)) {
      setX(width);
      setOpen(false);
    }
  };
  useEffect(() => {
    slideToggle();
  }, true);
  // useEffect(() => {
  //   window.addEventListener("click", handleClose);
  //   return () => {
  //     window.removeEventListener("click", handleClose);
  //   };
  // });
  return (
    <div className={sidestyle.Slidecontainer}>
      <div
        ref={side}
        className={sidestyle.sidebar}
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <button
          onClick={() => slideToggle()}
          className={sidestyle.sidebarButton}
        >
          {isOpen ? (
            <img
              className={sidestyle.sidebararrow}
              src={leftarrow}
              alt="leftarrow"
            />
          ) : (
            <img
              className={sidestyle.sidebararrow}
              src={rightarrow}
              alt="rightarrow"
            />
          )}
        </button>
        <div>
          {children}
          <SlidebarContents />
        </div>
      </div>
    </div>
  );
};

export default SlidebarMain;
