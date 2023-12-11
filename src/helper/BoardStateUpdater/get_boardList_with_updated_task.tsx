import {
  BoardColumnType,
  BoardData,
  BoardTask,
} from "../../types/generalTypes";

//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";

type locationDependenciesParams = {
  page: number;
  newColumnName: string;
  boardDataAll: BoardData[];
  initialColumn: number;
};

export function get_boardList_with_updated_task({
  locationDependencies: { page, newColumnName, initialColumn, boardDataAll },
  value: newTask,
}: {
  locationDependencies: locationDependenciesParams;
  value: BoardTask;
}) {
  const updatedBoard = cloneDeep(boardDataAll);

  const newColumn: number = updatedBoard[page].columns.findIndex(
    (column: BoardColumnType) => column.name === newColumnName
  );

  // 1. perform insertion at new column and deletion at initial column if the task has different column values.
  if (newColumn !== initialColumn) {
    // 1.1 Remove previous task element.
    updatedBoard[page].columns[initialColumn].tasks = updatedBoard[
      page
    ].columns[initialColumn].tasks.filter(
      (task: BoardTask) => task.id !== newTask.id
    );

    // 1.2 Add new task element.
    updatedBoard[page].columns[newColumn].tasks.push(newTask);
  } else {
    // 2. Perform a reduce operation to replace the old task with the new task object.
    const newTaskList: BoardTask[] = updatedBoard[page].columns[
      newColumn
    ].tasks.reduce((newList: BoardTask[], current: BoardTask) => {
      return [...newList, current.id === newTask.id ? newTask : current];
    }, []);

    updatedBoard[page].columns[newColumn].tasks = newTaskList;
  }

  return updatedBoard;
}

/*
1. Move columns -> deletion / insertion

*/
