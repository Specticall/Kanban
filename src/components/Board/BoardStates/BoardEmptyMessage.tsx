import { Button } from "../../Button";

export function BoardEmptyMessage() {
  return (
    <div className="w-full h-full grid place-items-center px-12 bg-bg">
      <div className="flex items-center justify-center gap-8 flex-col">
        <p className="text-secondary font-bold text-lg  text-center">
          This board is empty. Create a new column to get started.
        </p>
        <Button buttonType="primary">+ Add New Column</Button>
      </div>
    </div>
  );
}
