import React from 'react';
import footerPic from "../../public/footerPic.jpg";
const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 dark:text-white bg-white text-black py-10 border-t-4 border-red-600">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-6 mb-8 md:mb-0">
            <img
              src={footerPic}
              alt="Tekken Logo"
              className="w-24 h-24 object-contain shadow-lg border-4 border-red-600 rounded-full"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight mb-2">
                Tekken Fighters
              </h1>
              <p className="text-lg italic dark:text-gray-300 text-black">
                Unleash the Fighter in You
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-8 md:mb-0">
            <a href="#" className="text-lg hover:text-red-400 transition-colors">
              Home
            </a>
            <a href="#" className="text-lg hover:text-red-400 transition-colors">
              About
            </a>
            <a href="#" className="text-lg hover:text-red-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-lg hover:text-red-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors text-2xl"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-500 transition-colors text-2xl"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-pink-500 hover:text-pink-400 transition-colors text-2xl"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-10">
          <p className="dark:text-gray-400 text-black text-sm">
            © {new Date().getFullYear()} Tekken Fighters. All rights reserved.
          </p>
          <p className="dark:text-gray-500 text-black text-xs mt-1">
            Designed with passion and a fighting spirit!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
