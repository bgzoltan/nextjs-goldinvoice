import { suse } from "./fonts";

export default function PageTitle({ title }: { title: string }) {
  return (
    <div
      className={`${suse.className} flex justify-center font-bold text-green-500 text-2xl`}
    >
      {title}
    </div>
  );
}
