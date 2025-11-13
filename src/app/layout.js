import '../app/globals.css';
import SuperAdminNavbar from '@/components/SuperAdminNavbar';
import NeuroEdgeChatDock from '@/components/NeuroEdgeChatDock';
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SuperAdminNavbar />
        {children}
        <NeuroEdgeChatDock />
      </body>
    </html>
  );
}
