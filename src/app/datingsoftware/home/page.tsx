"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Page = () => {
  const router = useRouter();

  const handleNext = () => {
    router.push('/datingsoftware/registration'); // Apne project ke hisaab se route update karein
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 flex flex-col items-center justify-center space-y-8 font-serif px-4">
      <h1 className="font-bold text-[28px] sm:text-[32px] md:text-[35px] text-pink-600 text-center">
        Welcome to the Online DatingApp
      </h1>
      <div className="logo-container relative rounded-full w-60 h-60 sm:w-64 sm:h-64 md:w-72 md:h-72 overflow-hidden">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          fill
          className="object-cover" 
        />
      </div>
      <button 
        onClick={handleNext} 
        className="px-4 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 bg-green-500 text-white rounded-full text-[16px] sm:text-[20px] md:text-[20px] sm:font-bold md:font-bold font-medium w-[90%] sm:w-[250px] md:w-[300px] transition-transform duration-300 transform hover:scale-105"
      >
        Next
      </button>
      <style jsx>{`
        .logo-container {
          perspective: 1000px;
          transform-style: preserve-3d;
          transition: transform 0.5s;
        }
        .logo-container:hover {
          transform: rotateY(15deg) rotateX(15deg);
        }
      `}</style>
    </div>
  );
};

export default Page;
