import { BoardData, BoardTask } from "../../types/generalTypes";

//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";
import { removeElementFromArray } from "../helper";

type locationDependenciesParams = {
  page: number;
  taskId: string;
  column: number;
  boardDataAll: BoardData[];
};

type newLocationParams = {
  newColumnName: string;
};

export function get_boardList_with_swapped_category({
  locationDependencies: { boardDataAll, page, taskId, column: oldColumnIndex },
  newLocation: { newColumnName },
}: {
  locationDependencies: locationDependenciesParams;
  newLocation: newLocationParams;
}): BoardData[] {
  // Find the index of the destination / new column
  const newColumnIndex: number = boardDataAll[page].columns.findIndex(
    (column) => {
      return column.name === newColumnName;
    }
  );

  // Find the index to the task that wants to be moved.
  const targetTaskIndex: number = boardDataAll[page].columns[
    oldColumnIndex
  ].tasks.findIndex((task) => task.id === taskId);

  // Retrieve the target task object.
  const targetTask: BoardTask =
    boardDataAll[page].columns[oldColumnIndex].tasks[targetTaskIndex];

  // Deep clone the BoardData;
  const updatedBoard: BoardData[] = cloneDeep(boardDataAll);

  // Create a new array of the old column with the removed target task from the previous array
  const removedTargetTaskList: BoardTask[] = removeElementFromArray(
    updatedBoard[page].columns[oldColumnIndex].tasks,
    targetTaskIndex
  );

  // Create a new array of the new column with the added  target task to the array
  const addedTargetTaskList: BoardTask[] = [
    ...updatedBoard[page].columns[newColumnIndex].tasks,
    { ...targetTask, status: newColumnName },
  ];

  // Replacing the old data with the new data
  updatedBoard[page].columns[oldColumnIndex].tasks = removedTargetTaskList;
  updatedBoard[page].columns[newColumnIndex].tasks = addedTargetTaskList;

  return updatedBoard;
}
