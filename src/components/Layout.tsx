import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";

const Layout = () => (
  <div className="flex min-h-screen flex-col">
    <SiteHeader />
    <div className="flex-1">
      <Outlet />
    </div>
    <SiteFooter />
    <CartDrawer />
  </div>
);

export default Layout;
