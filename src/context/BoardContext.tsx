import { createContext, useContext, useReducer, useEffect } from "react";
import { BoardData, BoardTask, ChildrenProp } from "../types/generalTypes";
import { BASE_URL } from "../config/config";
import { ErrorMessage } from "../types/generalTypes";

import { get_boardList_with_modified_subtask } from "../helper/BoardStateUpdater/get_boardList_with_modified_subtask";
import { get_boardList_with_swapped_category } from "../helper/BoardStateUpdater/get_boardList_with_swapped_category";
import { get_boardList_with_deleted_task } from "../helper/BoardStateUpdater/get_boardList_with_deleted_task";
import { get_boardList_with_updated_task } from "../helper/BoardStateUpdater/get_boardList_with_updated_task";

/*
Types for the Board context
*/
type PageDestination = number;

export type formTypeProp =
  | "create/task"
  | "edit/task"
  | "create/board"
  | "none";

// Context output type
interface BoardContextValues extends BoardStates {
  switchToPage: (pageDestination: PageDestination) => void;
  dispatch: ({ type, payload }: BoardAction) => void;
  formType: formTypeProp;
}

// Reducer state type
interface BoardStates {
  boardDataAll: BoardData[] | [];
  boardData: BoardData | undefined;
  status: "loading" | "ready" | "error";
  boardPage: number;
  formType: formTypeProp;
  formTaskData: BoardTask | undefined;
  formTaskColumn: number;
}

type updateSubtaskProps = { column: number; taskId: string; subtaskId: string };

// Reducer action type
type BoardAction =
  | { type: "data/load"; payload: BoardData[] }
  | { type: "data/error"; payload: ErrorMessage }
  | { type: "page/switch"; payload: PageDestination }
  | {
      type: "board/task/subtask/toggle";
      payload: { locationDependencies: updateSubtaskProps; value: boolean };
    }
  | {
      type: "board/task/subtask/switch-status";
      payload: {
        locationDependencies: Omit<updateSubtaskProps, "subtaskId">;
        newColumnName: string;
      };
    }
  | {
      type: "board/task/delete";
      payload: { locationDependencies: Omit<updateSubtaskProps, "subtaskId"> };
    }
  | { type: "form/edit/task"; payload: { column: number; taskId: string } }
  | { type: "form/create/task"; payload?: null }
  | { type: "form/close"; payload?: null }
  | {
      type: "form/submit/task";
      payload: BoardTask;
    };

// =============================================================

const BoardContext = createContext<BoardContextValues | null>(null);

const initialState: BoardStates = {
  boardDataAll: [],
  boardData: undefined,
  status: "loading",
  boardPage: 0,
  formType: "none",
  formTaskData: undefined,
  formTaskColumn: 0,
};

function reducer(state: BoardStates, action: BoardAction): BoardStates {
  switch (action.type) {
    // TEMP : Need to make the status field functional first.
    // case "form/submit/task": {
    //   const locationDependencies = {
    //     column: state.formTaskColumn,
    //     boardDataAll: state.boardDataAll,
    //     page: state.boardPage,
    //   };

    //   const updatedBoard = get_boardList_with_updated_task({
    //     locationDependencies,
    //     value: action.payload,
    //   });

    //   console.log(updatedBoard);
    //   return {
    //     ...state,
    //     // formType: "none",
    //     // boardDataAll: updatedBoard,
    //     // boardData: updatedBoard[state.boardPage],
    //   };
    // }
    case "form/create/task": {
      return {
        ...state,
        formType: "create/task",
      };
    }
    case "form/edit/task": {
      const { column, taskId } = action.payload;
      return {
        ...state,
        formType: "edit/task",
        formTaskData: state.boardData?.columns[column].tasks.find(
          (task) => task.id === taskId
        ),
      };
    }
    case "form/close":
      return {
        ...state,
        formType: "none",
        formTaskData: undefined,
      };
    case "board/task/delete": {
      const locationDependencies = {
        ...action.payload.locationDependencies,
        boardDataAll: state.boardDataAll,
        page: state.boardPage,
      };

      const updatedBoard =
        get_boardList_with_deleted_task(locationDependencies);

      return {
        ...state,
        boardDataAll: updatedBoard,
        boardData: updatedBoard[state.boardPage],
      };
    }
    case "board/task/subtask/switch-status": {
      const locationDependencies = {
        ...action.payload.locationDependencies,
        boardDataAll: state.boardDataAll,
        page: state.boardPage,
      };

      const updatedBoard = get_boardList_with_swapped_category({
        locationDependencies,
        newLocation: { newColumnName: action.payload.newColumnName },
      });

      return {
        ...state,
        boardDataAll: updatedBoard,
        boardData: updatedBoard[state.boardPage],
      };
    }
    case "board/task/subtask/toggle": {
      // Retrieve needed dependecies from payload and current state
      const locationDependencies = {
        ...action.payload.locationDependencies,
        boardDataAll: state.boardDataAll,
        page: state.boardPage,
      };

      // Create a deep cloned BoardData[] with modified subtask field
      const updatedBoard = get_boardList_with_modified_subtask({
        locationDependencies,
        newContent: { key: "isCompleted", value: action.payload.value },
      });

      return {
        ...state,
        boardDataAll: updatedBoard,
        boardData: updatedBoard[state.boardPage],
      };
    }
    case "page/switch":
      return {
        ...state,
        boardPage: action.payload,
        boardData: state.boardDataAll[action.payload],
      };
    case "data/load":
      return {
        ...state,
        status: "ready",
        boardDataAll: action.payload,
        boardData: action.payload[state.boardPage],
      };
    case "data/error":
      return { ...state, status: "error", boardDataAll: [] };
    default:
      throw new Error("BoardContext : reducer action not selected / not found");
  }
}

export function BoardProvider({ children }: ChildrenProp) {
  const [
    { boardData, status, boardDataAll, boardPage, formType, formTaskData },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Fetch board's data on load.
  useEffect(() => {
    const getBoards = async (): Promise<BoardData | void> => {
      try {
        const response = await fetch(`${BASE_URL}/boards`);

        if (!response.ok)
          throw new Error("Something went wrong while fetching");

        const data: BoardData[] = await response.json();

        dispatch({ type: "data/load", payload: data });
      } catch (error) {
        const errorMessage: ErrorMessage =
          error instanceof Error ? error.message : "An Error Occured";
        dispatch({ type: "data/error", payload: errorMessage });
      }
    };
    getBoards();
  }, []);

  // Switch page
  const switchToPage = (pageDestination: PageDestination): void => {
    dispatch({ type: "page/switch", payload: pageDestination });
  };

  return (
    <BoardContext.Provider
      value={{
        boardData,
        formTaskData,
        formType,
        status,
        boardDataAll,
        boardPage,
        switchToPage,
        dispatch,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context)
    throw new Error("App context must be use inside its parent's scope!");
  return context;
}
