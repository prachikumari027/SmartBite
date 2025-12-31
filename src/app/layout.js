import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SmartBite - Smart Kitchen Assistant",
  description: "AI-powered recipe planning and cooking assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-linear-to-br from-dark-500 via-dark-400 to-dark-500`}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <Footer />
          <Chatbot />
        </div>
      </body>
    </html>
  );
}
