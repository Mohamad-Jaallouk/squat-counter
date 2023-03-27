import { ReactNode } from "react";

export default function CardTopRight({
  progressBar,
  progressAction,
}: {
  progressBar: ReactNode;
  progressAction: any;
}) {
  return (
    <div className="absolute top-0 right-0 m-2 flex w-36 flex-row items-center justify-center rounded-xl bg-black bg-opacity-30 p-2 shadow-md">
      {progressBar}
      <span className="absolute text-7xl font-bold text-white">
        {progressAction}
      </span>
    </div>
  );
}
