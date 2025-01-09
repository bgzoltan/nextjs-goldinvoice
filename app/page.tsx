import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { suse } from "./ui/fonts";
import CustomLink from "./ui/custom-link";

export default function Page() {
  return (
    <main className="flex items-center w-screen min-h-screen flex-col p-6">
      <div
        className={`flex ${suse.className} w-full justify-center items-center h-20 text-3xl font-bold shrink-0 rounded-lg bg-goldOrange p-4 md:h-52 white`}
      >
        Welcome to Gold Invoice
      </div>
      <div className="flex w-22">
        <CustomLink href="/login" linkType="primary">
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </CustomLink>
      </div>
    </main>
  );
}
