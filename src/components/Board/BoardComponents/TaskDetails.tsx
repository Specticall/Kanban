import { useState, MouseEventHandler } from "react";
import { useBoard } from "../../../context/BoardContext";
import { BoardSubtask, BoardTask } from "../../../types/generalTypes";
import { CheckBox } from "../../CheckBox";
import { DropDown } from "../../DropDown";
import { KebabMenu } from "../../KebabMenu";

type subtaskProps = BoardSubtask & { column: number; taskId: string };

export function TaskDetails({
  title,
  status,
  subtasks,
  description,
  column,
  id: taskId,
}: BoardTask & { column: number }) {
  const SubtaskListProps = { subtasks, column, taskId, title };
  const SubtaskHeadingProps = { title, description, column, taskId };
  const SubtaskStatusProps = { column, taskId, status };

  return (
    <div className="bg-elements p-8 mx-4 max-w-[31rem] rounded-lg">
      <SubtaskHeading {...SubtaskHeadingProps} />
      <SubtaskList {...SubtaskListProps} />
      <SubtaskStatus {...SubtaskStatusProps} />
    </div>
  );
}

function SubtaskHeading({
  title,
  description,
  column,
  taskId,
}: {
  title: string;
  description: string;
  column: number;
  taskId: string;
}) {
  const { dispatch } = useBoard();
  const handleAction: MouseEventHandler = (e) => {
    const actionType = (e.target as HTMLButtonElement).dataset.action;

    switch (actionType) {
      case "delete":
        dispatch({
          type: "board/task/delete",
          payload: { locationDependencies: { column, taskId } },
        });
        break;
      case "edit":
        break;
      default:
        throw new Error("Invalid action type for kebab menu");
    }
  };

  return (
    <>
      <header className="mb-6 flex justify-between items-center gap-8">
        <h3 className="font-bold text-lg text-primary">{title}</h3>
        <div>
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
        </div>
      </header>
      <p className="text-pg text-secondary leading-6 mb-6">{description}</p>
    </>
  );
}

function SubtaskList({
  subtasks,
  column,
  taskId,
  title,
}: {
  subtasks: BoardSubtask[];
  column: number;
  taskId: string;
  title: string;
}) {
  const completedSubtask = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  return (
    <>
      <p className="text-secondary text-pg mb-4">
        Subtasks ({completedSubtask} of {subtasks.length})
      </p>
      <div className="grid gap-2 mb-6">
        {subtasks.map((subtask) => {
          return (
            <Subtask
              key={`${subtask.title}-${title}`}
              {...subtask}
              column={column}
              taskId={taskId}
            />
          );
        })}
      </div>
    </>
  );
}

function SubtaskStatus({
  column,
  taskId,
  status,
}: {
  column: number;
  taskId: string;
  status: string;
}) {
  const { boardData, dispatch } = useBoard();

  // TEMP
  if (!boardData)
    throw new Error(
      "Board data from SubtaskStatus was not loaded when loading test details"
    );

  const optionList = boardData.columns.map((current) => current.name);

  return (
    <>
      <p className="text-secondary text-pg mb-4">Current Status</p>
      <DropDown
        value={status || optionList[column]}
        onSelect={(selected) => {
          dispatch({
            type: "board/task/subtask/switch-status",
            payload: {
              locationDependencies: { column, taskId },
              newColumnName: selected,
            },
          });
        }}
        optionList={optionList}
      />
    </>
  );
}

function Subtask({
  isCompleted,
  title,
  id: subtaskId,
  column,
  taskId,
}: subtaskProps) {
  const { dispatch } = useBoard();
  const [completed, setCompleted] = useState(() => isCompleted);

  // Identify where the board is located. Used to change the props of the main object.
  const boardIdentification = { subtaskId, taskId, column };

  const handleClick = () => {
    setCompleted((current) => !current);
    dispatch({
      type: "board/task/subtask/toggle",
      payload: { locationDependencies: boardIdentification, value: !completed },
    });
  };

  return (
    <div
      className="flex gap-4 bg-bg p-3 rounded-sm items-center cursor-pointer hover:bg-purplehighlight"
      onClick={handleClick}
    >
      <CheckBox
        checked={completed}
        key={`${title}-${completed ? "open" : "close"}`}
      />
      <p
        className={`text-sm ${
          completed ? "text-secondary line-through" : "text-primary"
        }`}
      >
        {title}
      </p>
    </div>
  );
}
