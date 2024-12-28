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
      className={`flex items-center h-10 rounded-lg p-3 text-sm font-medium text-white transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        linkType === "primary"
          ? "bg-green-600 hover:bg-green-800  focus-visible:outline-green-800"
          : "bg-gray-400 hover:bg-gray-600  focus-visible:outline-gray-600"
      } `}
    >
      {children}
    </Link>
  );
}
