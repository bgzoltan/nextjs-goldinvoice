"use client";

import CustomButton from "./custom-button";

interface ConfirmI {
  title: string;
  handleConfirm(value: boolean): void;
}

export default function ConfirmModal({ title, handleConfirm }: ConfirmI) {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen flex justify-center items-center ">
      <div className="flex justify-center items-center w-40 h-32 bg-gray-200 p-2 rounded-lg">
        <div className="flex flex-col justify-center items-center bg-white w-full h-full">
          <div className="flex justify-center items-center w-full h-full border-solid border-2 border-gray-200">
            <p className="font-bold">{title}</p>
          </div>
          <p>Are you sure?</p>
          <fieldset className="flex flex-row gap-2">
            <CustomButton
              onClick={() => handleConfirm(true)}
              buttonType="primary"
            >
              Yes
            </CustomButton>
            <CustomButton
              onClick={() => handleConfirm(false)}
              buttonType="primary"
            >
              No
            </CustomButton>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
