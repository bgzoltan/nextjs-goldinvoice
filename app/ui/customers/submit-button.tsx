"use client";

import { useFormStatus } from "react-dom";
import CustomButton from "../custom-button";
import { useEffect } from "react";

interface SubmitButtonProps {
  handleLoading: (state: boolean, text: string) => void;
}

export function SubmitButton({ handleLoading }: SubmitButtonProps) {
  const { pending } = useFormStatus();

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
        Submit
      </CustomButton>
    </div>
  );
}
