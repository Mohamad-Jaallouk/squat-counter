import { ReactNode } from "react";
// import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function Card({
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
    <div className="relative bg-red-500">
      {/* <div className="flex items-center justify-center pb-10 ">{demo}</div> */}
      <div className="flex items-center justify-center pb-10">{demo}</div>

      <h2 className="font-display text-xl md:text-3xl md:font-normal">
        <Balancer>{title}</Balancer>
      </h2>
      <div className="flex h-24 items-center justify-center">{demo2}</div>
    </div>
  );
}