import Navbar from "@/components/layout/Navbar";
import Link from "next/link";

export const metadata = {
  title: "About | RecycleConnect",
};

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-9">
        <h1 className="text-4xl font-bold mb-6 text-green-700">
          About RecycleConnect
        </h1>

<p className="text-gray-700 leading-8 mb-6">
          Users can explore local vendors, compare recyclable material prices,
          place pickup requests, and track their recycling activities. Vendors
          can manage their profiles, update pricing, receive pickup requests,
          and serve customers efficiently.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-red-500">Project Disclaimer</h2>

        <p className="text-gray-700 leading-8">
          RecycleConnect is an independent portfolio and educational project developed by Mohammad Ayaz to demonstrate Full Stack web development skills. While every effort has been made to build a functional and secure application, this project is not intended to be a commercial or production-ready service.
        </p>

        <p className="text-gray-700 leading-8 mb-6">
          RecycleConnect is a web platform that connects users with nearby
          recycling vendors, making waste collection simple, transparent, and
          environmentally responsible.
        </p>

        

        <h2 className="text-2xl font-semibold mt-10 mb-4">Mission</h2>

        <p className="text-gray-700 leading-8">
          Our mission is to encourage responsible waste management by connecting
          households and recycling vendors through a simple and accessible
          digital platform.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Technologies Used</h2>

        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>Next.js</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MongoDB</li>
          <li>JWT Authentication</li>
          <li>Tailwind CSS</li>
          <li>Leaflet Maps</li>
        </ul>

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
