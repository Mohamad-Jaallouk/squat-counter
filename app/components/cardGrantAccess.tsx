import { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

export default function CardGrantAccess({
  title,
  icon,
  button,
}: {
  title: string;
  icon: ReactNode;
  button: ReactNode;
}) {
  return (
    <div className="relative flex flex-col items-center justify-start">
      <div className="pb-10">{icon}</div>

      <h2 className="font-display text-xl md:text-3xl md:font-normal">
        <Balancer>{title}</Balancer>
      </h2>

      <div className="text-l group m-6 flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black p-3 font-bold text-white transition-colors hover:bg-white hover:text-black">
        {button}
      </div>
    </div>
  );
}
