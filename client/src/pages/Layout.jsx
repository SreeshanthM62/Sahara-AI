import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { assets } from "../assets/assets";
import Sidebar from "../components/Sidebar";
import { SignIn, useUser } from "@clerk/react";

const Layout = () => {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);
  const {user} = useUser()

  return user ? (
    <div className="flex flex-col h-screen">

      {/* Navbar */}
      <nav className="h-16 px-6 sm:px-8 flex items-center justify-between border-b border-gray-200 bg-white z-50">

        <img
          src={assets.sahara_logo}
          alt="Logo"
          onClick={() => navigate("/")}
          className="h-12 cursor-pointer"
        />

        <button
          className="sm:hidden"
          onClick={() => setSidebar(!sidebar)}
        >
          {sidebar ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>

      </nav>

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
        />

        <main className="flex-1 overflow-y-auto bg-[#F4F7FB] p-6">
          <Outlet />
        </main>

      </div>

    </div>
  ) : (<div className="flex items-center justify-center h-screen">
    <SignIn />
  </div>)
};

export default Layout;