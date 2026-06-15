import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AccessibilityWidget from "../components/AccessibilityWidget";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main className="pt-20 bg-amber-50 min-h-screen">
        {children}
      </main>

      <Footer />

      <AccessibilityWidget
        fontSize={16}
        setFontSize={() => {}}
        highContrast={false}
        setHighContrast={() => {}}
      />
    </>
  );
}

export default MainLayout;