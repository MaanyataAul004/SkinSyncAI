import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import AIAdvisor from "./pages/AIAdvisor";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function App() {
  return (
   <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/advisor" element={<AIAdvisor />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register"element={<Register />}/>
      </Routes>

    </>
  );
}

export default App;
