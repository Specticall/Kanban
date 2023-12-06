import { createContext, useContext, useReducer, useEffect } from "react";
import { BoardData, ChildrenProp } from "../types/generalTypes";
import { BASE_URL } from "../config/config";
import { ErrorMessage } from "../types/generalTypes";

import { get_boardList_with_modified_subtask } from "../helper/BoardStateUpdater/get_boardList_with_modified_subtask";
import { get_boardList_with_swapped_category } from "../helper/BoardStateUpdater/get_boardList_with_swapped_category";

/*
Types for the home context
*/
type PageDestination = number;

// Context output type
interface HomeContextValues extends HomeStates {
  switchToPage: (pageDestination: PageDestination) => void;
  dispatch: ({ type, payload }: HomeAction) => void;
}

// Reducer state type
interface HomeStates {
  boardDataAll: BoardData[] | [];
  boardData: BoardData | undefined;
  status: "loading" | "ready" | "error";
  boardPage: number;
}

type updateSubtaskProps = { column: number; taskId: string; subtaskId: string };

// Reducer action type
type HomeAction =
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
    };

// =============================================================

const HomeContext = createContext<HomeContextValues | null>(null);

const initialState: HomeStates = {
  boardDataAll: [],
  boardData: undefined,
  status: "loading",
  boardPage: 0,
};

function reducer(state: HomeStates, action: HomeAction): HomeStates {
  switch (action.type) {
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
      throw new Error("HomeContext : reducer action not selected / not found");
  }
}

export function HomeProvider({ children }: ChildrenProp) {
  const [{ boardData, status, boardDataAll, boardPage }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
    <HomeContext.Provider
      value={{
        boardData,
        status,
        boardDataAll,
        boardPage,
        switchToPage,
        dispatch,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);
  if (!context)
    throw new Error("App context must be use inside its parent's scope!");
  return context;
}
