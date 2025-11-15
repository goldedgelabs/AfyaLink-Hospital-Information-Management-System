import '../app/globals.css';
import SuperAdminNavbar from '@/components/SuperAdminNavbar';
import NeuroEdgeChatDock from '@/components/NeuroEdgeChatDock';
import Providers from '@/components/Providers';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          <SuperAdminNavbar />
          {children}
          <NeuroEdgeChatDock />
        </Providers>
      </body>
    </html>
  );
}
