export function removeElementFromArray<T>(arr: T[], index: number) {
  arr.splice(index, 1);
  return arr;
}

export function capitalize(str: string): string {
  return `${str[0].toUpperCase()}${str.slice(1)}`;
}

// export function findTask(boardData: BoardData | undefined, taskId: string) {
//   if (!boardData) return null;

//   const traverseArray = (
//     data: BoardColumnType[] | BoardTask[] | BoardTask,
//     taskId: string
//   ): BoardTask | null => {
//     if (!Array.isArray(data) && data.id === taskId) return data;

//     if (!Array.isArray(data)) return null;

//     for (const item of data) {
//       if (item.tasks) {
//         console.log("a");
//         const value = traverseArray(item.tasks, taskId);
//         if (value?.id === taskId) return value;
//       }
//       if (item.id) {
//         const value = traverseArray(item, taskId);
//         if (value?.id === taskId) return value;
//       }
//     }

//     return null;
//   };

//   return traverseArray(boardData.columns, taskId);
// }

/*

  [ { [ { } { } ] }, { }, { } ]
    {
      "name": "Marketing Plan",
      "columns": [
        {
          "name": "Todo",
          "tasks": [
            {
              "id": "taskid-18",
              "title": "Plan Product Hunt launch",
              "description": "",
              "status": "Todo",
              "subtasks": [
                {
                  "id": "taskid-18-1",
                  "title": "Find hunter",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-2",
                  "title": "Gather assets",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-3",
                  "title": "Draft product page",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-4",
                  "title": "Notify customers",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-5",
                  "title": "Notify network",
                  "isCompleted": false
                },
                {
                  "id": "taskid-18-6",
                  "title": "Launch!",
                  "isCompleted": false
                }
              ]
            },
            {
              "id": "taskid-19",
              "title": "Share on Show HN",
              "description": "",
              "status": "",
              "subtasks": [
                {
                  "id": "taskid-19-1",
                  "title": "Draft out HN post",
                  "isCompleted": false
                },
                {
                  "id": "taskid-19-2",
                  "title": "Get feedback and refine",
                  "isCompleted": false
                },
                {
                  "id": "taskid-19-3",
                  "title": "Publish post",
                  "isCompleted": false
                }
              ]
            },
*/
