import { ChildrenProp } from "../types/generalTypes";

type ButtonTypes = "primary" | "secondary" | "destructive";

interface ButtonTypeProps extends ChildrenProp {
  buttonType?: ButtonTypes;
  className?: string;
  disabled?: boolean;
}

type ButtonStylesType = {
  [key in ButtonTypes]: string;
};

const buttonStyles: ButtonStylesType = {
  primary: "bg-purple text-white text-purple",
  secondary: "bg-secondarybutton text-purple",
  destructive: "bg-red text-white",
};

const hoverStyles: ButtonStylesType = {
  primary: "hover:bg-purplehover",
  secondary: "",
  destructive: "hover:bg-redhover",
};

export function Button({
  buttonType = "primary",
  className,
  children = "Button Text",
  disabled,
}: ButtonTypeProps) {
  return (
    <button
      disabled={disabled}
      className={`py-4 px-6 rounded-full font-bold ${
        buttonStyles[buttonType]
      } ${disabled ? "" : hoverStyles[buttonType]} ${
        disabled ? "opacity-40" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
