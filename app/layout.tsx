import { AppProvider } from '@/context/AppContext';
import './globals.css';

export default function RootLayout({ children, modal }: { children: React.ReactNode , modal?: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0b1120] text-white">
        <AppProvider>
          {children}
          {modal}
        </AppProvider>
      </body>
    </html>
  );
}
