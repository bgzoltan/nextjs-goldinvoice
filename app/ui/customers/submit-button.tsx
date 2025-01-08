"use client";

import { useFormStatus } from "react-dom";
import CustomButton from "../custom-button";
import { useEffect } from "react";
import { useMessageAndLoading } from "@/app/dashboard/context/message-context";

export function SubmitButton() {
  const { pending } = useFormStatus();
  const { handleLoading } = useMessageAndLoading();

  useEffect(() => {
    if (!pending) handleLoading(false, "");
  }, [pending]);

  return (
    <div className="">
      <CustomButton
        buttonType="primary"
        type="submit"
        onClick={() => handleLoading(true, "Saving...")}
      >
        Save
      </CustomButton>
    </div>
  );
}
