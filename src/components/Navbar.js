import React from "react";
import { BsMic } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";
import { AiOutlineDown } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="border-b-2 border-[/f3f2f0]">
      <div className="container mx-auto px-40 py-4 flex justify-between items-center">
        <img
          src="https://commonvoice.mozilla.org/dist/cv-logo-black.270d5891c1700962.svg"
          alt="common voice mozilla"
          width="160px"
          height="40px"
        />
        <div className="flex list-none gap-5 uppercase text-xs font-semibold">
          <li>Contribute</li>
          <li>Datasets</li>
          <li>Languages</li>
          <li>Partner</li>
          <li>About</li>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center mx-8">
            <BsMic className="text-red-600" />
            <p className="ml-2 text-red-600 font-bold">0</p>
            <div className="mx-2 text-gray-300">|</div>
            <FaPlay className="text-[#59cbb7]" />
            <p className="ml-2 text-[#59cbb7] font-bold">0</p>
          </div>
          <button className="border rounded-full px-4 py-2 hover:border-black font-semibold">
            Log In / Sign Up
          </button>

          <button
            id="dropdownDefault"
            data-dropdown-toggle="dropdown"
            className="flex items-center border hover:border-black px-4 py-2 gap-x-2"
            type="button"
          >
            <GoGlobe />
            EN
            <AiOutlineDown />
          </button>

          <div
            id="dropdown"
            className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <a
                  href="/"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
