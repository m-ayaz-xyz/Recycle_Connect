"use client";

import { useState } from "react";

export default function EarningsCalc({ material, pricePerKg }) {
  const [weight, setWeight] = useState(5);
  const total = weight * pricePerKg;

  return (
    <div className="bg-white rounded-2xl border border-green-100 p-6">
      <h3 className="font-bold text-base text-gray-900 mb-4">Estimate Earnings</h3>
      <div className="flex items-center gap-4 mb-4">
        <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
          Weight (kg):
        </label>
        <input
          type="number"
          min={1}
          max={1000}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-24 border border-green-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="bg-green-50 rounded-xl px-5 py-4 text-sm text-gray-700">
        {weight} kg × ₹{pricePerKg}/kg ={" "}
        <span className="text-green-600 text-xl font-black">₹{total}</span>
      </div>
    </div>
  );
}
