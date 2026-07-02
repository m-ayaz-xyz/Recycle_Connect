"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { VENDORS, PICKUP_TIMES } from "@/lib/data";
import Link from "next/link";
import api from "@/lib/api";
import { Trash2 } from "lucide-react";
import { getCurrentLocation } from "@/hooks/useLocation";

function ScheduleForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const username = searchParams.get("username");
  // const material = searchParams.get("material") || "Plastic";
  const vendorId = searchParams.get("vendorId");
  const [location, setLocation] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  // const vendor = VENDORS.find((v) => v.id === vendorId);

  //   const [weight, setWeight] = useState(5);
  //   const [date, setDate] = useState("");
  //   const [time, setTime] = useState("5 PM");
  //   const [submitted, setSubmitted] = useState(false);
  //  const total = weight * price;

  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [items, setItems] = useState([]);
  const [phoneNo, setPhoneNo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [vendor, setVendor] = useState(null);
  const [user, setUser] = useState(null);

  const fetchLocation = async () => {
    try {
      setGettingLocation(true);

      const current = await getCurrentLocation();

      setLocation(current);

      await api.put("/dashboard/user/location", current);
    } catch (err) {
      alert("Please allow location");
    } finally {
      setGettingLocation(false);
    }
  };

  useEffect(() => {
    async function fetchVendor() {
      const res = await api.get(`/dashboard/user/vendor/${username}`);

      setVendor(res.data);
    }

    async function fetchUser() {
      const res = await api.get("/auth/profile");
      setUser(res.data);

      if (res.data.role !== "user") {
        router.push("/dashboard/vendor");
      }
    }

    if (username) {
      fetchVendor();
      fetchUser();
      fetchLocation();
    }
  }, [username]);

  const handleSubmit = async () => {
    if (items.length === 0) {
      return alert("Please add at least one material");
    }

    if (!phoneNo) {
      return alert("Enter phone number");
    }

    if (!date) {
      return alert("Select pickup date");
    }

    if (!location) {
  return alert(
    "Please allow your location."
  );
}

    try {
      await api.post("/dashboard/user/create-order", {
        vendorId,

        materials: items.map((item) => ({
          name: item.name,
          weight: item.weight,
        })),

        contactNo: phoneNo,

        // pickupTime: `${date} ${time}`,
        // pickupTime: new Date(`${date}T${time}`).toISOString(),
        pickupDate: date,
        pickupTime: time,
        totalAmount: total,
        pickupLocation: location,
      });

      alert("Pickup Request Created");

      router.push("/dashboard/user");
    } catch (err) {
      console.log(err);

      alert("Something went wrong");
    }
  };

  const addItem = () => {
    if (!selectedMaterial || !weight) return;

    const material = vendor.materials.find((m) => m.name === selectedMaterial);

    if (!material) return;

    const item = {
      id: Date.now(),
      name: material.name,
      weight: Number(weight),
      rate: material.rate,
      total: Number(weight) * material.rate,
    };

    setItems((prev) => [...prev, item]);

    setSelectedMaterial("");
    setWeight("");
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce(
    (sum, item) => sum + item.total,

    0,
  );

  // if (submitted) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <Navbar userName="Customer Abcdef" />
  //       <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
  //         <div className="text-7xl mb-6">✅</div>
  //         <h2
  //           className="text-3xl font-black text-gray-900 mb-3"
  //           style={{ fontFamily: "'Playfair Display', serif" }}
  //         >
  //           Pickup Confirmed!
  //         </h2>
  //         <p className="text-gray-500 text-center text-sm max-w-sm mb-8">
  //           Your pickup request has been sent to <strong>{vendor?.name}</strong>
  //           . They will confirm shortly.
  //         </p>

  //         {/* Receipt */}
  //         <div className="bg-white border border-green-100 rounded-2xl p-6 w-full max-w-sm shadow-sm mb-6">
  //           {[
  //             ["Material", material],
  //             ["Weight", `${weight} kg`],
  //             ["Price", `₹${price}/kg`],
  //             ["Est. Amount", `₹${total}`],
  //             ["Date", date],
  //             ["Time", time],
  //             ["Status", "🟡 PENDING"],
  //           ].map(([k, v]) => (
  //             <div
  //               key={k}
  //               className="flex justify-between py-3 border-b border-gray-50 last:border-0 text-sm"
  //             >
  //               <span className="text-gray-400">{k}</span>
  //               <span className="font-semibold text-gray-900">{v}</span>
  //             </div>
  //           ))}
  //         </div>

  //         <Link
  //           href="/dashboard"
  //           className="bg-green-500 text-white font-bold px-10 py-3 rounded-full hover:bg-green-600 transition-colors"
  //         >
  //           Back to Dashboard
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.name} email={user?.email} />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
        <div className="bg-white border border-green-100 rounded-3xl p-8 w-full max-w-md shadow-sm">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
          >
            ‹ Back
          </button>

          <h1
            className="text-2xl font-black text-gray-900 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Schedule Pickup
          </h1>

          {/* Summary card */}
          {vendor && (
            <div className="bg-green-50 rounded-xl px-5 py-4 mb-6 border border-green-100">
              <div className="font-semibold text-sm text-gray-900 flex gap-2 items-center">
                {vendor.shopNameEnglish}
                <p className="text-gray-900 text-xs">
                  ({vendor.shopNameHindi})
                </p>
              </div>
              {/* <div className="text-sm text-gray-500 mt-1">
                {selectedMaterial} · {weight} kg →{" "}
                <span className="text-green-600 font-bold">₹{total}</span>
              </div> */}

              {/* <div className="mt-2">
                {items.length === 0 ? (
                  <p className="text-sm text-gray-500">No material added</p>
                ) : (
                  items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm py-1"
                    >
                      <span>
                        {item.name} · {item.weight} kg
                      </span>

                      <span className="font-semibold text-green-600">
                        ₹{item.total}
                      </span>
                    </div>
                  ))
                )}

                <div className="border-t mt-3 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div> */}
              <div className="mt-4">
                {items.length === 0 ? (
                  <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
                    No material added
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-xl border border-gray-200 p-4 bg-gray-50"
                        >
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {item.weight} kg × ₹{item.rate}/kg
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="font-bold text-green-600">
                              ₹{item.total}
                            </span>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-2 rounded-lg transition"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t mt-5 pt-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Total Items</span>
                        <span>{items.length}</span>
                      </div>

                      <div className="flex justify-between text-gray-600 mt-2">
                        <span>Total Weight</span>
                        <span>
                          {items.reduce((sum, item) => sum + item.weight, 0)} kg
                        </span>
                      </div>

                      <div className="flex justify-between text-xl font-bold mt-3">
                        <span>Estimated Amount</span>
                        <span className="text-green-600">₹{total}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Form fields */}
          <div className="flex flex-col gap-5">
            {/* Material */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Material
              </label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              >
                <option value="">Select Material</option>

                {vendor?.materials?.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} - ₹{m.rate}/kg
                  </option>
                ))}
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Estimated Weight (kg)
              </label>
              <input
                type="number"
                min={1}
                placeholder="Estimated Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black text-base py-2 rounded-full shadow-lg shadow-green-100 transition-all hover:scale-[1.02] "
              type="button"
              onClick={addItem}
            >
              Add
            </button>

            {/* {items.map((item, index) => (
              <div key={index} className="flex justify-between border-b py-3">
                <div>
                  <div>{item.name}</div>

                  <div>{item.weight} kg</div>
                </div>

                <div>₹{item.total}</div>
              </div>
            ))} */}

            {/* <div className="font-bold text-lg">Total ₹{total}</div> */}

            <div className="border rounded-xl p-4 bg-green-50">
              <h2 className="font-bold">Pickup Location</h2>

              {location ? (
                <p className="text-green-600">✅ Current Location Captured</p>
              ) : (
                <p className="text-red-500">Location Required</p>
              )}

              <button
                onClick={fetchLocation}
                className="mt-3 bg-green-500 text-white px-5 py-2 rounded-lg"
              >
                {gettingLocation ? "Getting Location..." : "Update Location"}
              </button>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Pickup Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Preferred Time
              </label>
              {/* <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
              >
                {PICKUP_TIMES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select> */}
              <select
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">Select Time</option>
                <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                <option value="11:00 AM- 01:00 PM">11:00 AM- 01:00 PM</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                <option value="05:00 PM - 06:00 PM">05:00 PM - 06:00 PM</option>
              </select>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!location}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-base py-4 rounded-full shadow-lg shadow-green-100 transition-all hover:scale-[1.02] mt-2"
            >
              Confirm Pickup Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Loading...
        </div>
      }
    >
      <ScheduleForm />
    </Suspense>
  );
}
