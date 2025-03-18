"use client";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const successStories = [
  { before: "/beforeandafterone.jpg" },
  { before: "/beforeandaftertwo.jpg" },
  { before: "/beforeandafterthree.jpg" },
  { before: "/beforeandafterfour.jpg" },
];

const dietPlans = [
  {
    id: 1,
    title: "Atkins Diet",
    image: "/atkinsdiet.jpg",
  },
  {
    id: 2,
    title: "Low Fat Diet",
    image: "/lowfatdiet.jpg",
  },
  {
    id: 3,
    title: "Low Carb Diet",
    image: "/lowcarbdiet.jpg",
  },
  {
    id: 4,
    title: "Keto Diet",
    image: "/greenvegetableone.jpg",
  },
  {
    id: 5,
    title: "Mediterranean Diet",
    image: "/mediterraneandietone.jpg",
  },
];

const diets = [
  { name: "RawFoodDiet", label: "Raw Food Diet", image: "/anythingdiet.png" },
  { name: "keto", label: "Keto", image: "/ketodiet.png" },
  { name: "mediterranean", label: "Mediterranean", image: "/mediterranean.png" },
  { name: "paleo", label: "Paleo", image: "/paleo.png" },
  { name: "vegan", label: "Vegan", image: "/vegan.png" },
  { name: "vegetarian", label: "Vegetarian", image: "/vegetarian.png" },
  { name: "lowcarb", label: "Low Carb", image: "/lowcarb.png" },
  { name: "highprotein", label: "High Protein", image: "/highprotein.png" },
  { name: "glutenfree", label: "Gluten Free", image: "/glutenfree.png" },
  { name: "dairyfree", label: "Dairy Free", image: "/dairyfree.png" },
];

interface FAQItem {
  question: string;
  answer: string;
}

