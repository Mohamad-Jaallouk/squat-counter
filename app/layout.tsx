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
        <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100 flex items-center justify-center">
          {/* <main className="flex w-full flex-col items-center justify-center"> */}
          {children}
          {/* </main> */}
        </div>
      </body>
      <Analytics />
    </html>
  );
}
