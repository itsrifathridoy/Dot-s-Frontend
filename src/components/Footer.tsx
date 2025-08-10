import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#5a0f11] to-[#7a1315] py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="relative">
              <Image
                src="/Images/image.png"
                alt="Dots Furniture Logo"
                width={120}
                height={40}
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3 group hover:text-white transition-colors duration-300">
                <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed">Dots Location, Premium Furniture District</p>
              </div>
              <div className="flex items-center space-x-3 group hover:text-white transition-colors duration-300">
                <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <p className="text-sm sm:text-base font-medium">+880 183 333 3333</p>
              </div>
              <div className="flex items-center space-x-3 group hover:text-white transition-colors duration-300">
                <div className="flex-shrink-0 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <p className="text-sm sm:text-base font-medium">info@dotsfurniture.com</p>
              </div>
            </div>
          </div>

          {/* The Company */}
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 relative">
              THE COMPANY
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-white/40 rounded-full"></div>
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { text: "About Dots Furniture", href: "/about" },
                { text: "License & Certificates", href: "/licenses" },
                { text: "Work Completion Certificate", href: "/completion" },
                { text: "Career", href: "/career" },
                { text: "Privacy Policy", href: "/privacy" },
                { text: "Return Policy", href: "/return" },
                { text: "Dots Furniture Policies", href: "/policies" }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="text-gray-200 text-sm sm:text-base font-medium hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white/60 rounded-full mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Need Help */}
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 relative">
              NEED HELP?
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-white/40 rounded-full"></div>
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { text: "Contact Us", href: "/contact" },
                { text: "FAQ", href: "/faq" },
                { text: "Showroom Locator", href: "/showroom" },
                { text: "Billing Terms & Conditions", href: "/billing" }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="text-gray-200 text-sm sm:text-base font-medium hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white/60 rounded-full mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Information */}
          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-6 relative">
              MORE INFORMATION
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-white/40 rounded-full"></div>
            </h3>
            <ul className="space-y-3 sm:space-y-4">
              {[
                { text: "Company Profile", href: "/company-profile" },
                { text: "Be Our Franchisee", href: "/franchise" },
                { text: "Dots Furniture Project Solution", href: "/project-solution" },
                { text: "Catalogues", href: "/catalogues" },
                { text: "Dots Furniture in News", href: "/news" },
                { text: "Our Team", href: "/team" }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    href={item.href} 
                    className="text-gray-200 text-sm sm:text-base font-medium hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white/60 rounded-full mr-0 group-hover:mr-3 transition-all duration-300"></span>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="border-t border-white/20 pt-8 mt-8">
    
          
          <div className="flex justify-center">
            <div className="w-full">
              <Image
                src="/payment/payment.png"
                alt="Accepted Payment Methods"
                width={800}
                height={200}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-200 text-sm sm:text-base font-medium text-center sm:text-left">
              © 2024 Dots Furniture. All rights reserved. 
              <span className="hidden sm:inline ml-2 px-3 py-1 bg-white/20 text-white text-xs rounded-full">
                Premium Quality
              </span>
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-200 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Made with ❤️ in Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
