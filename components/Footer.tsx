import React from "react";
import { Great_Vibes } from "next/font/google";
import { FiPhoneCall } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { LiaTelegramPlane } from "react-icons/lia";
import { SiFacebook } from "react-icons/si";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";

const great_vibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const Footer = () => {
  return (
    <footer className="border-t-2 border-gray-300">
      <div className="mo:max-w-[480px] sm:w-[480px] md:w-[768px] lg:w-[1280px] mx-auto p-5 flex flex-col">
        <h1
          className={`${great_vibes.className} mo:text-3xl sm:text-4xl md:text-7xl text-[var(--primary)] font-semibold mb-5 self-center`}
        >
          Every day has it &#39;s own miracle
        </h1>
        <div className="mb-3">
          <div className="flex flex-col md:flex-row justify-around">
            <Link href="tel:+380672797808" className="flex items-center">
              <div className="mr-4">
                <FiPhoneCall size={20} />
              </div>
              <p className="md:text-sm lg:text-base p-3 md:p-2">
                +380672797808
              </p>
            </Link>
            <Link
              href="https://www.instagram.com/indira_soap/"
              className="flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mr-4">
                <BsInstagram size={20} />
              </div>
              <p className="md:text-sm lg:text-lg p-3 md:p-2">My Instagram</p>
            </Link>
            <Link
              href="https://t.me/indira_soap"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <div className="mr-4">
                <LiaTelegramPlane size={20} />
              </div>
              <p className="md:text-sm lg:text-lg p-3 md:p-2">My Telegram</p>
            </Link>
            <Link
              href="https://m.facebook.com/sheina.anna?refid=52&__tn__=C-R"
              className="flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mr-4">
                <SiFacebook size={20} />
              </div>
              <p className="md:text-sm lg:text-lg p-3 md:p-2">My Facebook</p>
            </Link>
            <Link
              href="https://www.tiktok.com/@indira_soap?_t=8hkJLs29ZAr&_r=1"
              className="flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="mr-4">
                <FaTiktok size={20} />
              </div>
              <p className="md:text-sm lg:text-lg p-3 md:p-2">My TikTok</p>
            </Link>
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
