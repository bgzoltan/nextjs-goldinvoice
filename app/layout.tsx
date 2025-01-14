import "@/app/ui/global.css";
import { suse } from "@/app/ui/fonts";
import { Metadata } from "next";
import MessageContainer from "./dashboard/context/message-context";

export const metadata: Metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${suse.className} antialiased`}>
        <MessageContainer>{children}</MessageContainer>
      </body>
    </html>
  );
}
