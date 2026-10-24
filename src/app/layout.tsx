import ClientLayout from "./ClientLayout";
import "./globals.css";

export { generateMetadata } from "./metadata";
export { viewport } from "./viewport";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
