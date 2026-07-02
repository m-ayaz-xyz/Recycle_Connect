"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Stars from "@/components/ui/Stars";
import PriceSelector from "@/components/ui/PriceSelector";
import EarningsCalc from "@/components/ui/EarningsCalc";
// import MapView from "@/components/ui/MapView";
import { VENDORS } from "@/lib/data";
import api from "@/lib/api";
import LoadingScreen from "@/components/ui/LoadingScreen";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/ui/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      Loading Map...
    </div>
  ),
});

export default function VendorDetailPage() {
  const { username } = useParams();

  const router = useRouter();
  const [vendors, setVendors] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const vendor = VENDORS.find((v) => v.username === username);

  // const [selectedMaterial, setSelectedMaterial] = useState(
  //   vendors ? Object.keys(vendors.prices)[0] : "",
  // );
  // const [selectedPrice, setSelectedPrice] = useState(
  //   vendors ? Object.values(vendors.prices)[0] : 0,
  // );

  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [selectedPrice, setSelectedPrice] = useState(0);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);

        if (res.data.role !== "user") {
          router.push("/dashboard/vendor");
        }

        const vendorRes = await api.get(`/dashboard/user/vendor/${username}`);
        const vendor = vendorRes.data;
        setVendors(vendor);

        if (vendor.materials.length > 0) {
          setSelectedMaterial(vendor.materials[0].name);

          setSelectedPrice(vendor.materials[0].rate);
        }
      } catch (error) {
        const status = error.response?.status;
        if (status === 401) {
          router.push("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router, username]);

  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  if (!vendors) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Vendor not found.{" "}
        <Link href="/dashboard/user" className="text-green-500 ml-2 underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.name} email={user?.email} role={user?.role} />

      {/* <div className="flex h-[calc(100vh-64px)]"> */}
      <div className=" h-auto lg:h-[calc(100vh-64px)]">
        {/* Left: Vendor Info */}
        {/* <div className="flex-1 overflow-y-auto"> */}
        <div className="flex-1 overflow-y-auto order-1">
          {/* <div className="max-w-2xl mx-auto px-8 py-8"> */}
          <div className="max-w-2xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
            {/* Back */}
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-500 hover:text-gray-800 mb-6 flex items-center gap-1 transition-colors"
            >
              ‹ Back
            </button>

            {/* Image gallery */}
            {/* <div className="grid grid-cols-3 grid-rows-2 gap-3 h-56 mb-6"> */}
            {/* <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3 h-40 sm:h-56">
              <div className="col-span-1 row-span-2 bg-green-100 rounded-2xl flex items-center justify-center text-6xl">
                📰
              </div>
              <div className="bg-green-100 rounded-xl flex items-center justify-center text-4xl">
                🔩
              </div>
              <div className="bg-green-100 rounded-xl flex items-center justify-center text-4xl">
                ♻️
              </div>
              <div className="bg-green-100 rounded-xl flex items-center justify-center text-4xl">
                🧴
              </div>
              <div className="bg-green-100 rounded-xl flex items-center justify-center text-4xl">
                💻
              </div>
            </div> */}
            <div className="mb-6">
              {/* <div className="h-[220px] sm:h-[320px] rounded-2xl overflow-hidden border border-green-100"> */}
              <div className="relative w-full h-[220px] sm:h-[320px] rounded-2xl overflow-hidden border border-green-100">  
                {user?.location && vendors?.shopLocation ? (
                  <MapView userLocation={user.location} vendors={[vendors]} />
                ) : (
                  <div className="flex items-center justify-center h-full bg-green-50">
                    Loading Map...
                  </div>
                )}
              </div>
            </div>

            {/* Vendor info */}
            <div className="mb-6">
              <h1
                className="text-xl sm:text-2xl font-black text-gray-900 mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {vendors.shopNameEnglish}
              </h1>
              <p className="text-gray-400 text-sm mb-3">
                {vendors.shopNameHindi}
              </p>
              <div className="flex items-center gap-2 mb-5">
                {/* <Stars rating={vendor.rating} size="md" />
                <span className="text-sm text-gray-500">
                  {vendor.rating} ({vendor.reviews} reviews)
                </span> */}
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { icon: "📍", text: vendors.address },
                  // { icon: "📞", text: vendors.phone },
                  {
                    icon: "🕐",
                    text: vendors.openingTime + "-" + vendors.closingTime,
                  },
                ].map((row, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-base mt-0.5">{row.icon}</span>
                    <span className="text-sm text-gray-600">{row.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price selector */}
            <div className="mb-6">
              <PriceSelector
                materials={vendors?.materials || []}
                onSelect={(material) => {
                  setSelectedMaterial(material.name);
                  setSelectedPrice(material.rate);
                }}
              />
            </div>

            {/* Earnings calculator */}
            <div className="mb-6">
              <EarningsCalc
              material={selectedMaterial}
              pricePerKg={selectedPrice}
            />
            </div>

            <div className="mb-6">
              <button
              onClick={() =>
                router.push(
                  `/dashboard/user/${username}/schedule?username=${username}&vendorId=${vendors._id}`,
                )
              }
              // className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-lg py-4 rounded-full shadow-lg shadow-green-200 hover:shadow-green-300 transition-all duration-200 hover:scale-[1.02]"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-base sm:text-lg py-3 sm:py-4 rounded-xl transition hover:scale-[1.02]"
            >
              Request Pickup
            </button>
            </div>
          </div>
        </div>

        {/* Right: Map + CTA */}
        {/* <div className="order-2 w-full lg:w-96 h-[380px] lg:h-[calc(100vh-64px)] flex flex-col border-t lg:border-t-0 lg:border-l border-green-100 bg-white"> */}
          {/* <div className="flex-1 relative"> */}

          {/* {user?.location && vendors?.shopLocation ? (
              <MapView userLocation={user.location} vendors={[vendors]} />
            ) : (
              <div className="flex h-full items-center justify-center">
                Loading Map...
              </div>
            )} */}
          {/* </div> */}
          {/* <div className="p-4 bg-white border-t border-green-100 sticky bottom-0 shadow-[0_-8px_20px_rgba(0,0,0,0.08)]">
            
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
}
