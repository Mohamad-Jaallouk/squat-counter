import { ReactNode } from "react";
// import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function Card2({
  title,
  description,
  demo,
  demo2,
  large,
}: {
  title: string;
  description: string;
  demo: ReactNode;
  demo2: ReactNode;
  large?: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center justify-start">
      {/* <div className="flex items-center justify-center pb-10 ">{demo}</div> */}
      <div className="pb-10">{demo}</div>

      <h2 className="font-display text-xl md:text-3xl md:font-normal">
        <Balancer>{title}</Balancer>
      </h2>
      <div className="p-6">{demo2}</div>
    </div>
  );
}
