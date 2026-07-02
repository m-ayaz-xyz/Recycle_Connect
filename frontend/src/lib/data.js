export const VENDORS = [
  {
    id: 1,
    name: "GreenIndia Recycling",
    nameHindi: "ग्रीनइंडिया रीसाइक्लिंग",
    address: "Shop 7, Near DJ Building, Hazratganj, Lucknow 226001",
    phone: "+91 934567890",
    hours: "Open 9am to 8pm (All 7 days)",
    rating: 4.5,
    reviews: 48,
    distance: "1.2 KM",
    city: "Lucknow",
    prices: { Newspaper: 10, Copper: 20, Plastic: 8, Iron: 30, "E-Waste": 50 },
    tags: ["Paper", "Metal", "Plastic"],
  },
  {
    id: 2,
    name: "Hindustan Recycling",
    nameHindi: "हिन्दुस्तान रीसाइक्लिंग",
    address: "Shop 2, Near HP Building, Alambagh, Lucknow 226005",
    phone: "+91 987654000",
    hours: "Open 8am to 9pm (Mon–Sat)",
    rating: 4.2,
    reviews: 31,
    distance: "2.3 KM",
    city: "Lucknow",
    prices: { Newspaper: 9, Copper: 18, Plastic: 7, Iron: 28, "E-Waste": 45 },
    tags: ["Paper", "Metal"],
  },
  {
    id: 3,
    name: "EverGreen Recycling LLP",
    nameHindi: "एवरग्रीन रीसाइक्लिंग एलएलपी",
    address: "Shop 1, Near HPI Building, Hazratganj, Lucknow 226020",
    phone: "+91 987654321",
    hours: "Open 9am to 10pm (All 7 days)",
    rating: 4.0,
    reviews: 31,
    distance: "3.1 KM",
    city: "Lucknow",
    prices: { Newspaper: 10, Copper: 20, Plastic: 8, Iron: 32, "E-Waste": 48 },
    tags: ["All Materials"],
  },
];

export const MATERIAL_ICONS = {
  Newspaper: "📰",
  Copper: "🔩",
  Plastic: "🧴",
  Iron: "⚙️",
  "E-Waste": "💻",
};

export const PICKUP_TIMES = ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM"];

export const HOW_IT_WORKS = [
  { icon: "📍", title: "Share Location", desc: "Allow location access to find vendors near you" },
  { icon: "🔍", title: "Browse Vendors", desc: "Compare prices and ratings from local recyclers" },
  { icon: "📅", title: "Schedule Pickup", desc: "Book a convenient date and time slot" },
  { icon: "💰", title: "Get Paid", desc: "Receive payment on collection — cash or UPI" },
];

export const RECYCLING_TIPS = [
  { icon: "📰", title: "Paper & Cardboard", tip: "Flatten boxes, remove food stains. Keep it dry for better rates." },
  { icon: "🧴", title: "Plastic", tip: "Clean bottles before selling. PET and HDPE fetch the highest prices." },
  { icon: "🔩", title: "Metal & Copper", tip: "Separate copper from aluminium and iron — each has different rates." },
  { icon: "💻", title: "E-Waste", tip: "Old phones, cables, PCBs are valuable. Never throw in regular bins." },
];
