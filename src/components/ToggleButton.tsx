import { useState } from "react";

interface ToggleButtonProps {
  onToggle?: (direction: "left" | "right") => void;
  initialPosition?: "left" | "right";
}

const rightPos = "1.45rem";
const leftPos = ".225rem";

export function ToggleButton({
  initialPosition = "right",
  onToggle = () => {},
}: ToggleButtonProps) {
  const [direction, setDirection] = useState(() => initialPosition);

  const handleToggle = () => {
    setDirection((cur) => (cur === "left" ? "right" : "left"));
    onToggle(direction);
  };

  return (
    <button
      className=" w-10 h-5 bg-purple hover:bg-purplehover rounded-full relative"
      onClick={handleToggle}
    >
      <div
        className="w-[0.875rem] aspect-square bg-white    absolute rounded-full top-[50%] translate-y-[-50%] transition-all"
        style={{ left: direction === "left" ? leftPos : rightPos }}
      ></div>
    </button>
  );
}
