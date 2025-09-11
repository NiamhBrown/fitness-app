// import { createContext, useContext, useEffect, useState } from "react";
// import { supabase } from "../supabaseClient";

// const AuthContext = createContext({});

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get initial session
//     const getInitialSession = async () => {
//       const {
//         data: { session },
//       } = await supabase.auth.getSession();

//       if (session) {
//         // Verify session is valid
//         const {
//           data: { user },
//           error,
//         } = await supabase.auth.getUser();
//         if (!error && user) {
//           setSession(session);
//           setUser(user);
//         }
//       }
//       setLoading(false);
//     };

//     getInitialSession();

//     // Listen for auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((event, session) => {
//       console.log("Auth event:", event);
//       setSession(session);
//       setUser(session?.user ?? null);
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const signIn = async (email, password) => {
//     return await supabase.auth.signInWithPassword({ email, password });
//   };

//   const signUp = async (email, password) => {
//     return await supabase.auth.signUp({ email, password });
//   };

//   const signOut = async () => {
//     return await supabase.auth.signOut();
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         session,
//         loading,
//         signIn,
//         signUp,
//         signOut,
//         isAuthenticated: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
