import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ExerciseLibrary } from "./pages/ExerciseLibrary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExerciseDetail } from "./pages/ExerciseDetail";
import Login from "./pages/Login";
import AuthProvider from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";
import { NavbarLayout } from "./components/NavbarLayout";

const queryClient = new QueryClient();

const App = () => (
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<NavbarLayout />}>
              <Route path="/" element={<ExerciseLibrary />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>
);

export default App;
