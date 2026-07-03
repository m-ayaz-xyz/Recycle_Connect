import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service | RecycleConnect",
};

export default function TermsPage() {
  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-14">
        <h1 className="text-4xl font-bold mb-8 text-green-700">
          Terms of Service
        </h1>

        <p className="mb-6 text-gray-700">
          By using RecycleConnect, you agree to the following terms.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3 text-red-500">
          ! Project Disclaimer
        </h2>

        <p className="text-gray-700">
          RecycleConnect is provided "as is" for educational and portfolio
          purposes without any warranties of any kind. The developer does not
          guarantee uninterrupted availability, complete accuracy, or error-free
          operation of the platform. By using this project, you acknowledge that
          unexpected bugs, security limitations, or functionality issues may
          exist. The developer shall not be held responsible for any loss or
          damage resulting from the use of this project.
        </p>

        <h2 className="text-2xl mt-10 font-semibold mb-3">User Responsibilities</h2>

        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Provide accurate account information.</li>
          <li>Do not misuse the platform.</li>
          <li>Respect vendors and other users.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Vendor Responsibilities
        </h2>

        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          <li>Provide correct pricing.</li>
          <li>Maintain accurate shop information.</li>
          <li>Respond to pickup requests responsibly.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Account Suspension
        </h2>

        <p className="text-gray-700">
          Accounts involved in fraud, abuse, spam, or illegal activities may be
          suspended or removed without prior notice.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">
          Limitation of Liability
        </h2>

        <p className="text-gray-700">
          RecycleConnect acts only as a platform connecting users and recycling
          vendors. Transactions and agreements between users and vendors remain
          their own responsibility.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-3">Changes to Terms</h2>

        <p className="text-gray-700">
          These terms may be updated periodically. Continued use of the platform
          indicates acceptance of the updated terms.
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
