import { MouseEventHandler } from "react";
import { ChildrenProp } from "../types/generalTypes";

interface PopupLayoutProps extends ChildrenProp {
  onClose: () => void;
}

export default function PopupLayout({ children, onClose }: PopupLayoutProps) {
  const handleClick: MouseEventHandler = (e) => {
    if ((e.target as HTMLDivElement).closest(".popup-modal")) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-20 grid place-items-center"
      onClick={handleClick}
    >
      <div className="popup-modal">{children}</div>
    </div>
  );
}
