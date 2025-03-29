const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-400 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-white text-lg font-semibold">WOOD SPECIES.</h2>
            <p className="mt-1 text-sm">The Wood Species Recognition System is an AI-powered tool that identifies wood types based on images of<br/> anatomical features. Using Convolutional Neural Networks (CNNs) and image processing techniques,<br/> it automates species classification, reducing manual inspection efforts in the wood industry.</p>
          </div>
  
          {/* Right Section - Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Services</a>
            <a href="#" className="hover:text-white">Contacts</a>
          </div>
        </div>
  
        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
          © 2025 Wood Species. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;
  