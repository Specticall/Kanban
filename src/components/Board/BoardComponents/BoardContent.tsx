import { useState } from "react";
import { useHome } from "../../../context/HomeContext";
import {
  BoardColumnType,
  BoardSubtask,
  BoardTask,
} from "../../../types/generalTypes";
import { useDrag } from "../../../hooks/useDrag";
import { BoardLoading } from "../BoardStates/BoardLoading";
import { BoardEmptyMessage } from "../BoardStates/BoardEmptyMessage";
import { BoardError } from "../BoardStates/BoardError";
import PopupLayout from "../../PopupLayout";
import { TaskDetails } from "./TaskDetails";

export function BoardContent() {
  const { status, boardData } = useHome();

  // popup-modal is the class of the element that gets ignored / input reject
  const boardElementRef = useDrag("popup-modal");

  if (status === "loading") return <BoardLoading />;
  if (status === "error") return <BoardError />;
  if (!boardData) return <BoardEmptyMessage />;

  // NOTE : the extra + 1 column is used for the add new column button
  const columnAmount = boardData.columns.length + 1;

  return (
    <div className="bg-bg h-full overflow-scroll p-6 " ref={boardElementRef}>
      <div
        className={`grid min-h-full w-fit overflow-visible gap-6 content-start pb-6 pr-6`}
        style={{
          gridTemplateColumns: `repeat(${columnAmount}, 17.5rem)`,
        }}
      >
        {boardData.columns.map((columnData: BoardColumnType, i) => {
          const key = `${columnData.name}${columnData.tasks}${i}`;
          return <BoardColumns key={key} {...columnData} column={i} />;
        })}
        <NewBoardButton />
      </div>
    </div>
  );
}
function NewBoardButton() {
  return (
    <div className="w-[17.5rem] mt-10 grid place-items-center bg-gradient-to-b from-elementstransparent to-bg rounded-[0.375rem] min-h-[40rem]">
      <p className="text-xl text-secondary font-bold">+ New Column</p>
    </div>
  );
}
function BoardColumns({
  name,
  tasks,
  column,
}: BoardColumnType & { column: number }) {
  return (
    <div className="w-[17.5rem]">
      <h2 className="mb-6 tracking-widest text-sm font-bold text-secondary">
        {name.toLocaleUpperCase()} ({tasks.length})
      </h2>
      <div className="grid gap-y-5">
        {tasks.map((task: BoardTask) => {
          return (
            <BoardItems
              column={column}
              boardData={task}
              key={`${task.title}${task.description}`}
            />
          );
        })}
      </div>
    </div>
  );
}
function BoardItems({
  boardData,
  column,
}: {
  boardData: BoardTask;
  column: number;
}) {
  const { title, subtasks } = boardData;
  const [showDetails, setShowDetails] = useState(false);

  const completedSubtasks: number = subtasks.reduce(
    (result: number, current: BoardSubtask) => {
      return current.isCompleted ? result + 1 : result;
    },
    0
  );

  const handleClick = () => {
    setShowDetails((current) => !current);
  };

  return (
    <>
      {showDetails && (
        <PopupLayout onClose={handleClick}>
          <TaskDetails {...boardData} column={column} />
        </PopupLayout>
      )}
      <div
        className="bg-elements px-4 py-6 rounded-lg shadow-item cursor-pointer group select-none"
        onClick={handleClick}
      >
        <h3 className="text-md font-bold text-primary group-hover:text-purple">
          {title}
        </h3>
        <p className="text-sm font-bold text-secondary mt-2">
          {completedSubtasks} of {subtasks.length} substasks
        </p>
      </div>
    </>
  );
}
