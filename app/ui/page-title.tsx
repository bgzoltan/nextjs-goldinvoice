import { suse } from "./fonts";

export default function ({ title }: { title: string }) {
  return (
    <div
      className={`${suse.className} flex justify-center  text-green-500 text-2xl`}
    >
      {title}
    </div>
  );
}
