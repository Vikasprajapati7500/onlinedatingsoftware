// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google"

// const handler = NextAuth({
//   providers:[
//     GoogleProvider({
//         clientId:process.env.GOOGLE_CLIENT_ID,
//         clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//     })
//   ]
// })

// export { handler as GET, handler as POST }



import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Check for environment variables
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google Client ID or Client Secret in environment variables.");
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ]
})

export { handler as GET, handler as POST }
