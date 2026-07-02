// "use client";

// import { useState } from "react";
// import { MATERIAL_ICONS } from "@/lib/data";

// export default function PriceSelector({ prices, onSelect }) {
//   const [selected, setSelected] = useState(Object.keys(prices)[0]);

//   const handleSelect = (mat) => {
//     setSelected(mat);
//     onSelect(mat, prices[mat]);
//   };

//   return (
//     <div>
//       <h3 className="font-bold text-base text-gray-900 mb-4">Price List</h3>
//       <div className="flex gap-3 overflow-x-auto pb-2">
//         {Object.entries(prices).map(([mat, price]) => (
//           <button
//             key={mat}
//             onClick={() => handleSelect(mat)}
//             className={`min-w-[88px] rounded-xl p-3 text-center border-2 transition-all duration-150 flex-shrink-0 ${
//               selected === mat
//                 ? "bg-green-500 border-green-500 text-white"
//                 : "bg-green-50 border-green-100 text-gray-800 hover:border-green-300"
//             }`}
//           >
//             <div className="text-2xl mb-1">{MATERIAL_ICONS[mat] || "♻️"}</div>
//             <div className="text-xs font-semibold">{mat}</div>
//             <div
//               className={`text-sm font-bold mt-0.5 ${
//                 selected === mat ? "text-white" : "text-green-600"
//               }`}
//             >
//               ₹{price}/kg
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// export default function PriceSelector({
//   materials = [],
//   onSelect,
// }) {
//   const [selected, setSelected] = useState("");

//   useEffect(() => {
//     if (materials.length > 0) {
//       setSelected(materials[0].name);
//       onSelect(materials[0]);
//     }
//   }, [materials]);

//   const handleSelect = (material) => {
//     setSelected(material.name);
//     onSelect(material);
//   };

//   return (
//     <div className="flex flex-col gap-3">
//       {materials.map((material) => (
//         <button
//           key={material.name}
//           onClick={() => handleSelect(material)}
//           className={`border rounded-lg p-3 text-left ${
//             selected === material.name
//               ? "border-green-500 bg-green-50"
//               : "border-gray-200"
//           }`}
//         >
//           <div className="font-semibold">
//             {material.name}
//           </div>

//           <div className="text-green-600">
//             ₹{material.rate}/kg
//           </div>
//         </button>
//       ))}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { MATERIAL_ICONS } from "@/lib/data";

export default function PriceSelector({
  materials = [],
  onSelect,
}) {
  const [selected, setSelected] = useState("");

  // Sirf jab materials first time aaye tab default select karo
  useEffect(() => {
    if (materials.length > 0 && !selected) {
      setSelected(materials[0].name);
      onSelect(materials[0]);
    }
  }, [materials]);

  const handleSelect = (material) => {
    setSelected(material.name);
    onSelect(material);
  };

  return (
    <div>
      <h3 className="font-bold text-base text-gray-900 mb-4">
        Price List
      </h3>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {materials.map((material) => (
          <button
            key={material._id || material.name}
            type="button"
            onClick={() => handleSelect(material)}
            className={`min-w-[88px] rounded-xl p-3 text-center border-2 transition-all duration-150 flex-shrink-0 ${
              selected === material.name
                ? "bg-green-500 border-green-500 text-white"
                : "bg-green-50 border-green-100 text-gray-800 hover:border-green-300"
            }`}
          >
            <div className="text-2xl mb-1">
              {MATERIAL_ICONS[material.name] || "♻️"}
            </div>

            <div className="text-xs font-semibold">
              {material.name}
            </div>

            <div
              className={`text-sm font-bold mt-0.5 ${
                selected === material.name
                  ? "text-white"
                  : "text-green-600"
              }`}
            >
              ₹{material.rate}/kg
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}