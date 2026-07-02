import { HOW_IT_WORKS } from "@/lib/data";

export default function HowItWorksSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2
        className="text-3xl font-black text-center text-gray-900 mb-12"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HOW_IT_WORKS.map((step, i) => (
          <div
            key={i}
            className="bg-white border border-green-100 rounded-2xl p-7 text-center shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-200"
          >
            <div className="text-5xl mb-4">{step.icon}</div>
            <div className="font-bold text-gray-900 text-base mb-2">{step.title}</div>
            <div className="text-gray-500 text-sm leading-relaxed">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
