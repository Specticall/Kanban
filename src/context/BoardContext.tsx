import { createContext, useContext, useReducer, useEffect } from "react";
import { BoardData, BoardTask, ChildrenProp } from "../types/generalTypes";
import { BASE_URL } from "../config/config";
import { ErrorMessage } from "../types/generalTypes";

import { get_boardList_with_modified_subtask } from "../helper/BoardStateUpdater/get_boardList_with_modified_subtask";
import { get_boardList_with_swapped_category } from "../helper/BoardStateUpdater/get_boardList_with_swapped_category";
import { get_boardList_with_deleted_task } from "../helper/BoardStateUpdater/get_boardList_with_deleted_task";
import { get_boardList_with_updated_task } from "../helper/BoardStateUpdater/get_boardList_with_updated_task";
import { get_boardList_with_added_board } from "../helper/BoardStateUpdater/get_boardList_with_added_board";
import { get_boardList_with_updated_boards } from "../helper/BoardStateUpdater/get_boardList_with_updated_boards";
import { get_boardList_with_deleted_board } from "../helper/BoardStateUpdater/get_boardList_with_deleted_board";
import { get_boardList_with_updated_color } from "../helper/BoardStateUpdater/get_boardList_with_updated_color";

/*
Types for the Board context
*/
type PageDestination = number;

export type formTypeProp =
  | "create/task"
  | "edit/task"
  | "create/board"
  | "edit/board"
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
  formData: BoardTask | BoardData | undefined;
  formInitialColumn: number;
  showBoardDeleteConfirmation: boolean;
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
    }
  | {
      type: "form/create/board";
      payload?: null;
    }
  | {
      type: "form/submit/add/board";
      payload: BoardData;
    }
  | {
      type: "form/submit/edit/board";
      payload: BoardData;
    }
  | {
      type: "form/edit/board";
      payload?: null;
    }
  | {
      type: "form/delete/board";
      payload: boolean;
    }
  | {
      type: "form/delete/board/confirmation";
      payload?: null;
    }
  | {
      type: "column/change-color";
      payload: { newColor: string; column: number };
    };

// =============================================================

const BoardContext = createContext<BoardContextValues | null>(null);

const initialState: BoardStates = {
  boardDataAll: [],
  boardData: undefined,
  status: "loading",
  boardPage: 0,
  formType: "none",
  formData: undefined,
  formInitialColumn: 0,
  showBoardDeleteConfirmation: false,
};

function reducer(state: BoardStates, action: BoardAction): BoardStates {
  switch (action.type) {
    case "column/change-color": {
      const updatedBoard = get_boardList_with_updated_color({
        dependencies: {
          boardDataAll: state.boardDataAll,
          page: state.boardPage,
          column: action.payload.column,
        },
        value: action.payload.newColor,
      });

      // console.log(updatedBoard);

      return {
        ...state,
        boardDataAll: updatedBoard,
        boardData: updatedBoard[state.boardPage],
      };
    }
    case "form/delete/board/confirmation": {
      return {
        ...state,
        showBoardDeleteConfirmation: true,
      };
    }
    case "form/delete/board": {
      const updatedBoard = get_boardList_with_deleted_board({
        dependencies: {
          boardDataAll: state.boardDataAll,
          page: state.boardPage,
        },
      });

      return {
        ...state,
        showBoardDeleteConfirmation: false,
        boardDataAll: action.payload ? updatedBoard : state.boardDataAll,
        boardPage: 0,
        boardData: updatedBoard[0],
      };
    }
    case "form/submit/add/board": {
      const updatedBoard = get_boardList_with_added_board({
        dependencies: { boardDataAll: state.boardDataAll },
        value: action.payload,
      });

      return {
        ...state,
        boardDataAll: updatedBoard,
        boardData: updatedBoard[updatedBoard.length - 1],
        boardPage: updatedBoard.length - 1,
        formType: "none",
      };
    }
    case "form/submit/edit/board": {
      const updatedBoard = get_boardList_with_updated_boards({
        dependencies: {
          boardDataAll: state.boardDataAll,
          page: state.boardPage,
        },
        value: action.payload,
      });

      return {
        ...state,
        boardDataAll: updatedBoard,
        boardData: updatedBoard[state.boardPage],
        formType: "none",
      };
    }
    case "form/submit/task": {
      const locationDependencies = {
        newColumnName: action.payload.status,
        boardDataAll: state.boardDataAll,
        page: state.boardPage,
        initialColumn: state.formInitialColumn,
      };

      const updatedBoard = get_boardList_with_updated_task({
        locationDependencies,
        value: action.payload,
      });

      return {
        ...state,
        formType: "none",
        formData: undefined,
        boardDataAll: updatedBoard,
        boardData: updatedBoard[state.boardPage],
      };
    }
    case "form/edit/board":
      return {
        ...state,
        formType: "edit/board",
        formData: state.boardData,
      };
    case "form/create/board":
      return {
        ...state,
        formType: "create/board",
      };
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
        formData: state.boardData?.columns[column].tasks.find(
          (task) => task.id === taskId
        ),
        formInitialColumn: column,
      };
    }
    case "form/close":
      return {
        ...state,
        formType: "none",
        formData: undefined,
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
    {
      boardData,
      status,
      boardDataAll,
      boardPage,
      formType,
      formData,
      formInitialColumn,
      showBoardDeleteConfirmation,
    },
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
        formInitialColumn,
        boardData,
        formData,
        formType,
        status,
        boardDataAll,
        boardPage,
        switchToPage,
        dispatch,
        showBoardDeleteConfirmation,
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
