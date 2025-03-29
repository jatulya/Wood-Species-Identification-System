import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <header className="bg-green-800 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">Wood Species Recognition System</h1>
        <p className="mt-4 text-lg">Identify wood species instantly using AI-powered recognition.</p>
        <Link to="/upload" className="mt-6 inline-block bg-white text-green-800 px-6 py-2 rounded-full font-bold hover:bg-gray-200">
          Get Started
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold">Why Use Our System?</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">Fast & Accurate</h3>
            <p>Get precise wood species identification in seconds.</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
            <p>Leverages deep learning to analyze growth rings and texture.</p>
          </div>
          <div className="bg-white p-6 shadow rounded-lg">
            <h3 className="text-xl font-semibold">Easy to Use</h3>
            <p>Upload an image and let the system do the work.</p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="bg-green-50 py-16 text-center">
        <h2 className="text-3xl font-bold">Upload Your Wood Sample</h2>
        <p className="mt-4 text-lg">Get instant identification and details.</p>
        <Link to="/upload" className="mt-6 inline-block bg-green-700 text-white px-6 py-2 rounded-full font-bold hover:bg-green-800">
          Upload Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>&copy; 2025 Wood Recognition AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;