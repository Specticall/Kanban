import { BoardData, BoardSubtask } from "../../types/generalTypes";

//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";

type updateSubtaskDependencies = {
  boardDataAll: BoardData[];
  page: number;
  column: number;
  taskId: string;
  subtaskId: string;
};

type updateSubtaskContent = {
  value: string | boolean;
  key: Exclude<keyof BoardSubtask, "id">;
};

type updateSubtaskParams = {
  locationDependencies: updateSubtaskDependencies;
  newContent: updateSubtaskContent;
};
/**
 * Returns the board array with an updated subtask field.
 *
 * @param locationDependencies Where does data needs board needs to be updated
 * @param newContent : key, value pairs that represent the new data
 * @returns board data
 */
export const get_boardList_with_modified_subtask = ({
  locationDependencies: { boardDataAll, page, column, taskId, subtaskId },
  newContent: { value, key },
}: updateSubtaskParams): BoardData[] => {
  // find the taskIndex
  const taskIndex: number = boardDataAll[page].columns[column].tasks.findIndex(
    (task) => task.id === taskId
  );

  if (taskIndex === -1)
    throw new Error("Update subtask : task Index not found");

  // find the subtaskIndex
  const subtaskIndex: number = boardDataAll[page].columns[column].tasks[
    taskIndex
  ].subtasks.findIndex((subtask) => subtask.id === subtaskId);

  if (subtaskIndex === -1)
    throw new Error("Update subtask : subtask Index not found");

  // Create a deep clone of the updatedBoard data
  const updatedBoard = cloneDeep(boardDataAll);

  // Mutate the cloned object based on the given parameters
  (
    updatedBoard[page].columns[column].tasks[taskIndex].subtasks[
      subtaskIndex
    ] as Record<string, string | boolean>
  )[key] = value;

  return updatedBoard;
};
