// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <section className=" bg-green-600 overflow-hidden min-h-[650px] flex items-center relative">
//       {/* Left content */}
//       <div className="relative z-10 flex-1 px-14 py-16 max-w-xl">
//         <h1
//           className="text-4xl font-black text-white leading-tight mb-8"
//           style={{ fontFamily: "'Playfair Display', serif" }}
//         >
//           Turn Your Waste into Wealth — Connect with Local Vendors and Get Paid
//           for Recycling Today!
//         </h1>
//         <Link
//           href="/auth/login"
//           className="inline-block bg-white text-gray-900 font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
//         >
//           Start Now
//         </Link>
//       </div>

//       {/* Right illustration circle */}
//       <div className="absolute right-[-50px] top-1/4 -translate-y-1/2 w-[750px] h-[750px] rounded-full bg-white flex items-center justify-center">
//           <Image className="mt-14" src="/images/hero_image.png" alt="Hero Illustration" width={400} height={400} />
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-green-600 min-h-screen lg:min-h-[650px] flex flex-col lg:flex-row items-center justify-between">
      {/* Left Content */}
      <div className="relative z-10 w-full lg:w-1/2 px-6 sm:px-10 lg:px-14 pt-16 lg:pt-0 pb-10 text-center lg:text-left">
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Turn Your Waste into Wealth — Connect with Local Vendors and Get Paid
          for Recycling Today!
        </h1>

        <Link
          href="/auth/login"
          className="inline-block mt-8 bg-white text-gray-900 font-bold text-base sm:text-lg px-8 py-3 sm:px-10 sm:py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200"
        >
          Start Now
        </Link>
      </div>

      {/* Right Image */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center py-10 lg:py-0">
        {/* White Circle */}
        <div
          className="
          w-[320px]
          h-[320px]
          sm:w-[420px]
          sm:h-[420px]
          md:w-[520px]
          md:h-[520px]
          lg:w-[700px]
          lg:h-[700px]
          rounded-full
          bg-white
          flex
          items-center
          justify-center
          "
        >
          <Image
            src="/images/hero_image.png"
            alt="Hero Illustration"
            width={420}
            height={420}
            priority
            className="
            w-[220px]
            sm:w-[280px]
            md:w-[340px]
            lg:w-[420px]
            h-auto
            "
          />
        </div>
      </div>
    </section>
  );
}
