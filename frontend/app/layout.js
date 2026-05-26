import "bootstrap/dist/css/bootstrap.min.css";

import QueryProvider from "@/providers/query-provider";

import { Toaster } from "react-hot-toast";

import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Finance SaaS",
  description: "Finance Management App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Toaster />

          <Navbar />

          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
