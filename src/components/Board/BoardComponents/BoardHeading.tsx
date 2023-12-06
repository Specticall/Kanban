import { useHome } from "../../../context/HomeContext";
import { useNavbar } from "../../../context/NavbarContext";
import { useViewportWidth } from "../../../hooks/useViewportWidth";
import { Button } from "../../Button";
import Icons from "../../Icons";

export function BoardHeading() {
  return (
    <div className="bg-elements py-6 px-8 border-b-2 max-md:py-4 max-md:px-4 max-md:gap-4 border-lines flex justify-center items-center gap-x-6">
      <HeadingTitle />
      <HeadingButtons />
    </div>
  );
}
function HeadingTitle() {
  const { toggleSidebar } = useNavbar();
  const { screenType } = useViewportWidth();
  const onOpenNav = () => {
    if (screenType === "desktop") return;
    toggleSidebar("open");
  };
  return (
    <div
      className="flex flex-1 gap-x-3 max-md:cursor-pointer"
      onClick={onOpenNav}
    >
      <Icons iconType="logoMobile" className="md:hidden" />
      <h1 className="text-primary font-bold text-xl flex-1 max-md:text-lg flex items-center gap-x-3 ">
        Platform Launch
        {screenType === "desktop" || <Icons iconType="arrowDown" />}
      </h1>
    </div>
  );
}
function HeadingButtons() {
  const { screenType } = useViewportWidth();
  const { boardData } = useHome();
  return (
    <>
      <Button
        buttonType="primary"
        disabled={!boardData}
        className="max-md:py-3"
      >
        {screenType === "desktop" ? (
          "+ Add New Task"
        ) : (
          <>
            <Icons iconType="addTaskMobile" className="fill-white" />
          </>
        )}
      </Button>
      <Icons iconType="menu" />
    </>
  );
}
