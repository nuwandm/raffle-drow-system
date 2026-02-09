import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DMS Midnight 13th - Horror Raffle',
  description: 'Enter if you dare... DMS Recreation Club presents Midnight 13th - A horror-themed raffle experience where fate chooses the lucky ones',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
