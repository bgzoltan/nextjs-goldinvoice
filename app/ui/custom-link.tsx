import Link from "next/link";

export default function CustomLink({
  href,
  linkType = "primary",
  children,
}: {
  href: string;
  linkType: string;
  children: React.ReactNode;
}) {
  return (
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
  );
}
