"use client";

export default function OrderDetails({ order }) {
  if (!order) {
    return <p className="text-gray-500">No order data available</p>;
  }
  console.log(order);
  return (
    <div className="bg-white mb-3 rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold mb-6">Order Details</h2>

      {/* Order Info */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-500">Customer Name</span>
          <span className="font-medium">
  {order.userId.name.charAt(0).toUpperCase() + order.userId.name.slice(1)}
</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Contact</span>
          <span className="font-medium">{order.contactNo}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Pickup Date</span>
          <span className="font-medium">
            {new Date(order.pickupDate).toLocaleDateString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Pickup Time</span>
          <span className="font-medium">{order.pickupTime}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>

          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              order.status === "Completed"
                ? "bg-green-100 text-green-700"
                : order.status === "Accepted"
                  ? "bg-blue-100 text-blue-700"
                  : order.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Total Amount</span>
          <span className="font-bold text-green-600">₹{order.totalAmount}</span>
        </div>
      </div>

      {/* Materials */}
      <div>
        <h3 className="font-semibold mb-3">Materials</h3>

        <div className="space-y-3">
          {order?.materials?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border rounded-xl p-3 bg-green-50"
            >
              <div>
                <p className="font-medium">{item.name}</p>

                <p className="text-sm text-gray-500">{item.weight} kg</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-green-600">₹{item.rate}/kg</p>

                <p className="text-sm text-gray-500">
                  ₹{item.weight * item.rate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
