"use client";

import { MATERIAL_ICONS } from "@/lib/data";

export default function MaterialPriceList({ materials = [] }) {
  if (!materials.length) {
    return (
      <p className="text-sm text-gray-500">
        No materials available
      </p>
    );
  }

  return (
    <div>
      <h3 className="font-bold text-base text-gray-900 mb-4">
        Price List
      </h3>

      <div className="space-y-3">
        {materials.map((material) => (
          <div
            key={material._id}
            className="flex items-center justify-between bg-green-50 border border-green-400 rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {MATERIAL_ICONS[material.name] || "♻️"}
              </span>

              <span className="font-medium text-gray-800">
                {material.name}
              </span>
            </div>

            <span className="font-bold text-green-600">
              ₹{material.rate}/kg
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}