"use client";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-400">
    <div className=" relative overflow-hidden p-32  text-white">
      {/* Floating Items */}
      <div className="absolute top-8 left-10 text-4xl animate-bounce">
        📰
      </div>

      <div
        className="absolute top-16 right-16 text-4xl"
        style={{
          animation: "float 2s ease-in-out infinite",
        }}
      >
        🧴
      </div>

      <div
        className="absolute bottom-10 left-20 text-4xl"
        style={{
          animation: "float 2s ease-in-out infinite",
        }}
      >
        🔩
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div
          className="text-8xl mb-4"
          style={{
            animation: "spin 8s linear infinite",
          }}
        >
          ♻️
        </div>

        <h1 className="text-4xl font-bold mb-3">
          Loading Recycle Connect...
        </h1>

        <h3 className="text-2xl font-normal mb-3">
          Turn Waste Into Value
        </h3>

        <p className="text-green-100 max-w-lg">
          Schedule pickups, connect with recyclers, and help build a
          cleaner and greener future.
        </p>

        {/* <button className="mt-6 px-6 py-3 bg-white text-green-600 rounded-full font-semibold hover:scale-105 transition">
          Start Recycling
        </button> */}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
    </div>

  );
}