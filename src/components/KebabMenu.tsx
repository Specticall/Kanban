import { useClickOutside } from "../hooks/useClickOutside";
import { ChildrenProp } from "../types/generalTypes";
// import { useViewportWidth } from "../hooks/useViewportWidth";
import Icons from "./Icons";
import { useState } from "react";

export function KebabMenu({ children }: ChildrenProp) {
  const [isOpen, setIsOpen] = useState(() => false);
  // const { screenWidth } = useViewportWidth();

  useClickOutside(() => {
    setIsOpen(false);
  }, ["kebab-menu"]);

  return (
    <div className="relative kebab-menu">
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
          className="bg-kebab grid p-4 w-[10rem] place-items-start text-sm gap-4 rounded-lg absolute top-8 left-[50%] translate-x-[-50%]"
          style={{}}
        >
          {children}
        </div>
      )}
    </div>
  );
}
