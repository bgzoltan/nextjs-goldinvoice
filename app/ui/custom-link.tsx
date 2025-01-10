import Link from "next/link";
import { useState } from "react";

export default function CustomLink({
  href,
  linkType = "primary",
  description,
  children,
}: {
  href: string;
  linkType: string;
  description?: string;
  children: React.ReactNode;
}) {
  const [isShowDescription, setIsShowDescription] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsShowDescription(true)}
      onMouseLeave={() => setIsShowDescription(false)}
      className="relative flex flex-col items-center justify-center"
    >
      <Link
        href={href}
        className={`flex items-center h-10 rounded-lg p-3 m-[2px] text-sm font-medium transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
          linkType === "primary"
            ? "text-white bg-green-600 hover:bg-green-800  focus-visible:outline-green-800"
            : "text-black bg-gray-200 hover:bg-gray-400  focus-visible:outline-gray-400"
        } `}
      >
        {children}
      </Link>
      {isShowDescription && (
        <div className="flex justify-center absolute w-16 top-[-12px] left-[-0] rounded-sm p-[2px] text-[10px] bg-slate-500 text-white z-50">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}
