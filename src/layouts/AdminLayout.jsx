import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      <div className="flex-1 flex flex-col w-full ">
        <Header />

        <main className="flex-1 p-4  sm:p-6 md:p-8 mt-16 md:mt-0 transition-all duration-300">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
