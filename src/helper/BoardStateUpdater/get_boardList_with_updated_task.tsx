import { BoardData, BoardTask } from "../../types/generalTypes";

//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";

type locationDependenciesParams = {
  page: number;
  column: number;
  boardDataAll: BoardData[];
};

export function get_boardList_with_updated_task({
  locationDependencies: { page, column, boardDataAll },
  value: newTask,
}: {
  locationDependencies: locationDependenciesParams;
  value: BoardTask;
}) {
  const updatedBoard = cloneDeep(boardDataAll);

  const newTaskList: BoardTask[] = updatedBoard[page].columns[
    column
  ].tasks.reduce((newList: BoardTask[], current: BoardTask) => {
    return current.id === newTask.id ? newTask : current;
  }, []);

  console.log(newTaskList);
  // updatedBoard[page].columns[column].tasks[targetTaskIndex] = newTask;

  return updatedBoard;
}
