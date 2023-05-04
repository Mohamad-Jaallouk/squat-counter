import { ReactNode } from "react";
import Balancer from "react-wrap-balancer";
import GymIcon from "../icons/gym";

export default function Reps({
  title,
  button1,
  button2,
  button3,
  button4,
}: {
  title: string;
  button1: ReactNode;
  button2: ReactNode;
  button3: ReactNode;
  button4: ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center justify-start">
      <div className="pb-10">
        <GymIcon />
      </div>
      <h2 className="font-display mb-10 text-3xl md:text-4xl md:font-normal">
        <Balancer>{title}</Balancer>
      </h2>

      <div className="flex flex-row items-center justify-start">
        <div className="group m-3 flex h-[100px] w-[100px] items-center justify-center space-x-2 rounded-full border border-black bg-black text-5xl font-bold text-white transition-colors hover:bg-white hover:text-black">
          {button1}
        </div>

        <div className="group m-3 flex h-[100px] w-[100px] items-center justify-center space-x-2 rounded-full border border-black bg-black text-5xl font-bold text-white transition-colors hover:bg-white hover:text-black">
          {button2}
        </div>

        <div className="group m-3 flex h-[100px] w-[100px] items-center justify-center space-x-2 rounded-full border border-black bg-black text-5xl font-bold text-white transition-colors hover:bg-white hover:text-black">
          {button3}
        </div>

        <div className="group m-3 flex h-[100px] w-[100px] items-center justify-center space-x-2 rounded-full border border-black bg-black text-5xl font-bold text-white transition-colors hover:bg-white hover:text-black">
          {button4}
        </div>
      </div>
    </div>
  );
}
