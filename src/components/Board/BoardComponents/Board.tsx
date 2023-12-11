import { useViewportWidth } from "../../../hooks/useViewportWidth";
import Icons from "../../Icons";
import { BoardHeading } from "./BoardHeading";
import { BoardContent } from "./BoardContent";
import { useNavbar } from "../../../context/NavbarContext";
import { TaskForm } from "./TaskForm";
import { useBoard } from "../../../context/BoardContext";

export default function Board() {
  const { formType, formTaskData } = useBoard();

  return (
    <main className="h-full flex flex-col relative overflow-hidden max-h-screen">
      <ShowSidebar />
      {formType === "none" || (
        <TaskForm formType={formType} formData={formTaskData} />
      )}
      <BoardHeading />
      <BoardContent />
    </main>
  );
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
