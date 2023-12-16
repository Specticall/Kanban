import { ReactNode, Dispatch } from "react";

export interface ChildrenProp {
  children: ReactNode;
}

export type StateSetter<T> = Dispatch<React.SetStateAction<T>>;

export type EventHandler<T> = (e?: T) => void;

export type BoardSubtask = {
  title: string;
  isCompleted: boolean;
  id: string;
};

export type BoardTask = {
  title: string;
  description: string;
  status: string;
  subtasks: BoardSubtask[];
  id: string;
};

export type BoardColumnType = {
  name: string;
  id: string;
  color: string;
  tasks: BoardTask[];
};

export type BoardData = {
  name: string;
  columns: BoardColumnType[];
};
export type ErrorMessage = string;
