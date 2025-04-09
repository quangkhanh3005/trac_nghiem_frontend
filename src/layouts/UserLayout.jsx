import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SlideBar from "../components/SlideBar/SlideBar";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SlideBar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 bg-slate-100">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;