"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useRouter } from "next/navigation";

export default function UserOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const profileRes = await api.get("/auth/profile");

        if (profileRes.data.role !== "user") {
          router.push("/dashboard/vendor");
          return;
        }

        setUser(profileRes.data);

        const orderRes = await api.get("/dashboard/user/orders");

        setOrders(orderRes.data.orders);
        // console.log(orderRes.data.orders);
      } catch (err) {
        console.log(err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const cancelOrder = async (id) => {
    try {
      await api.patch(`/dashboard/user/orders/${id}/cancel`);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? {
                ...order,
                status: "cancelled",
              }
            : order,
        ),
      );
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user?.name} email={user?.email} />

      <div className="max-w-5xl mx-auto py-8 px-5">
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
        >
          ‹ Back
        </button>
        <h1
          className="text-3xl font-black text-gray-900 mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
          }}
        >
          My Pickup Requests
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border text-center">
            <h2 className="text-xl font-bold text-gray-700">
              No Pickup Requests Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Book your first pickup request.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {

              const canCancel =
    Date.now() - new Date(order.createdAt).getTime() <= 4 * 60 * 60 * 1000 &&
    order.status === "Pending";

              return(<div
                key={order._id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6"
              >
                {/* Header */}

                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">
                      {order.vendorId.shopNameEnglish}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      {order.vendorId.shopNameHindi}
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      {order.vendorId.address}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      order.status === "Accepted"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <hr className="my-5" />

                {/* Materials */}

                <h3 className="font-bold mb-3">Materials</h3>

                <div className="space-y-3">
                  {order.materials.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between border rounded-xl p-4"
                    >
                      <div>
                        <p className="font-semibold">{item.name}</p>

                        <p className="text-gray-500 text-sm">
                          {item.weight} kg
                        </p>
                      </div>

                      <div className="text-right">
                        <p>₹{item.rate}/kg</p>

                        <p className="font-bold text-green-600">
                          ₹{item.rate * item.weight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-5" />

                {/* Details */}

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <p className="text-gray-500 text-sm">Pickup Date</p>

                    <p className="font-semibold">
                      {new Date(order.pickupDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Pickup Time</p>

                    <p className="font-semibold">{order.pickupTime}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Contact Number</p>

                    <p className="font-semibold">{order.contactNo}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">Total Amount</p>

                    <p className="text-2xl font-black text-green-600">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                  <div className="mt-5">
                    {canCancel ? (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                      >
                        Cancel Order
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-gray-500">
                        <span>🚫</span>
                        <span>Order cannot be cancelled</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>)
})}
          </div>
        )}
      </div>
    </div>
  );
}
