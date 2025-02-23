import { Send } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Exclusive Section */}
          <div>
            <h3 className="text-lg font-semibold">Exclusive</h3>
            <p className="text-sm mt-2">Get 10% off your first order</p>
            <div className="mt-4 flex max-w-64">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-transparent border-white border-2 text-white rounded-l-md focus:outline-none w-full max-w-xs"
              />
              <button className="bg-white text-black px-4 py-2 rounded-r-md hover:bg-gray-300">
                <Send />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <p className="text-sm mt-2">1234, Park Street, DL-11111, India.</p>
            <Link href="mailto:test@testmail.com" className="block text-gray-400 hover:text-gray-200 mt-2">
              test@testmail.com
            </Link>
            <p className="text-sm mt-2">+91-999-999-9999</p>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold">Account</h3>
            <ul className="mt-2 space-y-2">
              {["My Account", "Login / Register", "Cart", "Wishlist", "Shop"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-gray-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold">Quick Link</h3>
            <ul className="mt-2 space-y-2">
              {["Privacy Policy", "Terms Of Use", "FAQ", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-gray-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
          © Copyright Harmoni 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
