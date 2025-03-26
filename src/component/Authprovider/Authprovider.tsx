// "use client";
// import React from 'react'
// import  {SessionProvider} from "next-auth/react"

// const Authprovider = ({children}) => {
//   return (
//     <SessionProvider>
//      {children}
//     </SessionProvider>
//   )
// }

// export default Authprovider


"use client";
import React, { ReactNode } from 'react';
import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

export default AuthProvider;
