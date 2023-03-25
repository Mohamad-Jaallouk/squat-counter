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
    <div
      className={`relative col-span-1 overflow-hidden  ${
        large ? "md:col-span-2" : ""
      }`}
    >
      {/* <div
      className={`relative col-span-1 h-full w-96 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md ${
        large ? "md:col-span-2" : ""
      }`}
    > */}
      <div className="flex items-center justify-center pb-10 text-gray-500">
        {demo}
      </div>

      <div className="mx-auto max-w-md text-center">
        <h2 className="font-display text-xl md:text-3xl md:font-normal">
          <Balancer>{title}</Balancer>
        </h2>
      </div>
      <div className="flex h-24 items-center justify-center">{demo2}</div>
    </div>
  );
}
