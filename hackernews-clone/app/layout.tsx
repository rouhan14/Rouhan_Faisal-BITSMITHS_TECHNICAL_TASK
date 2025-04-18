import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacker News Clone',
  description: 'A Hacker News clone',
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-orange-50`}>
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-2">
          {children}
        </main>
      </body>
    </html>
  );
}