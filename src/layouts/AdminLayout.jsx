import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SlideBar from "../components/SlideBar/SlideBar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      {/* Sidebar */}
      <SlideBar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col w-full ">
        {/* Hamburger Button for Mobile */}
        <button
          className="md:hidden p-4 bg-gray-800 text-white fixed top-4 left-4 z-50 rounded mt-28"
          onClick={toggleSidebar}
        >
          <i
            className={`fa ${isSidebarOpen ? "fa-times" : "fa-bars"} text-xl`}
          />
        </button>

        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 p-4 ms-60 sm:p-6 md:p-8 mt-16 md:mt-0 transition-all duration-300">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
