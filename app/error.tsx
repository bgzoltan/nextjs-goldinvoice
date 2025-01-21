"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ClientOnlyPortal from "./clientPortal";
import CustomButton from "./ui/custom-button";

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

  const errorHolder = document.querySelector("#error-holder");
  if (!errorHolder) {
    return null;
  }

  return (
    <ClientOnlyPortal selector="#error-handler">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity border-2 border-white ">
        <div className="flex flex-col justify-center items-center bg-red-500 p-6 rounded-lg shadow-lg">
          <h1 className="text-xl text-white font-bold">Something went wrong</h1>
          <p className="text-white">{error.message}</p>
          <CustomButton
            onClick={() => {
              reset();
              handleRedirect();
            }}
            buttonType=""
          >
            Try again
          </CustomButton>
        </div>
      </div>
    </ClientOnlyPortal>
  );
}
