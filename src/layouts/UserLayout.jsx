import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const UserLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-1 bg-gray-100">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
