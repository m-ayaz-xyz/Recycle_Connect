import { RECYCLING_TIPS } from "@/lib/data";

export default function TipsSection() {
  return (
    <section id="tips" className="py-16 px-6 bg-green-50">
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-3xl font-black text-gray-900 mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Recycling Tips
        </h2>
        <p className="text-gray-500 mb-10 text-sm">
          Smart tips to maximize your recycling earnings
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RECYCLING_TIPS.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm"
            >
              <div className="text-4xl mb-4">{t.icon}</div>
              <div className="font-bold text-gray-900 text-sm mb-2">{t.title}</div>
              <div className="text-gray-500 text-xs leading-relaxed">{t.tip}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
