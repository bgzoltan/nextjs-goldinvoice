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
      className={`flex items-center h-10 rounded-lg p-3 text-sm font-medium text-white transition-colors  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
        buttonType === "primary"
          ? "bg-green-600 hover:bg-green-800  focus-visible:outline-green-800"
          : "bg-gray-400 hover:bg-gray-600  focus-visible:outline-gray-600"
      } `}
    >
      {children}
    </button>
  );
}
