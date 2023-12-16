//@ts-expect-error non typed library import
import { BlockPicker } from "react-color";
import { useClickOutside } from "../hooks/useClickOutside";
import { useState } from "react";
import "../styles/ReactColor/react-color.css";

interface ColorPickerProps {
  onClose: () => void;
  colorInput: string;
  className: string;
  clickOutsideClassList: string[];
  onSelectColor: (color: string) => void;
  style?: Record<string, string>;
}

interface ColorPickerInputProps {
  identifier: string;
  onSelectColor: (color: string) => void;
  color: string;
  style?: Record<string, string>;
  colorPickerStyle?: Record<string, string>;
}

export type Thsl = {
  a: number;
  h: number;
  s: number;
  l: number;
};

export type Thsv = {
  a: number;
  h: number;
  s: number;
  v: number;
};

export type Trgb = {
  r: number;
  g: number;
  b: number;
  a: number;
};

interface IColor {
  hex: string;
  hsl: Thsl;
  hsv: Thsv;
  oldHue: number;
  rgb: Trgb;
  source: "hex";
}

export function ColorPickerInput({
  identifier = "",
  onSelectColor = () => {},
  color = "",
  colorPickerStyle,
  style,
}: ColorPickerInputProps) {
  const [showColorPicker, setShowColorPicker] = useState(() => false);

  const handleClickColor = () => {
    setShowColorPicker((current) => !current);
  };
  return (
    <>
      <div
        className={`${identifier} w-[0.9375rem] aspect-square bg-primary rounded-full cursor-pointer`}
        style={{ ...style, background: color }}
        onClick={handleClickColor}
      ></div>
      {showColorPicker && (
        <ColorPicker
          className={`${identifier}  absolute top-8 left-0 z-10`}
          clickOutsideClassList={[identifier]}
          onSelectColor={onSelectColor}
          colorInput={color}
          onClose={handleClickColor}
          style={colorPickerStyle}
        />
      )}
    </>
  );
}

export function ColorPicker({
  onClose,
  colorInput = "#FFF",
  className = "",
  clickOutsideClassList = [],
  onSelectColor = () => {},
  style,
}: ColorPickerProps) {
  const [color, setColor] = useState<string>(() => colorInput);
  useClickOutside(() => {
    onClose();
  }, clickOutsideClassList);

  return (
    <div className={`${className}`} style={style}>
      <BlockPicker
        color={color}
        onChange={(color: IColor) => {
          setColor(color.hex);
          onSelectColor(color.hex);
        }}
      />
    </div>
  );
}
