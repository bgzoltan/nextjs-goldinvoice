"use client";

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
          <fieldset className="flex flex-row">
            <button
              onClick={() => handleConfirm(true)}
              className="rounded-md border p-2 m-2 hover:bg-gray-100"
            >
              <span>Yes</span>
            </button>
            <button
              onClick={() => handleConfirm(false)}
              className="rounded-md border p-2 m-2 hover:bg-gray-100"
            >
              <span>No</span>
            </button>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
