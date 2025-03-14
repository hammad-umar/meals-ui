import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import ReactQueryProvider from '@/api/provider';
import { StoreProvider } from '../zustand/store-provider';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `Meals Planner`,
  description: `Plan meals for your loved ones.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider isAuthenticated={false} accessToken="" user={null}>
          <ReactQueryProvider>
            {children}
            <ToastContainer position="top-center" />
          </ReactQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
