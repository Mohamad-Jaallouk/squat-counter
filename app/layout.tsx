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
      <body>{children}</body>
      <Analytics />
    </html>
  );
}