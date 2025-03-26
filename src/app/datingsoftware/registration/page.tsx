// "use client";
// import { useState, useEffect } from "react";
// import { signIn, signOut, useSession } from 'next-auth/react'
// import React from 'react'
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";

// const formSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   phone: z.string().min(10, "Invalid phone number"),
//   email: z.string().email("Invalid email"),
//   countryCode: z.string(),
//   password: z.string().min(1, "Password Required"),
// });

// type FormData = z.infer<typeof formSchema>;

// type Country = {
//   code: string;
//   name: string;
// };

// export default function Home() {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(formSchema),
//   });

//   useEffect(() => {
//     async function fetchCountries() {
//       try {
//         const res = await fetch("https://restcountries.com/v3.1/all");
//         const data = await res.json();
//         const transformed: Country[] = data
//           .map((country: any) => {
//             if (country.idd?.root && country.idd?.suffixes?.length) {
//               return {
//                 name: country.name.common || "",
//                 code: `${country.idd.root}${country.idd.suffixes[0]}`,
//               };
//             }
//             return null;
//           })
//           .filter(Boolean)
//           .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
//         setCountries(transformed);
//         setValue("countryCode", "+91");
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     }
//     fetchCountries();
//   }, [setValue]);

//   async function onSubmit(data: FormData) {
//     try {
//       const res = await fetch("/api/auth/userinfo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (res.ok) {
//         router.push("/rankingeek/demographics");
//       } else {
//         const result = await res.json();
//         setError(result.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.error("Registration error:", error);
//     }
//   }

// const session = useSession();
// console.log(session);


//   return (
//     <div className="min-h-screen font-serif flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 p-6">
//       <div className="flex flex-col md:flex-row w-full max-w-4xl">
//         {/* Form Section */}
//         <motion.div
//           initial={{ scale: 0.8, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white p-8 rounded-xl shadow-xl w-full md:w-2/3"
//         >
//           <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
//             User Information
//           </h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 font-medium">
//                 Name
//               </label>
//               <input
//                 {...register("name")}
//                 className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none"
//                 placeholder="Enter your name"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm">{errors.name.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium">
//                 Phone Number
//               </label>
//               <div className="flex flex-col sm:flex-row">
//                 <select
//                   {...register("countryCode")}
//                   className="w-full sm:w-1/3 p-3 border rounded-lg outline-none"
//                 >
//                   {countries.map((country) => (
//                     <option key={country.code} value={country.code}>
//                       {country.name} ({country.code})
//                     </option>
//                   ))}
//                 </select>
//                 <input
//                   {...register("phone")}
//                   className="w-full sm:w-2/3 p-3 border rounded-lg outline-none"
//                   placeholder="1234567890"
//                 />
//               </div>
//               {errors.phone && (
//                 <p className="text-red-500 text-sm">{errors.phone.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium">
//                 Email
//               </label>
//               <input
//                 {...register("email")}
//                 className="w-full p-3 border rounded-lg shadow-sm outline-none"
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 {...register("password")}
//                 className="w-full p-3 border rounded-lg shadow-sm outline-none"
//                 placeholder="Enter your password"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {error && <p className="text-red-500 text-center">{error}</p>}

//             <motion.button
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               type="submit"
//               className="w-full bg-green-600 text-white p-3 rounded-full shadow-md text-lg font-bold"
//             >
//               Next
//             </motion.button>
//           </form>
//         </motion.div>

//         {/* Social Signup Section */}
//         <div className="w-full md:w-1/3 p-8 flex flex-col items-center justify-center mt-6 md:mt-0 md:ml-6">
     
//           <button
//            onClick={() => signIn("google")}
//             className="w-full flex items-center justify-center p-3 bg-white border border-gray-300 rounded-md shadow-sm mb-4 hover:bg-gray-50 transition"
//           >
//             <FaGoogle className="mr-2 text-yellow-500 h-8 w-8"/>
//             Sign up with Google
//           </button>
//           <button
          
//             className="w-full flex items-center justify-center p-3 bg-white border border-gray-300 rounded-md shadow-sm mb-4 hover:bg-gray-50 transition"
//           >
//             <FaFacebook className="mr-2 text-blue-600 h-8 w-8"/>
//             Sign up with Facebook
//           </button>
//           <button
           
//             className="w-full flex items-center justify-center p-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition"
//           >
//             <FaInstagram className="mr-2 text-pink-600 h-8 w-8"/>
//             Sign up with Instagram
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";  // Import reCAPTCHA

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email"),
  countryCode: z.string(),
  password: z.string().min(1, "Password Required"),
  recaptcha: z.string().min(1, "Please complete the reCAPTCHA"), // Add reCAPTCHA field
});

type FormData = z.infer<typeof formSchema>;

type Country = {
  code: string;
  name: string;
};

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null); // Store the reCAPTCHA token
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
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
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA");
      return;
    }

    try {
      const res = await fetch("/api/auth/userinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptcha: recaptchaToken }),
      });
      if (res.ok) {
        router.push("/datingsoftware/basicsdemographic");
      } else {
        const result = await res.json();
        setError(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  const session = useSession();
  console.log(session);

  const handleRecaptchaChange = (value: string | null) => {
    setRecaptchaToken(value);
  };

  return (
    <div className="min-h-screen font-serif flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 p-6">
      <div className="flex flex-col md:flex-row w-full max-w-4xl">
        {/* Form Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-xl shadow-xl w-full md:w-2/3"
        >
          <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
            User Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Name
              </label>
              <input
                {...register("name")}
                className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 outline-none"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Phone Number
              </label>
              <div className="flex flex-col sm:flex-row">
                <select
                  {...register("countryCode")}
                  className="w-full sm:w-1/3 p-3 border rounded-lg outline-none"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name} ({country.code})
                    </option>
                  ))}
                </select>
                <input
                  {...register("phone")}
                  className="w-full sm:w-2/3 p-3 border rounded-lg outline-none"
                  placeholder="1234567890"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                {...register("email")}
                className="w-full p-3 border rounded-lg shadow-sm outline-none"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                {...register("password")}
                className="w-full p-3 border rounded-lg shadow-sm outline-none"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              {/* Ensure the site key is passed as a string */}
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''} // Ensure that sitekey is passed as a string
                onChange={handleRecaptchaChange}
              />
              {errors.recaptcha && (
                <p className="text-red-500 text-sm">{errors.recaptcha.message}</p>
              )}
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-full shadow-md text-lg font-bold"
            >
              Next
            </motion.button>
          </form>
        </motion.div>

        {/* Social Signup Section */}
        <div className="w-full md:w-1/3 p-8 flex flex-col items-center justify-center mt-6 md:mt-0 md:ml-6">
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center p-3 bg-white border border-gray-300 rounded-md shadow-sm mb-4 hover:bg-gray-50 transition"
          >
            <FaGoogle className="mr-2 text-yellow-500 h-8 w-8" />
            Sign up with Google
          </button>
          <button
            className="w-full flex items-center justify-center p-3 bg-white border border-gray-300 rounded-md shadow-sm mb-4 hover:bg-gray-50 transition"
          >
            <FaFacebook className="mr-2 text-blue-600 h-8 w-8" />
            Sign up with Facebook
          </button>
          <button
            className="w-full flex items-center justify-center p-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition"
          >
            <FaInstagram className="mr-2 text-pink-600 h-8 w-8" />
            Sign up with Instagram
          </button>
        </div>
      </div>
    </div>
  );
}
