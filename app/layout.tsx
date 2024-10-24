import "./globals.css";
import { metadata } from "@/lib/constants";
import { Inter } from "next/font/google"; // Ensure Inter is imported from the correct package

const inter = Inter({ subsets: ["latin"] });

/**
 * RootLayout component that defines the root layout of the application.
 * @param children - The child components to be rendered within the layout.
 * @returns A React component that defines the root layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
    >
      <head>
        <title>{metadata.title as string}</title>
        <meta
          name="description"
          content={metadata.description as string}
        />
      </head>
      <body className={`${inter.className} bg-black-101 text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
