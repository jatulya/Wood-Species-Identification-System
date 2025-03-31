import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBolt, FaBrain, FaCamera } from "react-icons/fa";
import pexel1 from "../assets/pexel 1.jpg";
import uploadImg from "../assets/upload.png";
import analysisImg from "../assets/Analysis.png";
import resultImg from "../assets/Search.png";

const LandingPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header Section */}
      <header className="relative h-[550px] rounded-[2rem] overflow-hidden mx-auto max-w-[1420px] my-12 shadow-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pexel1})` }}
        ></div>

        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-end justify-start px-16 py-20">
          <div className="text-left text-white">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Identify Wood Species <span className="text-green-400">Effortlessly</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Use AI-powered recognition to analyze and classify wood species with precision.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/upload"
                className="bg-green-700 text-white px-12 py-2 rounded-full font-semibold shadow-md hover:bg-green-800 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="border border-white text-white px-12 py-2 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="why-our-system" className="py-20 px-8 text-center bg-white">
        <h2 className="text-4xl font-semibold text-gray-800 mb-16">Why Use Our System?</h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: FaBolt, title: "Fast & Accurate", text: "Get precise wood species identification within seconds." },
            { icon: FaBrain, title: "AI-Powered Analysis", text: "Advanced algorithms analyze unique wood patterns." },
            { icon: FaCamera, title: "Easy to Use", text: "Upload an image, and our system handles the rest." }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-50 rounded-3xl shadow-md p-12 flex flex-col items-center hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-200 mb-10">
                <feature.icon className="text-green-700 text-5xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{feature.title}</h3>
              <p className="text-gray-700 leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work Section (Card-Based Design) */}
      <section className="bg-gray-100 py-24 px-8 text-center">
        <h2 className="text-4xl font-semibold text-gray-800 mb-12">How We Work</h2>
        <p className="text-lg text-gray-600 mb-16">A simple 3-step process to identify wood species.</p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { step: "Upload", img: uploadImg, text: "Choose a clear image of the wood sample." },
            { step: "Analyze", img: analysisImg, text: "Our AI model processes the image and extracts features." },
            { step: "Results", img: resultImg, text: "View detailed species classification and age estimation." }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-8">
                <span className="text-3xl font-bold text-green-700">{`0${index + 1}`}</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{item.step}</h3>
              <img src={item.img} alt={item.step} className="w-52 h-44 object-contain mb-8" />
              <p className="text-gray-700 leading-relaxed text-center">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action (CTA) Section */}
      <section className="bg-green-800 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Get Started Today</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">Experience AI-driven wood species recognition. Upload your sample and get instant results!</p>
        <div className="flex justify-center space-x-6">
          <Link to="/upload" className="bg-white text-green-600 px-10 py-4 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors">
            Upload Now
          </Link>
          <Link to="/about" className="border border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
            Learn More
          </Link>
        </div>
      </section>


      {/* FAQs Section */}
      <section className="bg-white py-20 px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">FAQs</h2>
        <div className="mt-10 max-w-2xl mx-auto">
          {[
            { question: "How accurate is the wood species identification?", answer: "Our AI model has an accuracy rate of 90% based on extensive training." },
            { question: "What types of images work best?", answer: "High-quality close-up images of wood grain yield the most accurate results." },
            { question: "Can the system estimate the wood's age?", answer: "No, the model can not analyze growth rings to estimate the approximate age." },
            { question: "Is this service free to use?", answer: "Yes, basic identification is free." }
          ].map((faq, index) => (
            <div key={index} className="border-b py-5">
              <button onClick={() => toggleFAQ(index)} className="w-full text-left text-lg font-semibold flex justify-between">
                {faq.question}
                <span className="text-green-600">{openFAQ === index ? "−" : "+"}</span>
              </button>
              {openFAQ === index && <p className="mt-3 text-gray-700">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;