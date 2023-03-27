import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Squat Counter",
  description:
    "Squat Counter: AI-powered squat counter for seamless fitness tracking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="fixed flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
          {/* <main className="flex w-full flex-col items-center justify-center"> */}
          {children}
        </div>
      </body>
      <Analytics />
    </html>
  );
}
