import { useEffect, useRef } from "react";
import { useViewportWidth } from "./useViewportWidth";
import { useHome } from "../context/HomeContext";

export function useDrag(ignoredElementClass: string) {
  const { screenType } = useViewportWidth();
  const { status } = useHome();
  const boardElRef = useRef<HTMLDivElement | null>(null);

  // Dragging the board with mouse
  useEffect(() => {
    const boardEl = boardElRef.current;
    if (status === "loading" || !boardEl) return;

    const pos = { top: 0, left: 0, startX: 0, startY: 0 };

    const handleMouseUp = () => {
      boardEl.removeEventListener("mousemove", handleMouseMove);
      boardEl.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(`.${ignoredElementClass}`)) return;

      pos.startX = e.clientX;
      pos.startY = e.clientY;
      pos.top = boardEl.scrollTop;
      pos.left = boardEl.scrollLeft;

      boardEl.addEventListener("mousemove", handleMouseMove);
      boardEl.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Relative position
      const dx = e.clientX - pos.startX;
      const dy = e.clientY - pos.startY;

      boardEl.scrollTop = pos.top - dy;
      boardEl.scrollLeft = pos.left - dx;
    };

    boardEl.addEventListener("mousedown", handleMouseDown);

    return () => {
      boardEl.removeEventListener("mousemove", handleMouseDown);
    };
  }, [status, screenType]);

  return boardElRef;
}
