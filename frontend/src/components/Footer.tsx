const Footer = () => {
    return (
      <footer className="bg-green-900 text-white py-12 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
    
    {/* Company Info */}
    <div className="md:col-span-1">
      <h3 className="text-lg font-semibold mb-4">WoodID</h3>
      <p className="text-sm text-white">
        Your reliable partner for wood species identification and analysis.
      </p>
    </div>
    
    {/* Navigation */}
    <div className="md:col-span-1">
      <h3 className="text-lg font-semibold mb-4">Navigation</h3>
      <ul className="text-sm text-gray-400">
        <li className="mb-2"><a href="#" className="hover:text-white">Home</a></li>
        <li className="mb-2"><a href="#" className="hover:text-white">About</a></li>
        <li className="mb-2"><a href="#" className="hover:text-white">Upload</a></li>
        <li><a href="#" className="hover:text-white">Contact</a></li>
      </ul>
    </div>
    
    {/* Contact Info */}
    <div className="md:col-span-1">
      <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
      <p className="text-sm text-gray-400">
        123 Main Street, City, Country
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Email: <a href="mailto:info@example.com" className="hover:text-white">info@example.com</a>
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Phone: <a href="tel:+1234567890" className="hover:text-white">+1 234 567 890</a>
      </p>
    </div>
  </div>
  
  {/* Divider */}
  <hr className="border-white my-8" /> 
  
  {/* Copyright */}
  <div className="text-center text-sm text-white">
    &copy; {new Date().getFullYear()} WoodID. All rights reserved.
  </div>
</footer>
    );
  };
  
  export default Footer;
  