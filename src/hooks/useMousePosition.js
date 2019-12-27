import { useState, useRef, useCallback, useEffect } from "react";
import { useThrottleCallback } from "@react-hook/throttle";

export const canHover = () =>
  typeof window !== "undefined"
    ? !window.matchMedia("(hover: none)").matches
    : false;

const initialState = {
  x: null,
  y: null,
  pageX: null,
  pageY: null,
  clientX: null,
  clientY: null,
  screenX: null,
  screenY: null,
  elementWidth: null,
  elementHeight: null,
  isOver: false
};

export const useMousePosition = (enterDelay = 0, leaveDelay = 0, fps = 30) => {
  const [state, setState] = useState(initialState),
    entered = useRef(false),
    [element, setElement] = useState(null),
    timeout = useRef();

  const delay = (amt, fn) => {
    if (!canHover()) return;

    timeout.current && window.clearTimeout(timeout.current);

    if (amt) {
      timeout.current = window.setTimeout(fn, amt);
    } else {
      fn();
    }
  };

  const onMove_ = useCallback(
    e => {
      if (!canHover() || !entered.current || !element) return;

      const { clientX, clientY, screenX, screenY, pageX = 0, pageY = 0 } = e,
        rect = element.getBoundingClientRect();

      setState({
        x: pageX - rect.left - (window.pageXOffset || window.scrollX),
        y: pageY - rect.top - (window.pageYOffset || window.scrollY),
        pageX,
        pageY,
        clientX,
        clientY,
        screenX,
        screenY,
        elementWidth: rect.width,
        elementHeight: rect.height,
        isOver: true
      });
    },
    [element]
  );

  const onMove = useThrottleCallback(onMove_, fps, true);

  useEffect(() => {
    if (element !== null) {
      const onEnter = e => {
        delay(enterDelay, () => {
          entered.current = true;
          onMove(e);
        });
      };
      const onLeave = () => {
        delay(leaveDelay, () => {
          entered.current = false;
          setState(initialState);
        });
      };

      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mousemove", onMove);
      element.addEventListener("mouseleave", onLeave);

      return () => {
        timeout.current !== null && window.clearTimeout(timeout.current);
        timeout.current = undefined;

        if (element !== null) {
          element.removeEventListener("mouseenter", onEnter);
          element.removeEventListener("mousemove", onMove);
          element.removeEventListener("mouseleave", onLeave);
        }
      };
    }
  }, [element, enterDelay, leaveDelay, onMove]);

  return [state, setElement];
};

export default useMousePosition;
