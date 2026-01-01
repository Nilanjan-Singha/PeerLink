import { AppProvider } from '@/context/AppContext';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children, modal }: { children: React.ReactNode , modal?: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0b1120] text-white">
        <AuthProvider>
        <AppProvider>
          {children}
          {modal}
        </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
