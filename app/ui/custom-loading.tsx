import { ClockIcon } from "@heroicons/react/24/outline";

interface CustomLoadingProps {
  children: React.ReactNode;
}

export default function CustomLoading({ children }: CustomLoadingProps) {
  return (
    <div className="fixed z-0 top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="flex justify-center p-2 rounded-md bg-slate-300 white w-60">
        <p>{children}</p>
        <ClockIcon className="h-4 w-4" />
      </div>
    </div>
  );
}
