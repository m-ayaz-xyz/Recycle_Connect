import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | RecycleConnect",
};

export default function PrivacyPolicy() {
  return (
    <div>
        <Navbar />
    
    <div className="max-w-5xl mx-auto px-6 py-14">

      <h1 className="text-4xl font-bold mb-8 text-green-700">
        Privacy Policy
      </h1>

      <p className="mb-6 text-gray-700">
        Last Updated: June 2026
      </p>

      <h2 className="text-2xl font-semibold mb-3 text-red-500">
      ! Project Notice
      </h2>

      <p className="mb-6 text-gray-700">

This application is provided for demonstration and educational purposes. Although reasonable measures have been taken to protect user data, the platform should not be used to store highly sensitive or confidential information.

Users are advised not to submit personal or financial information beyond what is necessary for testing the application's features.
</p>
      <h2 className="text-2xl font-semibold mb-3">
        Information We Collect
      </h2>

      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>Name</li>
        <li>Email Address</li>
        <li>User Role</li>
        <li>Location (only with your permission)</li>
        <li>Pickup Requests</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        How We Use Your Information
      </h2>

      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>Authenticate users securely.</li>
        <li>Connect users with nearby vendors.</li>
        <li>Process pickup requests.</li>
        <li>Improve platform performance.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Cookies
      </h2>

      <p className="text-gray-700">
        RecycleConnect uses secure authentication cookies to keep users logged
        in and provide a better experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Data Security
      </h2>

      <p className="text-gray-700">
        We implement reasonable security measures to protect user information.
        However, no internet transmission is completely secure.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Third Party Services
      </h2>

      <p className="text-gray-700">
        We may use trusted third-party services required for authentication,
        hosting, maps, and database management.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-3">
        Contact
      </h2>

      <p className="text-gray-700">
        Email: mayaz92786@gmail.com
      </p>

      {/* Footer note */}
        <div className="text-center py-8 text-sm text-gray-400">
          © 2026 RecycleConnect. All rights reserved. Designed & Developed by{" "}
          <Link
            href="https://github.com/m-ayaz-xyz"
            className="text-red-600 hover:underline"
          >
            Mohammad Ayaz
          </Link>
          .
        </div>

    </div>
    </div>
  );
}