
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define API configuration
const config = {
  cUrl: "https://api.countrystatecity.in/v1/countries",
  ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
};

// Define Zod schema for form validation
const signupFormData = z.object({
  age: z.string().min(1, { message: "Age is required" }),
  gender: z.string().min(1, { message: "Gender is required" }),
  heightFt: z.string().min(1, { message: "Height in feet is required" }),
  heightIn: z.string().min(1, { message: "Height in inches is required" }),
  weight: z.string().min(1, { message: "Weight is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  dob: z.string().min(1, { message: "Date of birth is required" }), // Add DOB validation
});

type SignupFormData = z.infer<typeof signupFormData>;

// Define types for API data
type Country = {
  name: string;
  code: string;
};

type State = {
  name: string;
};

export default function DemographicForm() {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupFormData),
  });

  // Fetch countries using the CountryStateCity API
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(config.cUrl, {
          headers: { "X-CSCAPI-KEY": config.ckey },
        });
        const data = await res.json();
        // Map API data to our Country type
        const transformed: Country[] = data
          .map((country: any) => ({
            name: country.name, // API returns name as a string
            code: country.iso2, // Using iso2 as our country code
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(transformed);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  // Fetch states for the selected country
  useEffect(() => {
    async function fetchStates() {
      if (!selectedCountry) return;
      try {
        const res = await fetch(
          `${config.cUrl}/${selectedCountry}/states`,
          {
            headers: { "X-CSCAPI-KEY": config.ckey },
          }
        );
        const data = await res.json();
        // Map API data to our State type
        const transformed: State[] = data.map((state: any) => ({
          name: state.name,
        }));
        setStates(transformed);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    }
    fetchStates();
  }, [selectedCountry]);

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/demographics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/datingsoftware/healthinfo");
      } else {
        const result = await res.json();
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 font-serif">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6 text-blue">
          Basic Demographics
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Age and Gender */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">Age</label>
              <input
                type="number"
                {...register("age")}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your age"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age.message}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">Gender</label>
              <select
                {...register("gender")}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender male">Transgender Male</option>
                <option value="transgender female">Transgender Female</option>
                <option value="non-binary">Non-Binary</option>
                <option value="genderqueer">Genderqueer</option>
                <option value="genderfluid">Genderfluid</option>
                <option value="agender">Agender</option>
                <option value="bigender">Bigender</option>
                <option value="androgynous">Androgynous</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Height (Feet and Inches) */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">
                Height (Feet)
              </label>
              <input
                type="number"
                {...register("heightFt")}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Feet"
              />
              {errors.heightFt && (
                <p className="text-red-500 text-sm">{errors.heightFt.message}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">
                Height (Inches)
              </label>
              <input
                type="number"
                {...register("heightIn")}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Inches"
              />
              {errors.heightIn && (
                <p className="text-red-500 text-sm">{errors.heightIn.message}</p>
              )}
            </div>
          </div>

          {/* Weight and Country */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">Weight (Kg)</label>
              <input
                type="number"
                {...register("weight")}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter weight"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight.message}</p>
              )}
            </div>
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">Country</label>
              <select
                {...register("country")}
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedState("");
                  setStates([]);
                }}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>
          </div>

          {/* State and dob */}
          <div className="flex flex-row gap-4">
            <div className="w-1/2">
              <label className="text-gray-700 font-medium">State</label>
              <select
                {...register("state")}
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select State</option>
                {states.map((state, idx) => (
                  <option key={idx} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state.message}</p>
              )}
            </div>
            <div className="w-1/2">
            <label className="text-gray-700 font-medium">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>
      </div>
    {/* Submit Button */}
          <button
            type="submit"
            // className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
            className="w-full bg-green-600 text-white p-3 rounded-full shadow-md text-lg font-bold"
            disabled={loading}
          >
           Next 
          </button>
        </form>
      </div>
    </div>
  );
}







