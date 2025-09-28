import { PropsWithChildren } from "react";

export default function Header({
  text,
  children,
}: { text: string } & PropsWithChildren) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold text-gray-800 pb-4">{text}</h2>
      {children}
      <div className="border-b-2 border-gray-200 my-6"></div>
    </div>
  );
}
