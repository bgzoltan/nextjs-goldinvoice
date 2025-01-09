interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: string;
  children: React.ReactNode;
}

export default function CustomButton({
  buttonType = "primary",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={`flex items-center h-10 w-full rounded-lg p-3 m-[2px] text-sm font-medium transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        buttonType === "primary"
          ? "text-white bg-green-600 hover:bg-green-800  focus-visible:outline-green-800"
          : "text-black bg-gray-200 hover:bg-gray-400  focus-visible:outline-gray-400"
      } `}
    >
      {children}
    </button>
  );
}
