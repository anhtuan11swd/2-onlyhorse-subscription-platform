import Footer from "@/components/layout/Footer";
import RightPanel from "@/components/layout/RightPanel";
import Sidebar from "@/components/layout/Sidebar";

interface BaseLayoutProps {
  children: React.ReactNode;
  renderRightPanel?: boolean;
}

export default function BaseLayout({
  children,
  renderRightPanel = true,
}: BaseLayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl px-4 lg:px-6">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 pt-14 lg:pt-0">{children}</main>
        <Footer />
      </div>
      {renderRightPanel && <RightPanel />}
    </div>
  );
}
