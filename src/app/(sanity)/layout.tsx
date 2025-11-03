import type { Metadata } from "next";
import "../../styles/brand.css";
import "../globals.css";
import StyledComponentsRegistry from "@/lib/registry";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "Content management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
  );
}
