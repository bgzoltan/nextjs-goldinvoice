"use client";

import { Message, MessageType } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { createContext } from "react";

interface ContextType {
  message: Message;
  handleMessage: (message: Message) => void;
  handleMessageClick: () => void;
  isLoading: { state: boolean; text: string };
  handleLoading: (state: boolean, text: string) => void;
}

const Context = createContext<ContextType>({
  message: {
    type: MessageType.Empty,
    content: "",
    show: false,
    redirect: false,
  },
  handleMessage: () => {},
  handleMessageClick: () => {},
  isLoading: { state: false, text: "" },
  handleLoading: () => {},
});

export const useMessageAndLoading = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useMessageAndLoading must be used within a MessageAndLoading Provider"
    );
  }
  return context;
};

export default function MessageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<Message>({
    type: MessageType.Empty,
    content: "",
    show: false,
    redirect: false,
  });
  const [isLoading, setIsLoading] = useState({ state: false, text: "" });

  const handleMessage = (message: Message) => {
    setMessage(message);
  };
  const handleLoading = (state: boolean, text: string) => {
    setIsLoading({ ...isLoading, state, text });
  };

  const handleMessageClick = () => {
    setMessage({
      ...message,
      show: false,
    });
    if (message.redirect) {
      handleLoading(true, "Redirecting...");
      router.push("/dashboard/customers");
    }
  };
  return (
    <Context.Provider
      value={{
        message,
        handleMessage,
        handleMessageClick,
        isLoading,
        handleLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
}
