import { ClockIcon } from "@heroicons/react/24/outline";
export default function Loading() {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-transparent ">
      <div className="flex bg-slate-300 p-2 rounded-lg">
        <p>Loading page...</p>
        <ClockIcon className="h-4 w-4" />
      </div>
    </div>
  );
}
