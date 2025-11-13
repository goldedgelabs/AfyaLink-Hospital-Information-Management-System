import '../app/globals.css';
import SuperAdminNavbar from '@/components/SuperAdminNavbar';
import NeuroEdgeChatDock from '@/components/NeuroEdgeChatDock';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <SuperAdminNavbar />
            {children}
            <NeuroEdgeChatDock />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
