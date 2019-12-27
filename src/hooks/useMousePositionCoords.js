import { useState, useRef, useCallback, useEffect } from "react";
import { useThrottleCallback } from "@react-hook/throttle";
import { scaleLinear } from "d3-scale";
import tzlookup from "tz-lookup";

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
  isOver: false,
  lat: null,
  lng: null,
  tz: null
};

export const useMousePosition = (
  enterDelay = 0,
  leaveDelay = 0,
  fps = 30,
  location
) => {
  const [state, setState] = useState({ ...initialState, ...location }),
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

      const latScale = scaleLinear()
        .domain([0, rect.height])
        .range([90, -90])
        .clamp(true);

      const lngScale = scaleLinear()
        .domain([0, rect.width])
        .range([-180, 180])
        .clamp(true);

      const x = pageX - rect.left - (window.pageXOffset || window.scrollX);
      const y = pageY - rect.top - (window.pageYOffset || window.scrollY);

      const lat = +latScale(y).toFixed(4);
      const lng = +lngScale(x).toFixed(4);

      const tz = tzlookup(latScale(y), lngScale(x));

      setState({
        x,
        y,
        pageX,
        pageY,
        clientX,
        clientY,
        screenX,
        screenY,
        elementWidth: rect.width,
        elementHeight: rect.height,
        lat,
        lng,
        tz,
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
