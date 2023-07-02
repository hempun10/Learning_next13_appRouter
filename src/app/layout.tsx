import ClientOnly from "@/components/ClientOnly";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterProvider from "@/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authentaction App",
  description: "Learning Next 13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
        </ClientOnly>
        <div>{children}</div>
      </body>
    </html>
  );
}
