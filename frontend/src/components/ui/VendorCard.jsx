import Link from "next/link";
import Stars from "@/components/ui/Stars";
import { Clock10 } from "lucide-react";

export default function VendorCard({ vendor }) {
  return (
    <Link href={`/dashboard/user/${vendor.username}`} className="block">
      <div className="group bg-white border border-green-100 rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:shadow-green-100 hover:border-green-300 transition-all duration-200">
        {/* Emoji grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {["📰", "🔩", "🧴", "♻️"].map((em, i) => (
            <div
              key={i}
              className="bg-green-50 rounded-xl h-12 flex items-center justify-center text-2xl group-hover:bg-green-100 transition-colors"
            >
              {em}
            </div>
          ))}
        </div>

        {/* Info */}
        <div className="font-semibold text-sm text-gray-900 mb-1 truncate">
          {vendor.shopNameEnglish}
          <p className="font-normal text-xs pt-1 text-gray-900">{vendor.shopNameHindi}</p>
        </div>
        <div className="text-xs text-gray-400 mb-3 truncate">{vendor.address}</div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {/* <Stars rating={vendor.rating} />
            <span className="text-xs text-gray-400">({vendor.reviews})</span> */}
            <Clock10 size={14} className="text-gray-400" />
            <span className="text-xs text-gray-400">
              {vendor.openingTime} - {vendor.closingTime}
            </span>
          </div>
          <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {vendor.distance} km
          </span>
        </div>
      </div>
    </Link>
  );
}
