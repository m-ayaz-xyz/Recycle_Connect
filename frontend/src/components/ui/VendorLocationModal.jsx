"use client";

import { useState } from "react";
import api from "@/lib/api";
import { getCurrentLocation } from "@/hooks/useLocation";

export default function VendorLocationModal({
  open,

  onClose,

  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleLocation = async () => {
    try {
      setLoading(true);

      const location = await getCurrentLocation();

      await api.put(
        "/dashboard/vendor/location",

        location,
      );

      setSaved(true);

      onSuccess();
    } catch (err) {
      alert("Please allow location permission.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-[430px]">
        <h2 className="text-2xl font-bold">Shop Location</h2>

        <p className="text-gray-500 mt-3">
          We need your shop location to show nearby users.
        </p>

        {saved ? (
          <div className="mt-6">
            <p className="text-green-600 font-semibold">
              ✅ Location Saved Successfully
            </p>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-green-500 text-white rounded-xl py-3"
            >
              Close
            </button>
          </div>
        ) : (
          <button
            onClick={handleLocation}
            disabled={loading}
            className="mt-6 w-full bg-green-500 text-white rounded-xl py-3"
          >
            {loading ? "Getting Location..." : "Allow Location"}
          </button>
        )}
      </div>
    </div>
  );
}
