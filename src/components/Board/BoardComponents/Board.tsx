import { useViewportWidth } from "../../../hooks/useViewportWidth";
import Icons from "../../Icons";
import { BoardHeading } from "./BoardHeading";
import { BoardContent } from "./BoardContent";
import { useNavbar } from "../../../context/NavbarContext";
import { TaskForm } from "./TaskForm";
import { useBoard, formTypeProp } from "../../../context/BoardContext";
import { BoardForm } from "./BoardForm";
import { BoardData, BoardTask } from "../../../types/generalTypes";

export type TaskFormProps = {
  formType: "create/task" | "edit/task";
  formData: BoardTask | undefined;
};

export type BoardFormProps = {
  formType: "create/board" | "edit/board";
  formData: BoardData;
};

export default function Board() {
  const { formType, formData } = useBoard();
  // const props: TaskFormProps | BoardFormProps = { formType, formTaskData };

  return (
    <main className="h-full flex flex-col relative overflow-hidden max-h-screen">
      <ShowSidebar />
      {formType !== "none" ? (
        <BoardFormModal formType={formType} formData={formData} />
      ) : null}
      <BoardHeading />
      <BoardContent />
    </main>
  );
}

// TEMP
function BoardFormModal(props: any) {
  if (props.formType === "create/task" || props.formType === "edit/task")
    return <TaskForm {...props} />;

  if (props.formType === "create/board" || props.formType === "edit/board")
    return <BoardForm {...props} />;
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
