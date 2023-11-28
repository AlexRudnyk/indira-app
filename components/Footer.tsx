import React from "react";
import { Great_Vibes } from "next/font/google";
import { FiPhoneCall } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { LiaTelegramPlane } from "react-icons/lia";
import { SiFacebook } from "react-icons/si";
import { FaTiktok } from "react-icons/fa";

const great_vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const Footer = () => {
  return (
    <footer className="w-screen border-t-2 border-gray-300">
      <div className="w-[1280px] mx-auto p-5 flex flex-col">
        <h1
          className={`${great_vibes.className} text-7xl text-[var(--primary)] font-semibold mb-5 self-center`}
        >
          Every day has it &#39;s own miracle
        </h1>
        <div className="mb-3">
          <div className="flex justify-around">
            <div className="flex items-center">
              <div className="mr-4">
                <FiPhoneCall size={20} />
              </div>
              <a href="tel:+380672797808" className="p-3">
                +380672797808
              </a>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <BsInstagram size={20} />
              </div>
              <a
                href="https://www.instagram.com/indira_soap/"
                className="text-lg p-3"
              >
                My Instagram
              </a>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <LiaTelegramPlane size={20} />
              </div>
              <a href="https://t.me/indira_soap" className="text-lg p-3">
                My Telegram
              </a>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <SiFacebook size={20} />
              </div>
              <a
                href="https://m.facebook.com/profile.php/?id=100041551331532"
                className="text-lg p-3"
              >
                My Facebook
              </a>
            </div>
            <div className="flex items-center">
              <div className="mr-4">
                <FaTiktok size={20} />
              </div>
              <a
                href="https://www.tiktok.com/@indira_soap?_t=8hkJLs29ZAr&_r=1"
                className="text-lg p-3"
              >
                My TikTok
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300">
          <p className="mt-3 text-sm text-gray-500">
            &copy;2023 Indira Soap All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;