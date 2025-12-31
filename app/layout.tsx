import { AppProvider } from '@/context/AppContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0b1120] text-white">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
