import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAccessibility } from "../context/AccessibilityContext";

function MainLayout({ children }: { children: React.ReactNode }) {
  const { fontSize } = useAccessibility();

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <Navbar />
      <main className="pt-20 bg-amber-50/50 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
