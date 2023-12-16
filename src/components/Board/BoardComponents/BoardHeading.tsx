import { MouseEventHandler } from "react";
import { useBoard } from "../../../context/BoardContext";
import { useNavbar } from "../../../context/NavbarContext";
import { useViewportWidth } from "../../../hooks/useViewportWidth";
import { Button } from "../../Button";
import Icons from "../../Icons";
import { KebabMenu } from "../../KebabMenu";
import { ConfirmationModal } from "../../ConfirmationModal";

export function BoardHeading() {
  return (
    <div className="bg-elements py-6 px-8 border-b-2 max-md:py-4 max-md:px-4 max-md:gap-4 border-lines flex justify-center items-center gap-x-6">
      <HeadingTitle />
      <HeadingButtons />
    </div>
  );
}
function HeadingTitle() {
  const { boardData } = useBoard();
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
        {boardData?.name}
        {screenType === "desktop" || <Icons iconType="arrowDown" />}
      </h1>
    </div>
  );
}
function HeadingButtons() {
  const { screenType } = useViewportWidth();
  const { boardData, dispatch, showBoardDeleteConfirmation } = useBoard();

  const handleAction: MouseEventHandler = (e) => {
    const actionType = (e.target as HTMLButtonElement).dataset.action;

    switch (actionType) {
      case "delete":
        dispatch({ type: "form/delete/board/confirmation" });
        break;
      case "edit":
        dispatch({ type: "form/edit/board" });
        break;
      default:
        throw new Error("Invalid action type for kebab menu on board header");
    }
  };

  return (
    <>
      {showBoardDeleteConfirmation && <ConfirmationDeleteBoardModal />}
      <Button
        buttonType="primary"
        disabled={!boardData}
        className="max-md:py-3"
        onClick={() => dispatch({ type: "form/create/task" })}
      >
        {screenType === "desktop" ? (
          "+ Add New Task"
        ) : (
          <>
            <Icons iconType="addTaskMobile" className="fill-white" />
          </>
        )}
      </Button>
      <KebabMenu>
        <button
          className="text-secondary cursor-pointer hover:text-primary"
          data-action={"edit"}
          onClick={handleAction}
        >
          Edit Board
        </button>
        <button
          className="text-red cursor-pointer hover:text-redhover"
          data-action={"delete"}
          onClick={handleAction}
        >
          Delete Board
        </button>
      </KebabMenu>
    </>
  );
}

function ConfirmationDeleteBoardModal() {
  const { dispatch, boardData } = useBoard();
  const handleReject = () =>
    dispatch({ type: "form/delete/board", payload: false });

  const handleAccept = () =>
    dispatch({ type: "form/delete/board", payload: true });
  return (
    <ConfirmationModal
      headingText="Delete this board?"
      paragraphText={`Are you sure you want to delete the '${boardData?.name}' task and its substasks? This action cannot be reversed`}
      onAccept={handleAccept}
      onReject={handleReject}
    />
  );
}
