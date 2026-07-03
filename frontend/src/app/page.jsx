/**
 * RecycleConnect
 * Copyright © 2026 Mohammad Ayaz.
 * All rights reserved.
 */

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TipsSection from "@/components/sections/TipsSection";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <TipsSection />

      {/* Footer */}
      <div className="text-center py-8 text-sm text-gray-400">
        © 2026 RecycleConnect. All rights reserved. Designed & Developed by {" "}
        <Link href="https://github.com/m-ayaz-xyz" className="text-red-600 hover:underline">
          Mohammad Ayaz
        </Link>
 . 
      </div>
    </div>
  );
}