const Page = () => {
  const [showList, setShowList] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [selectedDiet, setSelectedDiet] = useState<string>("anything");
  const [calories, setCalories] = useState<number>(223);
  const [meals, setMeals] = useState<number>(1);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const [gender, setGender] = useState<"male" | "female">("male");
  const [isOpen, setIsOpen] = useState(false);
  const [year, setYear] = useState<number | "">("");
  const [feet, setFeet] = useState<number | "">("");
  const [inches, setInches] = useState<number | "">("");
  const [weightKg, setWeightKg] = useState<number | "">("");
  const [bmi, setBmi] = useState<number>(0);
  const [angle, setAngle] = useState<number>(-90);
  const [showGauge, setShowGauge] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const minBMI = 16;
    const maxBMI = 35;
    const minAngle = -90;
    const maxAngle = 90;

    let effectiveBMI = bmi;
    if (effectiveBMI < minBMI) effectiveBMI = minBMI;
    if (effectiveBMI > maxBMI) effectiveBMI = maxBMI;

    const newAngle =
      ((effectiveBMI - minBMI) / (maxBMI - minBMI)) * (maxAngle - minAngle) +
      minAngle;
    setAngle(newAngle);
  }, [bmi]);

  function handleCalculate() {
    if (year === "" || feet === "" || inches === "" || weightKg === "") {
      alert("Please fill out all fields (Age, Feet, Inches, Weight).");
      return;
    }

    const yearNum = Number(year);
    const feetNum = Number(feet);
    const inchesNum = Number(inches);
    const weightNum = Number(weightKg);

    if (yearNum <= 0 || feetNum <= 0 || inchesNum < 0 || weightNum <= 0) {
      alert("Please enter valid values.");
      return;
    }

    const totalInches = feetNum * 12 + inchesNum;
    const heightMeters = totalInches * 0.0254;
    const newBmi = weightNum / (heightMeters * heightMeters);
    setBmi(newBmi);
    setShowGauge(true);
  }

  const faqs: FAQItem[] = [
    {
      question: "How does the meal planner work?",
      answer:
        "The meal planner automatically generates a diet plan based on your preferences and goals.",
    },
    {
      question: "Will I need to update my diet meal plan often?",
      answer:
        "It’s a good idea to update your plan if your goals or preferences change significantly.",
    },
    {
      question: "How many meals a day should I eat?",
      answer:
        "This depends on personal preference. Some prefer 3 main meals, others opt for 5-6 smaller meals.",
    },
    {
      question: "How much exercise should I do?",
      answer:
        "Aim for at least 150 minutes of moderate aerobic activity weekly, plus strength training twice a week.",
    },
    {
      question: "Do you offer training plans and 1 on 1 support?",
      answer:
        "Yes, we provide personalized training plans and one-on-one coaching to help you achieve your goals.",
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const dietMacros: Record<string, { carbs: number; fat: number; protein: number }> = {
    rawfooddiet: { carbs: 0.4, fat: 0.3, protein: 0.3 },
    keto: { carbs: 0.05, fat: 0.75, protein: 0.2 },
    mediterranean: { carbs: 0.45, fat: 0.35, protein: 0.2 },
    paleo: { carbs: 0.3, fat: 0.4, protein: 0.3 },
    vegan: { carbs: 0.5, fat: 0.2, protein: 0.3 },
    vegetarian: { carbs: 0.5, fat: 0.25, protein: 0.25 },
    lowcarb: { carbs: 0.2, fat: 0.5, protein: 0.3 },
    highprotein: { carbs: 0.3, fat: 0.2, protein: 0.5 },
    glutenfree: { carbs: 0.4, fat: 0.3, protein: 0.3 },
    dairyfree: { carbs: 0.4, fat: 0.3, protein: 0.3 },
  };

  const calculateMacros = (cals: number, mealsCount: number, diet: string) => {
    const key = diet.toLowerCase();
    const ratio = dietMacros[key];
    if (!ratio) return { carbs: "0", fat: "0", protein: "0" };

    const totalCarbs = (cals * ratio.carbs) / 4;
    const totalFat = (cals * ratio.fat) / 9;
    const totalProtein = (cals * ratio.protein) / 4;

    return {
      carbs: totalCarbs.toFixed(0),
      fat: totalFat.toFixed(0),
      protein: totalProtein.toFixed(0),
    };
  };

  const macros = calculateMacros(calories, meals, selectedDiet);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const nextSlide = () => {
    if (startIndex < dietPlans.length - slidesToShow) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNavigation = (item: string): void => {
    if (item === "Calculator") {
      const section: HTMLElement | null = document.getElementById("calculator-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="bg-gray-200">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 w-[50%] md:w-[10%] sm:w-[10%]">
            <Image
              src="/logoone.png"
              alt="Health Logo"
              width={150}
              height={50}
              className="hover:scale-110 transition-transform duration-300 w-full object-contain"
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            <ul className="flex gap-8">
              {["Create Diet Plan", "Calculator", "Article"].map((item, index) => (
                <li
                  key={index}
                  className="transition duration-300 cursor-pointer font-serif bg-green-600 h-[50px] flex items-center justify-center rounded-[15px] w-full md:w-[200px] text-white text-[20px]"
                  onClick={() => {
                    if (item === "Calculator") {
                      onclick = (() => handleNavigation(item));
                    } else {
                      onclick = (() => router.push("/rankingeek/userinfo"));
                    }
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-purple-700 text-3xl focus:outline-none"
              aria-label="Open Menu"
            >
              ☰
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-purple-100 p-4 rounded-b-lg shadow-md">
            <ul className="space-y-4">
              {["Create Diet Plan", "Calculator", "Article"].map((item, index) => (
                <li key={index} className="text-lg text-purple-800 font-semibold hover:text-purple-600 cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
      <section>
        <div className="relative w-full h-screen flex flex-col justify-center items-center text-white">
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          {!showList && (
            <div className="relative z-10 flex justify-center items-center w-full max-w-lg">
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
                <input
                  type="text"
                  placeholder="Search your diet plan"
                  className="w-full px-12 py-3 rounded-full text-black text-lg border-none shadow-lg outline-none transition focus:ring-4 focus:ring-green-400 cursor-pointer"
                  onClick={() => router.push("/rankingeek/userinfo")}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
        {showList && (
          <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center transition-all duration-300">
            <button
              className="absolute top-6 right-6 text-3xl text-gray-500 hover:text-black"
              onClick={() => {
                setShowList(false);
                setSearchTerm("");
              }}
            >
              ✖
            </button>
            <div className="mt-6 flex justify-center items-center w-full max-w-lg">
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
                <input
                  type="text"
                  placeholder="Search your diet plan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-12 py-3 rounded-full text-gray-700 text-lg border border-gray-300 shadow-md outline-none transition focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          </div>
        )}
      </section>
      <section
        style={{
          backgroundImage: "url('/backgroundone.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full py-12">
          <div className="max-w-5xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              Choose A Diet Plan Right For You
            </h2>
            <p className="text-black-600 mt-2 font-serif">
              We build custom diet plans but we also offer popular diets.
            </p>
          </div>
          <div className="relative max-w-5xl mx-auto mt-6 flex justify-center">
            <button
              type="button"
              onClick={prevSlide}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition mx-2 ${
                startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={startIndex === 0}
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className={`bg-white p-3 rounded-full shadow-lg hover:bg-gray-200 transition mx-2 ${
                startIndex >= dietPlans.length - slidesToShow ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={startIndex >= dietPlans.length - slidesToShow}
            >
              <FaChevronRight size={20} />
            </button>
          </div>
          <div className="relative max-w-5xl mx-auto mt-6 px-4">
            <div className="flex gap-4 overflow-hidden">
              {dietPlans
                .slice(startIndex, startIndex + slidesToShow)
                .map((diet) => (
                  <div
                    key={diet.id}
                    className="relative flex-1 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <Image
                      src={diet.image}
                      alt={diet.title}
                      width={500}
                      height={300}
                      className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover transition-transform duration-300 hover:rotate-3 hover:scale-110 rounded-[20px]"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                      <h3 className="text-lg font-semibold font-serif text-white hover:text-purple-900">
                        {diet.title}
                      </h3>
                      <button
                        className="mt-2 bg-white text-black px-4 py-2 rounded-md font-bold text-sm transition-transform duration-300 hover:scale-110 hover:bg-yellow-400 font-serif"
                        onClick={() => router.push("/rankingeek/userinfo")}
                      >
                        CHOOSE
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section
        style={{
          backgroundImage: "url('/backgroundtwo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="min-h-screen text-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-4xl font-bold font-serif">Preferred Diet</h1>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              {diets.map((diet) => (
                <div
                  key={diet.name}
                  onClick={() => setSelectedDiet(diet.name)}
                  className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedDiet === diet.name
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Image
                    src={diet.image}
                    alt={diet.label}
                    width={80}
                    height={80}
                    className="w-20 h-20 mb-2 object-contain rounded-[40px]"
                  />
                  <span className="text-sm font-medium">{diet.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-8">
              <div className="flex items-center mb-4 sm:mb-0">
                <label className="mr-2 font-semibold text-blue-500 font-serif text-[20px]">
                  I want to eat
                </label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-24 border p-2 rounded text-center"
                />
                <span className="ml-2 text-red-800 font-serif text-[20px]">
                  calories
                </span>
              </div>
              <div className="flex items-center">
                <label className="mr-2 font-semibold text-black font-serif text-[20px]">
                  in
                </label>
                <input
                  type="number"
                  value={meals}
                  onChange={(e) => setMeals(Number(e.target.value))}
                  className="w-16 border p-2 rounded text-center"
                />
                <span className="ml-2 text-yellow-900 font-serif text-[20px]">
                  meals
                </span>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-black text-[20px] font-serif">
                At least{" "}
                <span className="font-semibold text-blue-500 font-serif text-[25px]">
                  {macros.carbs}g
                </span>{" "}
                Carbs
              </p>
              <p className="text-black text-[20px] font-serif">
                At least{" "}
                <span className="font-semibold text-red-500 font-serif text-[25px]">
                  {macros.fat}g
                </span>{" "}
                Fat
              </p>
              <p className="text-black text-[20px] font-serif">
                At least{" "}
                <span className="font-semibold text-yellow-600 font-serif text-[25px]">
                  {macros.protein}g
                </span>{" "}
                Protein
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-blue-600 text-[20px] font-serif"
                onClick={() => router.push("/rankingeek/userinfo")}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="calculator-section"
        style={{
          backgroundImage: "url('/backgroundfour.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 transform hover:scale-105">
            <h2 className="text-center text-2xl font-bold text-gray-700 mb-6 font-serif">
              Choose gender
            </h2>
            <div className="flex items-center justify-center gap-8 mb-8">
              <div
                onClick={() => setGender("male")}
                className={`flex flex-col items-center cursor-pointer p-4 rounded-full bg-gray-200 transition-all border ${
                  gender === "male" ? "border-2 border-blue-500" : "border-gray-300"
                }`}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image src="/male.png" alt="Male" width={96} height={96} className="w-full h-full object-cover" />
                </div>
                <span className="mt-2 text-lg font-semibold text-gray-700 font-serif">
                  Male
                </span>
              </div>
              <div
                onClick={() => setGender("female")}
                className={`flex flex-col items-center cursor-pointer p-4 rounded-full bg-gray-200 transition-all border ${
                  gender === "female" ? "border-2 border-blue-500" : "border-gray-300"
                }`}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image src="/female.png" alt="Female" width={96} height={96} className="w-full h-full object-cover" />
                </div>
                <span className="mt-2 text-lg font-semibold text-gray-700 font-serif">
                  Female
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 25"
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Height (Feet)
                </label>
                <input
                  type="number"
                  value={feet}
                  onChange={(e) => setFeet(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 5"
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Height (Inches)
                </label>
                <input
                  type="number"
                  value={inches}
                  onChange={(e) => setInches(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 6"
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="e.g. 70"
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleCalculate}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-8 rounded shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
              >
                I AM READY TO CHECK THE RESULTS
              </button>
            </div>
            {showGauge && (
              <div className="mt-10 flex flex-col items-center">
                <h2 className="text-xl font-bold mb-6 text-gray-800 font-serif">
                  BMI Gauge
                </h2>
                <div className="gauge-container relative w-[220px] h-[110px] sm:w-[300px] sm:h-[150px]">
                  <div
                    className="gauge-base absolute w-full h-full rounded-t-full"
                    style={{
                      background: `
                        conic-gradient(
                          #00bfff 0deg 90deg,
                          #008000 90deg 180deg,
                          #ffcc00 180deg 270deg,
                          #ff9900 270deg 360deg
                        )
                      `,
                    }}
                  />
                  <div className="gauge-mask absolute w-[68%] h-[85%] bg-white rounded-t-full top-[35px] left-[30px] sm:top-[50px] sm:left-[48px]" />
                  <div
                    className="gauge-needle absolute w-[5px] h-[80px] sm:h-[110px] bg-black top-1/4 left-1/2 origin-bottom rounded-sm transition-transform duration-1000 ease-in-out"
                    style={{ transform: `rotate(${angle}deg)` }}
                  />
                  <div className="bmi-labels absolute w-full h-full top-0 left-0 hidden lg:block">
                    <span className="underweight absolute top-[50px] lg:top-[70px] right-[160px] lg:right-[290px] text-[15px] lg:text-[14px] font-bold text-black font-serif">
                      18
                    </span>
                    <span className="normal absolute left-[43%] bottom-[80px] lg:bottom-[150px] text-[12px] lg:text-[14px] font-bold text-black font-serif">
                      25
                    </span>
                    <span className="overweight absolute right-[1%] top-[60px] text-[12px] lg:text-[14px] font-bold text-black font-serif">
                      30
                    </span>
                  </div>
                </div>
                <div className="legend flex flex-col sm:flex-row justify-center gap-3 mt-10">
                  <div className="legend-item flex items-center gap-1 font-bold font-serif">
                    <div className="color-box w-4 h-4 sm:w-5 sm:h-5" style={{ background: "#ffcc00" }} />
                    <span className="text-[12px] sm:text-[14px]">Underweight</span>
                  </div>
                  <div className="legend-item flex items-center gap-1 font-bold">
                    <div className="color-box w-4 h-4 sm:w-5 sm:h-5" style={{ background: "#ff9900" }} />
                    <span className="text-[12px] sm:text-[14px]">Normal</span>
                  </div>
                  <div className="legend-item flex items-center gap-1 font-bold">
                    <div className="color-box w-4 h-4 sm:w-5 sm:h-5" style={{ background: "#00bfff" }} />
                    <span className="text-[12px] sm:text-[14px]">Overweight</span>
                  </div>
                  <div className="legend-item flex items-center gap-1 font-bold">
                    <div className="color-box w-4 h-4 sm:w-5 sm:h-5" style={{ background: "#008000" }} />
                    <span className="text-[12px] sm:text-[14px]">Obesity</span>
                  </div>
                </div>
                <p className="bmi-value text-xl sm:text-2xl font-bold mt-5 text-gray-800 font-serif">
                  BMI = {bmi.toFixed(1)} kg/m<sup>2</sup>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section
        style={{
          backgroundImage: "url('/backgroundthree.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto py-12 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 font-serif">
            Success Stories
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-serif">
            Experience dramatic progress within 12 weeks
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-[30px] md:gap-y-20">
            {successStories.map((story, index) => (
              <div key={index} className="flex items-center space-x-[5px] md:space-x-1">
                <div className="relative w-26 md:w-48 h-56 md:h-72 overflow-hidden rounded-lg shadow-lg border">
                  <Image src={story.before} alt={`Before ${index + 1}`} width={200} height={300} className="h-full w-full object-fit" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        style={{
          backgroundImage: "url('/backgroundtwo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="min-h-screen">
          <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 font-serif">
              Frequently Asked Questions
            </h1>
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={index} className="bg-white rounded-lg shadow p-4">
                    <button
                      onClick={() => handleToggle(index)}
                      className="flex w-full justify-between items-center focus:outline-none"
                    >
                      <span className="text-lg font-medium">{faq.question}</span>
                      <span className="text-2xl font-bold">{isOpen ? "-" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="mt-2 text-gray-600">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="relative w-full h-screen flex flex-col justify-center items-center text-white">
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="/gymvideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          {!showList && (
            <div className="relative z-10 flex justify-center items-center w-full max-w-lg">
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
                <input
                  type="text"
                  placeholder="Search your diet plan"
                  className="w-full px-12 py-3 rounded-full text-black text-lg border-none shadow-lg outline-none transition focus:ring-4 focus:ring-green-400 cursor-pointer"
                  onClick={() => router.push("/rankingeek/frontend")}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
        {showList && (
          <div className="fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center transition-all duration-300">
            <button
              className="absolute top-6 right-6 text-3xl text-gray-500 hover:text-black"
              onClick={() => {
                setShowList(false);
                setSearchTerm("");
              }}
            >
              ✖
            </button>
            <div className="mt-6 flex justify-center items-center w-full max-w-lg">
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
                <input
                  type="text"
                  placeholder="Search your diet plan"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-12 py-3 rounded-full text-gray-700 text-lg border border-gray-300 shadow-md outline-none transition focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>
          </div>
        )}
      </section>
      <footer
        className="relative bg-cover bg-center bg-no-repeat text-white mt-12"
        style={{
          backgroundImage: "url('/gym-diet2.jpg')",
        }}
      >
        <div className="absolute -top-8 left-0 w-full">
          <svg className="w-full h-16 fill-[#8dc63f]" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path
              fillOpacity="1"
              d="M0,224L60,213.3C120,203,240,181,360,170.7C480,160,600,160,720,181.3C840,203,960,245,1080,240C1200,235,1320,181,1380,154.7L1440,128L1440,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="relative z-10 bg-black bg-opacity-80 py-10 px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center md:text-left">
              <Image src="/logoone.png" alt="Health Logo" width={200} height={120} className="h-[120px] mt-[-30px]" />
              <p>Gym diet plan</p>
              <h3 className="text-2xl font-bold mt-3 text-white">fitmeal</h3>
              <p className="text-gray-300 mt-3 leading-relaxed">
                Integer maximus accumsan nunc, sit amet tempor lectus facilisis eu.
                Vestibulum convallis ipsum id aliquam varius.
              </p>
              <div className="flex justify-center md:justify-start gap-4 mt-5">
                {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center bg-[#8dc63f] rounded-full transition-transform duration-300 transform hover:scale-110 hover:shadow-lg"
                  >
                    <Icon className="text-white" />
                  </a>
                ))}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-[#8dc63f] font-bold text-xl mb-4">Explore</h4>
              <ul className="space-y-3">
                {["Home", "Blog", "Products", "Clients", "Contact Us"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 transition-transform duration-300 transform hover:translate-x-1 hover:text-[#8dc63f]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-[#8dc63f] font-bold text-xl mb-4">Contact Info</h4>
              <p className="text-gray-300">
                <span className="font-semibold text-[#8dc63f]">Our Location:</span>
                <br />
                Goldschmidtstraße 13, 04103 Leipzig
              </p>
              <p className="mt-4 text-gray-300">
                <span className="font-semibold text-[#8dc63f]">Phones:</span>
                <br />
                +49078-039-23-11
                <br />
                +49078-028-55-60
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Page;
