import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ExerciseLibrary } from "./pages/ExerciseLibrary";
import { Navbar } from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ExerciseDetail } from "./pages/ExerciseDetail";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ExerciseLibrary />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
