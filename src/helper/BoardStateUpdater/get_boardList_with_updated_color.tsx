import { BoardData } from "../../types/generalTypes";

//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";

export function get_boardList_with_updated_color({
  dependencies: { boardDataAll, page, column },
  value,
}: {
  dependencies: {
    boardDataAll: BoardData[] | [];
    page: number;
    column: number;
  };
  value: string;
}) {
  const updatedBoard: BoardData[] = cloneDeep(boardDataAll);
  updatedBoard[page].columns[column].color = value;

  return updatedBoard;
}
