"use client";

// import { Router } from "next/router";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Navbar from "@/components/layout/Navbar";

import { VENDORS } from "@/lib/data";
import Stars from "@/components/ui/Stars";
import PriceSelector from "@/components/ui/PriceSelector";
import EarningsCalc from "@/components/ui/EarningsCalc";
// import MapView from "@/components/ui/MapView";
import MaterialPriceList from "@/components/ui/MaterialPriceList";
import { Clock10, Phone, MapPinCheckInside } from "lucide-react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Link from "next/link";
import OrderDetails from "@/components/ui/OrderDetail";
import VendorLocationModal from "@/components/ui/VendorLocationModal";
// import VendorMap from "@/components/ui/VendorMap";

import dynamic from "next/dynamic";

const VendorMap = dynamic(
  () => import("@/components/ui/VendorMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        Loading Map...
      </div>
    ),
  }
);

const page = () => {
  const router = useRouter();
  const [vendorDetails, setVendorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState();
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.get("/auth/profile");
        setProfileData(res.data);

        const vendorRes = await api.get("/dashboard/vendor/profile");

        if (!vendorRes.data.vendor.shopLocation?.latitude) {
          setShowLocationPopup(true);
        }

        if (!vendorRes.data.profileExists) {
          router.push("/dashboard/vendor/create-profile");
          return;
        }

        setVendorDetails(vendorRes.data.vendor);

        const orderRes = await api.get("/dashboard/vendor/orders");
        setOrderData(orderRes.data);
        // console.log("Order Data:", orderRes.data);

        if (res.data.role !== "vendor") {
          router.push("/dashboard/user");
        }
      } catch (error) {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const vendor = {
    name: "Vendor Name",
    // nameHindi: "विक्रेता नाम",
    // rating: 4.5,
    // reviews: 120,
    // address: "123 Main St, City",
    // phone: "123-456-7890",
    // hours: "9am - 6pm",
    // prices: { Plastic: 10, Paper: 5, Metal: 15 },
    city: "Lucknow",
  };

  if (loading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={vendorDetails?.username} email={profileData?.email} />

      {/* <div className="flex h-[calc(100vh-64px)]"> */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
        {/* Left: Vendor Info */}
        {/* <div className="flex-1 overflow-y-auto"> */}
        <div className="flex-1 overflow-y-auto order-2 lg:order-1">
          {/* <div className="max-w-2xl mx-auto px-8 py-8"> */}
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Vendor info */}
            <div className="mb-6">
              {/* <div className="flex items-center justify-between mb-1"> */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                <h1
                  className="text-2xl font-black text-gray-900 mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {vendorDetails?.shopNameEnglish}
                </h1>
                <Link
                  href="/dashboard/vendor/create-profile"
                  className="text-green-700 text-base hover:underline"
                >
                  View Profile
                </Link>
              </div>

              <p className="text-gray-400 text-sm mb-3">
                {vendorDetails?.shopNameHindi}
              </p>
              {/* <div className="flex items-center gap-2 mb-5">
                <Stars rating={vendor.rating} size="md" />
                <span className="text-sm text-gray-500">
                  {vendor.rating} ({vendor.reviews} reviews)
                </span>
              </div> */}
              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: <MapPinCheckInside size={20} />,
                    text: vendorDetails?.address,
                  },
                  // { icon: <Phone size={20} />, text: vendorDetails?.phone },
                  {
                    icon: <Clock10 size={20} />,
                    text:
                      vendorDetails?.openingTime +
                      " - " +
                      vendorDetails?.closingTime,
                  },
                ].map((row, i) => (
                  <div key={i} className="flex gap-3  items-center">
                    <span className="text-base mt-0.5">{row.icon}</span>
                    <span className="text-sm text-gray-600">{row.text}</span>
                  </div>
                ))}
              </div>
              <button
              onClick={() => setShowLocationPopup(true)}
              // className="bg-green-500 text-white px-5 py-2 rounded-xl"
              className="w-full sm:w-auto bg-green-500 text-white px-5 py-2 mt-4 rounded-xl"
            >
              Update Location
            </button>
            </div>

            {/* Price selector */}
            <div className="mb-6">
              {/* <PriceSelector
                  prices={vendor.prices}
                  onSelect={(mat, price) => {
                    setSelectedMaterial(mat);
                    setSelectedPrice(price);
                  }}
                /> */}
              <MaterialPriceList materials={vendorDetails?.materials || []} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-gray-900 mb-4">
                  Orders
                </h3>
                <Link
                  href="/dashboard/vendor/orders"
                  className="text-green-700 text-base "
                >
                  View Orders &gt;
                </Link>
              </div>
              {orderData.length == 0 && (
                <div className="bg-white rounded-2xl p-10 border text-center">
                  <h2 className="text-xl font-bold text-gray-700">No Orders</h2>
                </div>
              )}
              {orderData?.slice(0, 2).map((order) => (
                <OrderDetails key={order._id} order={order} />
              ))}
            </div>

            <VendorLocationModal
              open={showLocationPopup}
              onClose={() => setShowLocationPopup(false)}
              onSuccess={() => {
                setShowLocationPopup(false);
              }}
            />
            
          </div>
        </div>

        {/* Right: Map */}
        {/* <div className="w-96 flex flex-col border-l border-green-100"> */}
        <div className="w-full h-[300px] lg:h-auto lg:w-96 border-t lg:border-t-0 lg:border-l border-green-100 order-1 lg:order-2">
          {/* <div className="flex-1">
          </div> */}
          {/* <MapView vendors={[vendor]} city={vendor.city} /> */}
          <VendorMap vendor={vendorDetails} />
        </div>
      </div>
    </div>
  );
};

export default page;
