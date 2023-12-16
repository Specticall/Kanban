//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";
import { BoardData } from "../../types/generalTypes";

export function get_boardList_with_deleted_board({
  dependencies: { boardDataAll, page },
}: {
  dependencies: { boardDataAll: BoardData[] | []; page: number };
}) {
  const updatedBoard = cloneDeep(boardDataAll);
  updatedBoard.splice(page, 1);
  return updatedBoard;
}
