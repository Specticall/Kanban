import { BoardData } from "../../types/generalTypes";

//@ts-expect-error : lodash clone deep import issue
import cloneDeep from "lodash.clonedeep";

export function get_boardList_with_updated_boards({
  dependencies: { boardDataAll, changedColumnIndex },
  value,
}: {
  dependencies: {
    boardDataAll: BoardData[];
    changedColumnIndex: number;
  };
  value: BoardData;
}) {
  const updatedBoard: BoardData[] = cloneDeep(boardDataAll);

  return updatedBoard.map((board, i) => {
    return changedColumnIndex === i ? { ...board, name: value } : board;
  });
}
