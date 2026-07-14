import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CookieConsent } from "@/components/CookieConsent";

const Layout = () => (
  <div className="flex min-h-screen flex-col">
    <SiteHeader />
    <main id="main-content" className="flex-1">
      <Outlet />
    </main>
    <SiteFooter />
    <CartDrawer />
    <WhatsAppFloat />
    <CookieConsent />
  </div>
);

export default Layout;
