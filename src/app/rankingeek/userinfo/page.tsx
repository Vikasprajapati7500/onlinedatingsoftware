"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email"),
  countryCode: z.string(),
});

type FormData = z.infer<typeof formSchema>;

type Country = {
  code: string;
  name: string;
};

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router=useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        const transformed: Country[] = data
          .map((country: any) => {
            if (country.idd?.root && country.idd?.suffixes?.length) {
              return {
                name: country.name.common || "",
                code: `${country.idd.root}${country.idd.suffixes[0]}`,
              };
            }
            return null;
          })
          .filter(Boolean)
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(transformed);
        setValue("countryCode", "+91");
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, [setValue]);

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/auth/userinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.push("/rankingeek/demographics");
      } else {
        const result = await res.json();
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  return (
    <div className="min-h-screen font-serif flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 p-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6 font-serif">User Info Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input {...register("name")} className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none" placeholder="Enter your name" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <div className="flex flex-col sm:flex-row">
              <select {...register("countryCode")} className="w-full sm:w-1/3 p-3 border rounded-lg outline-none">
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>{country.name} ({country.code})</option>
                ))}
              </select>
              <input {...register("phone")} className="w-full sm:w-2/3 p-3 border rounded-lg outline-none" placeholder="1234567890" />
            </div>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input {...register("email")} className="w-full p-3 border rounded-lg shadow-sm outline-none" placeholder="Enter your email" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-full bg-purple-600 text-white p-3 rounded-lg shadow-md hover:bg-purple-700">
            Submit
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}






