import React, { useState, useEffect } from "react";
import benefit1 from "../images/benefit1.png";
import benefit2 from "../images/benefit2.png";
import benefit3 from "../images/benefit3.png";
import benefit4 from "../images/benefit4.png";
import benefit5 from "../images/benefit5.png";
import benefit6 from "../images/benefit6.png";
import public1 from "../images/public1.png";
import public2 from "../images/public2.png";
import public3 from "../images/public3.png";
import public4 from "../images/public4.png";
import public5 from "../images/public5.png";
import mars from "../images/mars.svg";
import waves from "../images/waves.png";

const Register = () => {
  const [img, setImg] = useState(benefit1);
  const [activeTab, setActiveTab] = useState("tab1");
  const [activeList, setActiveList] = useState(0);

  const tabInfo = {
    benefitInfo: [
      {
        id: 0,
        text: "Make your submitted data as rich as possible by providing some anonymous demographic data. We de-identify all demographic data before making it public.",
        onClick: benefit1,
      },
      {
        id: 1,
        text: "Profile information improves the audio data used in training speech recognition accuracy.",
        onClick: benefit2,
      },
      {
        id: 2,
        text: "Keep track of your progress and metrics across multiple languages.",
        onClick: benefit3,
      },
      {
        id: 3,
        text: "See how your progress compares to other contributors all over the world.",
        onClick: benefit4,
      },
      {
        id: 4,
        text: "View your progress against personal and project goals.",
        onClick: benefit5,
      },
      {
        id: 5,
        text: "Optionally join on our email list for updates and new information about the project.",
        onClick: benefit6,
      },
    ],
    publicInfo: [
      {
        id: 0,
        text: "We will not make your email public.",
        onClick: public1,
      },
      {
        id: 1,
        text: "The number of recordings and which languages you contribute to will be public.",
        onClick: public2,
      },
      {
        id: 2,
        text: "You can choose to make your username public or anonymous.",
        onClick: public3,
      },
      {
        id: 3,
        text: "Optionally submitted demographic data (e.g. age, gender, language, and accent) will never be made public on your profile, and will not be linked to your account in the dataset. Individual audio clips will be associated with demographic data for the purpose of more accurate analysis - for example, a researcher might want to target a training model to a specific demographic segment.",
        onClick: public4,
      },
      {
        id: 4,
        text: "Your username and email will not be associated with the published data.",
        onClick: public5,
      },
    ],
  };

  return (
    <div className="mt-12 px-5 relative">
      <div className="flex justify-between max-w-6xl mx-auto mt-5">
        <div>
          <div className="max-w-md w-full">
            <h1 className="font-serif text-3xl mb-3 font-normal">
              Help us build a high quality, publicly open dataset
            </h1>
            <h2 className="text-2xl font-[400] mb-8 text-[var(--near-black)]">
              Having a profile is not required to contribute though it is
              helpful, see why below.
            </h2>
            <button className="bg-[var(--blue)] text-white h-14 rounded-[50px] z-40 px-4 py-2 w-full max-w-[270px] text-center items-center flex justify-center cursor-pointer text-sm font-semibold hover:bg-white hover:border-[var(--blue)] hover:border-[1px] hover:text-black transition-all duration-200 ease-linear">
              Sign up for an account
            </button>
          </div>
          <div className="mt-20 max-w-lg">
            <div className="tabs flex text-xs font-semibold border-b-2 uppercase">
              <img
                src={waves}
                alt=""
                className="absolute top-[-10px] w-[100vw] z-[-10]"
              />
              <div
                className={`min-w-[120px] pb-4 ${
                  activeTab === "tab1"
                    ? "border-b-2 border-black relative top-[1px]"
                    : ""
                } uppercase cursor-pointer`}
                onClick={() => {
                  setActiveTab("tab1");
                  setActiveList(0);
                  setImg(benefit1);
                }}
              >
                Benefits
              </div>
              <div
                className={`min-w-[120px] pb-4 ${
                  activeTab === "tab2"
                    ? "border-b-2 border-black relative top-[1px]"
                    : ""
                } uppercase cursor-pointer`}
                onClick={() => {
                  setActiveTab("tab2");
                  setActiveList(0);
                  setImg(public1);
                }}
              >
                What's Public?
              </div>
            </div>
            <div className="tab-panel relative">
              <div className="absolute left-0 w-[100vw] h-[100%] bg-hslabg"></div>
              <ul className="max-h-[450px] bg-white overflow-auto relative mt-0 list-none px-5 py-7">
                {activeTab === "tab1" ? (
                  <>
                    {tabInfo.benefitInfo.map((item, idx) => (
                      <li
                        key={idx}
                        className={`bg-white ${
                          activeList === item.id &&
                          "bg-[var(--desert-storm)] text-black"
                        } cursor-pointer flex py-10 pr-20 pl-8`}
                        onClick={() => {
                          setImg(item.onClick);
                          setActiveList(idx);
                        }}
                      >
                        <span className="mr-2">{idx + 1}.</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    {tabInfo.publicInfo.map((item, idx) => (
                      <li
                        key={idx}
                        className={`bg-white ${
                          activeList === item.id &&
                          "bg-[var(--desert-storm)] text-black"
                        } cursor-pointer flex py-10 pr-20 pl-8`}
                        onClick={() => {
                          setImg(item.onClick);
                          setActiveList(idx);
                        }}
                      >
                        <span className="mr-2">{idx + 1}.</span>
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col relative items-center">
          <img src={mars} alt="" className="max-w-xs w-[290px]" />
          <img src={img} alt="" className="max-w-lg mt-12" />
        </div>
      </div>
    </div>
  );
};

export default Register;
