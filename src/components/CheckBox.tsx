import { useState } from "react";
import Icons from "./Icons";

export function CheckBox({
  checked = false,
  onClick = () => {},
}: {
  checked: boolean;
  onClick?: () => void;
}) {
  const [isChecked, setIsChecked] = useState(() => checked);

  const handleClick = () => {
    setIsChecked((current) => !current);
    onClick();
  };

  return (
    <div
      className={`w-4 h-4 bg-elements grid place-content-center aspect-square rounded-sm cursor-pointer ${
        isChecked ? "bg-purple" : "border-[1px] border-lines"
      }`}
      onClick={handleClick}
    >
      {isChecked && <Icons iconType="check" />}
    </div>
  );
}
