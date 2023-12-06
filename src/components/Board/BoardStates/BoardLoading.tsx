import { Loader } from "../../Loader";

// LOADERS / EMPTY MSG ============================
export function BoardLoading() {
  return (
    <div className="w-full h-full grid place-items-center px-12 bg-bg">
      <Loader />
    </div>
  );
}
