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

      {/* Footer note */}
      <div className="text-center py-8 text-sm text-gray-400">
        By clicking "Start Now" you agree to the Recycle Connect{" "}
        <Link href="#" className="text-green-500 hover:underline">
          T&C
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-blue-500 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
