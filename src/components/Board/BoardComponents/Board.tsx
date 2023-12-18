import { useViewportWidth } from "../../../hooks/useViewportWidth";
import Icons from "../../Icons";
import { BoardHeading } from "./BoardHeading";
import { BoardContent } from "./BoardContent";
import { useNavbar } from "../../../context/NavbarContext";
import { TaskForm } from "./TaskForm";
import { formTypeProp, useBoard } from "../../../context/BoardContext";
import { BoardForm } from "./BoardForm";
import { BoardData, BoardTask } from "../../../types/generalTypes";

export type TaskFormProps = {
  // wtf is this tho
  formType: {
    [K in formTypeProp]: K extends `${string}/task` ? K : never;
  }[formTypeProp];
  formData: BoardTask | undefined;
};

export type BoardFormProps = {
  formType: {
    [K in formTypeProp]: K extends `${string}/board${string}` ? K : never;
  }[formTypeProp];
  formData: BoardData | undefined;
};

export default function Board() {
  const { formType, formData } = useBoard();
  const formValues = { formType, formData };

  return (
    <main className="h-full flex flex-col relative overflow-hidden max-h-screen">
      <ShowSidebar />
      {formType !== "none" && <BoardFormModal {...formValues} />}
      <BoardHeading />
      <BoardContent />
    </main>
  );
}

type TBoardFormModal = {
  formType: formTypeProp;
  formData: BoardData | BoardTask | undefined;
};

function BoardFormModal({ formType, formData }: TBoardFormModal) {
  if (formType === "create/task" || formType == "edit/task") {
    return <TaskForm formType={formType} formData={formData as BoardTask} />;
  }

  if (
    formType === "edit/board" ||
    formType === "create/board" ||
    formType === "edit/board/new-column"
  ) {
    return <BoardForm formType={formType} formData={formData as BoardData} />;
  }
}

function ShowSidebar() {
  const { screenType } = useViewportWidth();
  const { toggleSidebar, showSidebar } = useNavbar();

  if (showSidebar || screenType !== "desktop") return;

  return (
    <div
      className="absolute left-0 bottom-[3%] group cursor-pointer"
      onClick={() => toggleSidebar()}
    >
      <div className="bg-purple p-5 pl-3 rounded-tr-[6.25rem] rounded-br-[6.25rem] group-hover:bg-purplehover">
        <Icons iconType="showSidebar" className="fill-white" />
      </div>
    </div>
  );
}
