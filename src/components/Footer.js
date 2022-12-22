import React from "react";
import { FaQuestion } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { SlPaperPlane } from "react-icons/sl";
import {
  AiFillFacebook,
  AiOutlineLink,
  AiOutlineTwitter,
} from "react-icons/ai";
import { HiPaperAirplane } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="bg-black">
      <div className="h-36 bg-[var(--light-grey)] flex items-center justify-center divide-x-2 divide-[var(--dark-grey)] divide-solid">
        <div className="px-10 flex flex-col items-center hover:opacity-70 cursor-pointer">
          <FaQuestion className="text-3xl mb-1" />
          FAQ
        </div>
        <div className="px-10 flex flex-col items-center hover:opacity-70 cursor-pointer">
          <FiMessageCircle className="text-3xl mb-1" />
          Discourse
        </div>
        <div className="px-10 flex flex-col items-center hover:opacity-70 cursor-pointer">
          <SlPaperPlane className="text-3xl mb-1" />
          Contact
        </div>
      </div>
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto py-2 h-[100%] text-base">
        <div className="flex flex-col justify-between flex-1 mr-32">
          <img
            src="https://commonvoice.mozilla.org/dist/cv-logo-white.3b47f3ba45b69f4a.svg"
            alt=""
            className=""
          />
          <p className="mt-6 text-white text-xs">
            Content available under a Creative Commons License
          </p>
        </div>
        <div className="w-80 hidden"></div>
        <div className="flex-1 flex divide-x-2 divide-[var(--warm-grey)] divide-solid text-[var(--warm-grey)] mr-16">
          <div className="flex flex-col gap-2 px-10">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Cookies</span>
          </div>
          <div className="flex flex-col gap-2 px-10">
            <span>FAQ</span>
            <span>GitHub</span>
          </div>
        </div>
        <div className="flex-1 items-center flex flex-col py-6 px-8 bg-hslaColor mr-5">
          <span className="text-center mb-4 text-[var(--warm-grey)]">
            Help us find others to donate their voice!
          </span>
          <div className="flex gap-5 text-white text-3xl cursor-pointer">
            <AiOutlineLink />
            <AiFillFacebook />
            <AiOutlineTwitter />
          </div>
        </div>
        <div className="flex-[1.5] items-center flex flex-col py-6 px-8 mb-8 gap-5 my-8">
          <div className="text-[var(--warm-grey)] w-full">
            Sign up for Common Voice newsletters, goal reminders and progress
            updates
          </div>
          <div className="flex">
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter your email"
              className="text-[var(--warm-grey)] bg-hslaColor p-4 flex-[6] border-none"
            />
            <button className="w-[45px] bg-[var(--blue)] relative">
              <HiPaperAirplane className=" text-white rotate-90 text-lg absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]" />
            </button>
          </div>
          <div className="text-white text-xs">
            <input
              type="checkbox"
              name=""
              id=""
              className="inline-block mr-2"
            />
            <span>
              I'm okay with you handling this info as you explain in Mozilla's
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
