export function BoardError() {
  return (
    <div className="w-full h-full grid place-items-center px-12 bg-bg">
      <div className="flex items-center justify-center gap-8 flex-col">
        <p className="text-secondary font-bold text-lg  text-center">
          There was a problem when loading the boards. <br />
          Please try again in a few moments
        </p>
      </div>
    </div>
  );
}
