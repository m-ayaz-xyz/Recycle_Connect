"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VendorDashboard() {
  const router = useRouter();
  const [form, setForm] = useState({
    shopNameEnglish: "",
    shopNameHindi: "",
    address: "",
    openingTime: "",
    closingTime: "",
  });

  const [material, setMaterial] = useState({
    name: "",
    rate: "",
  });

  const [profileExists, setProfileExists] = useState(false);

  const [materials, setMaterials] = useState([]);
  const [profileData, setProfileData] = useState();

  useEffect(() => {
    fetchuserProfile();
    fetchProfile();
  }, []);

  const fetchuserProfile = async () => {
    try {
      const res = await api.get("/auth/profile");
      setProfileData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/dashboard/vendor/profile");
      if (res.data.profileExists) {
        const vendor = res.data.vendor;

        setForm({
          shopNameEnglish: vendor.shopNameEnglish,
          shopNameHindi: vendor.shopNameHindi,
          address: vendor.address,
          openingTime: vendor.openingTime,
          closingTime: vendor.closingTime,
        });

        setMaterials(vendor.materials);

        setProfileExists(true);
      } else {
        setProfileExists(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addMaterial = () => {
    if (!material.name || !material.rate) return;

    setMaterials([
      ...materials,
      {
        name: material.name,
        rate: Number(material.rate),
      },
    ]);

    setMaterial({
      name: "",
      rate: "",
    });
  };

  const removeMaterial = (index) => {
    const updated = [...materials];
    updated.splice(index, 1);
    setMaterials(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        materials,
      };

      if (profileExists) {
        await api.put("/dashboard/vendor/update-profile", payload);

        alert("Profile Updated");
      } else {
        await api.post("/dashboard/vendor/create-profile", payload);

        alert("Profile Created");

        setProfileExists(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={profileData?.name} email={profileData?.email} />
      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-8 py-8">
            <button
              onClick={() => router.back()}
              className="text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
            >
              ‹ Back
            </button>
            <h1
              className="text-2xl font-black text-gray-900 mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Vendor Profile
            </h1>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div>
                <label className="block font-bold text-sm text-gray-800">
                  Shop Name (English)
                </label>
                <input
                  type="text"
                  placeholder="Shop Name English"
                  value={form.shopNameEnglish}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      shopNameEnglish: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-gray-800 ">
                  Shop Name (Hindi)
                </label>
                <input
                  type="text"
                  placeholder="Shop Name Hindi"
                  value={form.shopNameHindi}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      shopNameHindi: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-gray-800 ">
                  Address
                </label>
                <textarea
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      address: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-gray-800 ">
                  Opening Time
                </label>
                <input
                  type="time"
                  value={form.openingTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      openingTime: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="block font-bold text-sm text-gray-800 ">
                  Closing Time
                </label>
                <input
                  type="time"
                  value={form.closingTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      closingTime: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <hr />

              {/* <h3>Add Materials</h3> */}
              <div>
                <label className="block font-bold text-sm text-gray-800 ">
                  Add Materials
                </label>
                <div className="flex flex-col gap-3 mt-3">
                  <input
                    type="text"
                    placeholder="Material Name"
                    value={material.name}
                    onChange={(e) =>
                      setMaterial({
                        ...material,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  />

                  <input
                    type="number"
                    placeholder="Rate per KG"
                    value={material.rate}
                    onChange={(e) =>
                      setMaterial({
                        ...material,
                        rate: e.target.value,
                      })
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
              <button
                className="w-full bg-green-400 hover:bg-green-500 text-white font-black text-base py-4 rounded-full shadow-lg shadow-green-100 transition-all hover:scale-[1.02] mt-2"
                type="button"
                onClick={addMaterial}
              >
                Add Material
              </button>

              <hr />

              {materials.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                  //   style={{
                  //     display: "flex",
                  //     gap: "10px",
                  //     marginBottom: "10px",
                  //   }}
                >
                  <span>{item.name}</span>

                  <span>₹{item.rate}/kg</span>

                  <button
                    type="button"
                    className=" bg-red-500 hover:bg-red-600 text-white font-black text-base py-2 px-2 rounded-full shadow-lg shadow-green-100 transition-all hover:scale-[1.02] mt-2"
                    onClick={() => removeMaterial(index)}
                  >
                    <Trash2 />
                  </button>
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black text-base py-4 rounded-full shadow-lg shadow-green-100 transition-all hover:scale-[1.02] mt-2"
              >
                {profileExists ? "Update Profile" : "Save Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
