import { useClickOutside } from "../hooks/useClickOutside";
import { ChildrenProp } from "../types/generalTypes";
import { useViewportWidth } from "../hooks/useViewportWidth";
import Icons from "./Icons";
import { useLayoutEffect, useState, useRef, MouseEventHandler } from "react";

type Tdirection = "center" | "left";

const directionStyle: { center: string; left: string } = {
  center: "left-[50%] translate-x-[-50%]",
  left: "right-0",
};
export function KebabMenu({ children }: ChildrenProp) {
  const [isOpen, setIsOpen] = useState(() => false);
  const [direction, setDirection] = useState<Tdirection>(() => "center");
  const { viewportWidth } = useViewportWidth();
  const element = useRef<null | HTMLDivElement>(null);

  useLayoutEffect(() => {
    const listElement = element.current;
    if (!listElement) return;
    const elRight = listElement.getBoundingClientRect().right;
    const elWidth = listElement.getBoundingClientRect().width;
    if (viewportWidth - elRight < elWidth) {
      setDirection("left");
    } else {
      setDirection("center");
    }
  }, [viewportWidth, isOpen]);

  useClickOutside(() => {
    setIsOpen(false);
  }, ["kebab-menu"]);

  // Closes the element whenever a child button element is clicked.
  const handleCloseOnClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if ((e.target as HTMLDivElement).tagName === "BUTTON") setIsOpen(false);
  };

  return (
    <div className="relative kebab-menu z-20">
      <div
        className="p-2 cursor-pointer"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <Icons iconType="menu" className=" fill-secondary" />
      </div>
      {isOpen && (
        <div
          className={`bg-kebab grid p-4 w-[10rem] mt-2 place-items-start text-sm gap-4 rounded-lg absolute top-8 ${directionStyle[direction]}`}
          style={{}}
          ref={element}
          onClick={handleCloseOnClick}
        >
          {children}
        </div>
      )}
    </div>
  );
}
