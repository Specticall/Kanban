import { useState, useLayoutEffect, useRef } from "react";
import Icons from "./Icons";
import { useViewportWidth } from "../hooks/useViewportWidth";
import { useClickOutside } from "../hooks/useClickOutside";

type DropDownProps = {
  onSelect: (selectedOption: string) => void;
  optionList: string[];
  className?: string;
  value: string;
};

const OPTIONS_ELEMENT_HEIGHT_PX = 34;
const OPTIONS_ELEMENT_PADDING_Y_PX = 8;

export function DropDown({
  onSelect,
  optionList,
  className = "",
  value,
}: // react-hook-form
DropDownProps) {
  const [selected, setSelected] = useState(() => value);
  const [isOpen, setIsOpen] = useState(() => false);
  const [direction, setDirection] = useState<"up" | "down">(() => "down");

  // Options * amount + padding Y * 2
  const [optionsHeight] = useState(
    () =>
      OPTIONS_ELEMENT_HEIGHT_PX * optionList.length +
      OPTIONS_ELEMENT_PADDING_Y_PX * 2
  );

  const dropDownEl = useRef<HTMLDivElement | null>(null);
  const { viewportHeight } = useViewportWidth();

  useLayoutEffect(() => {
    const selectElement = dropDownEl.current;
    const ElementDistanceFromBottom =
      window.innerHeight - selectElement!.getBoundingClientRect().bottom;

    if (ElementDistanceFromBottom < optionsHeight) {
      setDirection("up");
    } else {
      setDirection("down");
    }
  }, [viewportHeight, optionsHeight]);

  // Closes the drop down options when clicking outside the component.
  useClickOutside(() => {
    setIsOpen(false);
  }, ["drop-down__component"]);

  return (
    <div
      className={`drop-down__component w-full ${className} relative`}
      ref={dropDownEl}
    >
      <header
        className="px-4 py-2 bg-elements border-[1px] border-lines  flex justify-between items-center rounded-md hover:border-purple cursor-pointer"
        onClick={() => {
          setIsOpen((current) => !current);
        }}
      >
        <p className="text-sm text-primary">{selected}</p>
        <div>
          <Icons iconType="arrowDown" />
        </div>
      </header>
      {isOpen && (
        <div
          className={`py-2 text-sm bg-bg text-secondary grid rounded-md absolute left-0 right-0 z-10 shadow-lg shadow-shadownav`}
          style={{
            top: direction === "down" ? "2.75rem" : `-${optionsHeight + 8}px`,
          }}
        >
          {optionList.map((option, i) => {
            return (
              <div
                key={`${option}-${i}-dropdown`}
                onClick={() => {
                  setSelected(option);
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="py-2 px-4 hover:bg-elements"
              >
                <p>{option}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
