"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { useRouter } from "next/navigation";
import OrderDetails from "@/components/ui/OrderDetail";

export default function UserOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const profileRes = await api.get("/auth/profile");

        if (profileRes.data.role !== "vendor") {
          router.push("/dashboard/user");
          return;
        }

        setUser(profileRes.data);

        const orderRes = await api.get("/dashboard/vendor/orders");
        setOrders(orderRes.data);
        
      } catch (err) {
        console.log(err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return <LoadingScreen />;
  }

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  // const acceptedOrders = orders.filter(
  //   (order) => order.status === "Accepted"
  // ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

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
          Orders
        </h1>

        <div className="flex flex-col gap-5 p-3 md:flex-row">
          <div className="flex flex-col gap-3 p-5 bg-blue-300 rounded-xl w-full mb-4">
            <h2 className="text-center">Total Orders</h2>
            <p className="font-bold text-5xl text-center">{totalOrders}</p>
          </div>
          <div className="flex flex-col gap-3 p-5 bg-orange-300 rounded-xl w-full mb-4">
            <h2 className="text-center">Pending Orders</h2>
            <p className="font-bold text-5xl text-center">{pendingOrders}</p>
          </div>
          <div className="flex flex-col gap-3 p-5 bg-green-500 rounded-xl w-full mb-4">
            <h2 className="text-center">Completed Orders</h2>
            <p className="font-bold text-5xl text-center">{completedOrders}</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 border text-center">
            <h2 className="text-xl font-bold text-gray-700">No Orders</h2>
          </div>
        ) : (
          <div className="space-y-6">
            {orders?.map((order) => (
              <OrderDetails key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
