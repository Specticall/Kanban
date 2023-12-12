//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";
import { BoardData } from "../../types/generalTypes";

export function get_boardList_with_added_board({
  dependencies: { boardDataAll },
  value,
}: {
  dependencies: { boardDataAll: BoardData[] };
  value: BoardData;
}) {
  const updatedBoard = cloneDeep(boardDataAll);
  updatedBoard.push(value);
  return updatedBoard;
}
