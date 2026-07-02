"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
// import MapView from "@/components/ui/MapView";
import VendorCard from "@/components/ui/VendorCard";
import { VENDORS } from "@/lib/data";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { getCurrentLocation } from "@/hooks/useLocation";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/ui/MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      Loading Map...
    </div>
  ),
});

const MOCK_USER = {
  name: "Customer Abcdef",
  id: "22788975657",
  location: "Lucknow, Uttar Pradesh",
};

export default function DashboardPage() {
  const [showProfile, setShowProfile] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [user, setUser] = useState();
  const router = useRouter();

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const location = await getCurrentLocation();

        await api.put("/dashboard/user/location", {
          latitude: location.latitude,
          longitude: location.longitude,
        });
      } catch (err) {
        alert("Location permission is required.");
      }
    };

    const checkUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);

        if (res.data.role !== "user") {
          router.push("/dashboard/vendor");
        }

        // const vendorRes = await api.get("/dashboard/user/vendors");
        // setVendors(vendorRes.data);

        const vendorRes = await api.get("/dashboard/user/nearby-vendors");

        setVendors(vendorRes.data);
        console.log("Nearby Vendors user page p:", vendorRes.data);
      } catch (error) {
        router.push("/auth/login");
      }
    };

    getUserLocation();
    checkUser();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.name} email={user?.email} role={user?.role} />

      {/* <div className="flex h-[calc(100vh-64px)]"> */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
        {/* ── Left: Map area ── */}
        {/* <div className="flex-1 flex flex-col overflow-hidden"> */}
        <div className="flex-1 flex flex-col overflow-hidden lg:h-full h-[55vh]">
          {/* Welcome bar */}
          {/* <div className="bg-green-500 px-6 py-3"> */}
          <div className="bg-green-500 px-4 sm:px-6 py-3">
            <h1
              className="text-xl font-black text-white "
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome, {user?.name}!
            </h1>
          </div>

          {/* Map */}
          <div className="flex-1 min-h-0">
            {/* <MapView vendors={vendors} city={MOCK_USER.location} /> */}
            <MapView
              userLocation={user?.location}
              vendors={vendors}
              className="h-full w-full z-0"
            />
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        {/* <aside className="w-[300px] bg-white border-l border-green-100 flex flex-col overflow-y-auto"> */}
        <aside className="w-full lg:w-[320px] h-[45vh] lg:h-full bg-white border-t lg:border-t-0 lg:border-l border-green-100 overflow-y-auto snap-y snap-mandatory">
          {/* Vendor list */}
          <div className="p-4 pb-10">
            <h2 className="font-bold text-base text-gray-900 mb-4">
              Vendors nearby
            </h2>
            <div className="flex flex-col gap-4 snap-y">
              {/* {VENDORS.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))} */}
              {vendors.map((vendor) => (
                <VendorCard key={vendor._id} vendor={vendor} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
