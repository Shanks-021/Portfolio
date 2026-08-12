import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Scanline from "@/components/Scanline";


const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Ojas Soni | AI Engineer",
  description: "AI Engineer building agentic AI, RAG, and multi-agent systems in production.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <Scanline />

        {children}
      </body>
    </html>
  );
}
