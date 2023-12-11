import { createContext, useContext, useState, MouseEventHandler } from "react";
import { ChildrenProp, StateSetter } from "../types/generalTypes";
import { useBoard } from "./BoardContext";

type BoardItemContextValues = {
  handleAcceptDeletion: () => void;
  handleRejectDeletion: () => void;
  handleAction: MouseEventHandler;
  showConfirmationModal: boolean;
  showDetails: boolean;
  setShowDetails: StateSetter<boolean>;
};

type locationDependenies = {
  column: number;
  taskId: string;
};

type BoardItemProps = ChildrenProp & {
  locationDependenies: locationDependenies;
};

const BoardItemContext = createContext<BoardItemContextValues | null>(null);

export function BoardItemProvider({
  children,
  locationDependenies: { column, taskId },
}: BoardItemProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(
    () => false
  );
  const { dispatch } = useBoard();

  const handleAcceptDeletion = () => {
    setShowConfirmationModal(false);
    dispatch({
      type: "board/task/delete",
      payload: { locationDependencies: { column, taskId } },
    });
  };

  const handleRejectDeletion = () => {
    setShowConfirmationModal(false);
  };

  const handleAction: MouseEventHandler = (e) => {
    const actionType = (e.target as HTMLButtonElement).dataset.action;

    switch (actionType) {
      case "delete":
        setShowConfirmationModal(true);
        break;
      case "edit":
        dispatch({ type: "form/edit/task", payload: { column, taskId } });
        setShowDetails(false);
        break;
      default:
        throw new Error("Invalid action type for kebab menu");
    }
  };

  return (
    <BoardItemContext.Provider
      value={{
        showDetails,
        setShowDetails,
        handleAcceptDeletion,
        handleRejectDeletion,
        showConfirmationModal,
        handleAction,
      }}
    >
      {children}
    </BoardItemContext.Provider>
  );
}

export function useBoardItem() {
  const context = useContext(BoardItemContext);
  if (!context)
    throw new Error(
      "Board item context must be used within its provider's scope!"
    );
  return context;
}
