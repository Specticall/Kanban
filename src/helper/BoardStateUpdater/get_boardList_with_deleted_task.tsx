import { BoardData } from "../../types/generalTypes";

//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";

type locationDependenciesParams = {
  page: number;
  taskId: string;
  column: number;
  boardDataAll: BoardData[];
};

export function get_boardList_with_deleted_task({
  page,
  taskId,
  column,
  boardDataAll,
}: locationDependenciesParams) {
  // Find the index to the task that wants to be moved.
  const targetTaskIndex: number = boardDataAll[page].columns[
    column
  ].tasks.findIndex((task) => task.id === taskId);

  const updatedBoard = cloneDeep(boardDataAll);

  updatedBoard[page].columns[column].tasks.splice(targetTaskIndex, 1);

  return updatedBoard;
}
