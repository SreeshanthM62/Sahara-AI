import React from "react";
import {
  ArrowUpRight,
} from "lucide-react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              <img src={assets.sahara_logo}/>
            </h2>

            <p className="mt-5 text-gray-500 leading-7">
              Create, enhance and automate your workflow with powerful AI
              tools. Fast, simple and built for everyone.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Company
            </h3>

            <ul className="mt-6 space-y-4 text-gray-500">

              <li>
                <a href="#" className="hover:text-violet-600 transition">
                  Home
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-violet-600 transition">
                  Features
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-violet-600 transition">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-violet-600 transition">
                  Contact
                </a>
              </li>

            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              AI Tools
            </h3>

            <ul className="mt-6 space-y-4 text-gray-500">

              <li>AI Writer</li>
              <li>Image Generator</li>
              <li>Background Remover</li>
              <li>Object Remover</li>
              <li>Blog Title Generator</li>

            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Stay Updated
            </h3>

            <p className="mt-5 text-gray-500">
              Get the latest AI updates and new tools delivered to your inbox.
            </p>

            <div className="mt-6 flex rounded-xl border border-gray-300 overflow-hidden">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 outline-none"
              />

              <button className="bg-gradient-to-r from-violet-600 to-blue-600 px-5 text-white">
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col items-center justify-between gap-4 text-sm text-gray-500 md:flex-row">

          <p>© 2026 JAHAAS.AI. All rights reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-violet-600">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-violet-600">
              Terms of Service
            </a>

            <a href="#" className="hover:text-violet-600">
              Cookies
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;