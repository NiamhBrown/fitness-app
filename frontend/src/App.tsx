import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Library } from "./pages/Library";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExerciseDetail } from "./pages/ExerciseDetail";
import AuthProvider from "./components/auth/AuthProvider";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { PublicRoute } from "./components/auth/PublicRoute";
import { NavbarLayout } from "./components/navigation/NavbarLayout";
import { LoginPage } from "./pages/LoginPage";
import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import ScrollToTop from "./components/navigation/ScrollToTop";
import { WorkoutDetail } from "./pages/WorkoutDetail";
import { LoggingWorkout } from "./pages/LoggingWorkout";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route element={<NavbarLayout />}>
              <Route path="/exercises" element={<Library type="exercise" />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/workouts" element={<Library type="workout" />} />
              <Route path="/workout/:id" element={<WorkoutDetail />} />
              <Route path="/workout/:id/logging" element={<LoggingWorkout />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    {/* <ReactQueryDevtools initialIsOpen={false} position="left" /> */}
  </QueryClientProvider>
);

export default App;
