import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ClientOnlyPortal = ({
  children,
}: {
  children: ReactNode;
  selector: string;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const targetElement = document.getElementById("error-holder");
  return targetElement ? createPortal(children, targetElement) : null;
};

export default ClientOnlyPortal;
