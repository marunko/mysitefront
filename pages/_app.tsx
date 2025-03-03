import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
 

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define pages where Navbar and Footer should be excluded
  const excludeLayoutPages = ["/enter_key"];

  const isExcluded = excludeLayoutPages.includes(router.pathname);
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render Navbar */}
        {!isExcluded && <Navbar />}

        {/* Absolute positioned theme toggle button */}
        <div className="absolute bottom-8 right-8">
          <ThemeToggle />
        </div>

        {/* Main content area - takes available space */}
        <main className="flex-1">
          <Component {...pageProps} />
        </main>

        {/* Conditionally render Footer */}
        {!isExcluded && <Footer />}
      </div>
    </ThemeProvider>
  );
}
