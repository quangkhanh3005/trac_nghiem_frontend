import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 h-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Giới thiệu</h2>
          <p className="text-sm text-gray-400">
            Chúng tôi chuyên cung cấp các sản phẩm chất lượng cao với dịch vụ
            tận tâm.
          </p>
        </div>

        {/* Cột 2 - Dịch vụ */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Dịch vụ</h2>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="#" className="hover:text-gray-200">Bán hàng online</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">Bảo hành & sửa chữa</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">Chính sách hoàn trả</a>
            </li>
          </ul>
        </div>

        {/* Cột 3 - Hỗ trợ khách hàng */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Hỗ trợ khách hàng</h2>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>
              <a href="#" className="hover:text-gray-200">Câu hỏi thường gặp</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">Hướng dẫn mua hàng</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-200">Liên hệ hỗ trợ</a>
            </li>
          </ul>
        </div>

        {/* Cột 4 - Liên hệ */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Liên hệ</h2>
          <p className="text-sm text-gray-400">📍 Địa chỉ: 123 Đường ABC, TP.HCM</p>
          <p className="text-sm text-gray-400">📞 Hotline: 0123 456 789</p>
          <p className="text-sm text-gray-400">📧 Email: neyfongjr@gmail.com</p>
        </div>

        {/* Cột 5 - Mạng xã hội */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Mạng xã hội</h2>
          <div className="flex space-x-3">
            <a href="https://www.facebook.com/ly.my.an.204690" className="text-gray-400 hover:text-gray-200">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com/_lmeien/" className="text-gray-400 hover:text-gray-200">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm">
        © 2025 Jr Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
