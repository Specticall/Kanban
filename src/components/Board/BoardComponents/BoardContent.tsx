import { useBoard } from "../../../context/BoardContext";
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
import {
  BoardItemProvider,
  useBoardItem,
} from "../../../context/BoardItemContext";
import { ConfirmationModal } from "../../ConfirmationModal";
import { ColorPickerInput } from "../../ColorPicker";

export function BoardContent() {
  const { status, boardData } = useBoard();

  // popup-modal is the class of the element that gets ignored / input reject
  const boardElementRef = useDrag("popup-modal");

  if (status === "loading") return <BoardLoading />;
  if (status === "error") return <BoardError />;
  if (!boardData) return <BoardEmptyMessage />;

  // NOTE : the extra + 1 column is used for the add new column button
  const columnAmount = boardData.columns.length + 1;

  return (
    <div className="bg-bg h-full overflow-auto p-6 " ref={boardElementRef}>
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
  const { dispatch } = useBoard();
  const handleClick = () => {
    dispatch({ type: "form/edit/board/newColumn" });
  };

  return (
    <div
      className="w-[17.5rem] mt-10 grid place-items-center bg-gradient-to-b from-elementstransparent to-bg rounded-[0.375rem] min-h-[40rem] cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-xl text-secondary font-bold">+ New Column</p>
    </div>
  );
}
function BoardColumns({
  name,
  tasks,
  column,
  color,
}: BoardColumnType & { column: number }) {
  // const [showColorPicker, setShowColorPicker] = useState(() => false);
  const { dispatch } = useBoard();

  // const handleClickColor = () => {
  //   setShowColorPicker((current) => !current);
  // };

  const handleSelectColor = (color: string) => {
    dispatch({
      type: "column/change-color",
      payload: { newColor: color, column },
    });
  };
  return (
    <div className="w-[17.5rem]">
      <div className="mb-6 flex items-center justify-start gap-2 relative">
        <ColorPickerInput
          identifier={`color-picker-${column}`}
          onSelectColor={handleSelectColor}
          color={color}
        />
        <h2 className="tracking-widest text-sm font-bold text-secondary">
          {name.toLocaleUpperCase()} ({tasks.length})
        </h2>
      </div>
      <div className="grid gap-y-5">
        {tasks.map((task: BoardTask) => {
          return (
            <BoardItemProvider
              locationDependenies={{ column, taskId: task.id }}
              key={`${task.title}${task.description}`}
            >
              <BoardItems column={column} boardData={task} />
            </BoardItemProvider>
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
  const { showConfirmationModal, showDetails, setShowDetails } = useBoardItem();

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
      {showDetails && !showConfirmationModal && (
        <PopupLayout onClose={handleClick}>
          <TaskDetails {...boardData} column={column} />
        </PopupLayout>
      )}
      {showConfirmationModal && <ConfirmationDeleteTaskModal title={title} />}
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

function ConfirmationDeleteTaskModal({ title }: { title: string }) {
  const { handleAcceptDeletion, handleRejectDeletion } = useBoardItem();
  return (
    <ConfirmationModal
      headingText="Delete this task?"
      paragraphText={`Are you sure you want to delete the '${title}' task and its substasks? This action cannot be reversed`}
      onAccept={handleAcceptDeletion}
      onReject={handleRejectDeletion}
    />
  );
}
