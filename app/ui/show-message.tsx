import { useMessageAndLoading } from "../dashboard/context/message-context";
import { MessageType } from "../lib/definitions";
import CustomButton from "./custom-button";

export default function ShowMessage() {
  let bgColor = "";
  let title = "";

  const { message, handleMessageClick } = useMessageAndLoading();

  if (message.type == MessageType.Error) {
    bgColor = "red";
    title = MessageType.Error;
  } else {
    bgColor = "green";
    title = MessageType.Information;
  }

  return (
    <>
      {message.show && (
        <div className="fixed left-0 top-0 flex w-screen h-screen justify-center items-center">
          <div
            className="flex flex-col justify-center items-center min-w-52 p-2 rounded text-white"
            style={{ backgroundColor: bgColor }}
          >
            <p className="text-lg font-bold">{title}</p>
            <p className="p-1">{message?.content}</p>
            <CustomButton buttonType="" onClick={() => handleMessageClick()}>
              Close
            </CustomButton>
          </div>
        </div>
      )}
    </>
  );
}
