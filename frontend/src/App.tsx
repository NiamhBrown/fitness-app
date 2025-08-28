import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ExerciseLibrary } from "./pages/ExerciseLibrary";
import { ExerciseDetail } from "./pages/ExerciseDetail";
import { Navbar } from "./components/Navbar";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<ExerciseLibrary />} />
      <Route path="/exercise/:id" element={<ExerciseDetail />} />
    </Routes>
  </BrowserRouter>
);

export default App;
