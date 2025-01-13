"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  return (
    <div className="fixed left-0 top-0 flex flex-col w-screen h-screen justify-center items-center">
      <div className="flex flex-col p-2 justify-center items-center  text-white bg-red-500">
        <h2 className="text-center">Error</h2>
        <p>{error.message}</p>
        <button
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
          onClick={() => {
            reset();
            handleRedirect();
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
