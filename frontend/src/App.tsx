import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";  // Add Footer
import Home from "./components/Home";
import WoodClassifier from "./components/WoodClassifier";
import Description from "./components/Description";

function App() {
  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<WoodClassifier />} />
          <Route path="/description" element={<Description />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;