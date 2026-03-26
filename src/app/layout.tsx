import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Murphy | Portfolio',
  description: 'Randall Murphy Full Stack Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-night">{children}</body>
    </html>
  );
}
