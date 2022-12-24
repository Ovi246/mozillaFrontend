import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { BsFlag } from "react-icons/bs";

import { FaRegKeyboard, FaPlay } from "react-icons/fa";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { RecordingContext } from "./contexts/RecordingsProvider";
import { Link } from "react-router-dom";

const Listen = () => {
  const { quotes, recordings, loading, setLoading } =
    useContext(RecordingContext);
  const [index, setIndex] = useState(0);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (index > 0 && index <= 5) {
      var y = document.getElementsByClassName("pill-content");

      if (validated) {
        y[index - 1].innerHTML =
          "<svg width='2em' height='2em' viewBox='0 0 48 48' data-name='Layer 1' id='SVGRepoEditor' xmlns='http://www.w3.org/2000/svg' fill='#000000' stroke='#000000' stroke-width='0'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><defs><style>.cls-1{fill:none;stroke:#1d1d1b;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title></title><polyline class='cls-1' points='10 26 19 33 38 15'></polyline><circle class='cls-1' cx='24' cy='24' r='23'></circle></svg>";
      } else {
        y[index - 1].innerHTML =
          "<svg width='2em' height='2em' viewBox='0 0 48 48' data-name='Layer 1' id='SVGRepoEditor' xmlns='http://www.w3.org/2000/svg' fill='#000000' stroke='#000000' stroke-width='0'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><defs><style>.cls-1{fill:none;stroke:#1d1d1b;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title></title><circle class='cls-1' cx='24' cy='24' r='23'></circle><line class='cls-1' x1='12' x2='36' y1='12' y2='36'></line><line class='cls-1' x1='12' x2='36' y1='36' y2='12'></line></svg>";
      }
    }
  }, [index]);

  useEffect(() => {
    setLoading(true);

    if (recordings) {
      setLoading(false);
      const rootDiv = document.getElementById("listen-page");

      for (var i = 0; i < recordings.length; i++) {
        const audio = document.createElement("div");
        audio.innerHTML = `<audio preload="auto">
          <source src="${recordings[i].audio}"
          />
          </audio>`;
        rootDiv.append(audio);
      }
    }
  }, []);

  useEffect(() => {
    const fetchElements = async () => {
      const elements = document.getElementById("cards");
      const cards = elements.getElementsByClassName("card");

      for (var i = 0; i < cards.length; i++) {
        cards[i].setAttribute(
          "style",
          `transform: translateX(${-130 * i}%) scale(0.9); opacity: 1;`
        );
      }

      cards[0].setAttribute(
        "style",
        "transform: translateX(0%) scale(1); opacity: 1"
      );
      cards[0].classList.remove("inactive");
    };

    fetchElements();
  }, []);

  function togglePlay() {
    var myAudio = document.getElementsByTagName("audio")[index];
    var icon = document.getElementById("play-icon");
    if (myAudio) {
      if (myAudio.paused) {
        myAudio.play();
        icon.innerHTML =
          "<svg fill='#ff4f5e' width='40' height='40' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg' stroke='#ff4f5e' stroke-width='0'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><path d='M 8.8984 41.9219 C 8.8984 45.1797 10.8672 47.1016 14.1719 47.1016 L 41.8281 47.1016 C 45.1328 47.1016 47.1016 45.1797 47.1016 41.9219 L 47.1016 14.0781 C 47.1016 10.8203 45.1328 8.8984 41.8281 8.8984 L 14.1719 8.8984 C 10.8672 8.8984 8.8984 10.8203 8.8984 14.0781 Z M 12.6719 41.0312 L 12.6719 14.9688 C 12.6719 13.5390 13.5156 12.6719 14.9219 12.6719 L 41.0781 12.6719 C 42.4844 12.6719 43.3281 13.5390 43.3281 14.9688 L 43.3281 41.0312 C 43.3281 42.4609 42.4844 43.3281 41.0781 43.3281 L 14.9219 43.3281 C 13.5156 43.3281 12.6719 42.4609 12.6719 41.0312 Z'></path></svg>";
      } else {
        myAudio.pause();
        icon.innerHTML =
          "<svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 448 512' class='text-[var(--valid-green)] z-40 text-3xl' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'><path d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'></path></svg>";
      }
      myAudio.addEventListener("ended", function () {
        icon.innerHTML =
          "<svg stroke='currentColor' fill='currentColor' stroke-width='0' viewBox='0 0 448 512' class='text-[var(--valid-green)] z-40 text-3xl' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'><path d='M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z'></path></svg>";
      });
    }
  }

  var prevCardValue = 130;
  var nextCardValue = -130;

  function domChangeOnSave(idx) {
    changePillsFinish(idx);
    doneCard(idx);
    changePillsActive(idx);

    function changePillsActive(n) {
      var x = document.getElementsByClassName("pills");
      if (n > 4) {
        var button = document.getElementById("disable-submit");
        button.removeAttribute("disabled");
        button.classList.remove("disable");
        var startButton = document.getElementsByClassName("start-button");
        startButton[0].setAttribute("disabled", true);
      }
      if (n < 4) {
        x[n + 1].className += " record-active";
        var y = document.getElementsByClassName("pill-content");
        y[n + 1].innerHTML =
          "<svg fill='#000000' height='2em' width='2em' version='1.1' id='SVGRepoEditor' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 330 330' xml:space='preserve' stroke='#000000' stroke-width='0'><g id='SVGRepo_bgCarrier' stroke-width='0'></g> <g id='SVGRepoEditor'> <path id='SVGRepoEditor' d='M255,210h-10c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h10c8.284,0,15-6.716,15-15 C270,216.716,263.284,210,255,210z'></path> <path id='SVGRepoEditor' d='M285,150h-40c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h40c8.284,0,15-6.716,15-15 C300,156.716,293.284,150,285,150z'></path> <path id='SVGRepoEditor' d='M315,90h-70c-8.284,0-15,6.716-15,15s6.716,15,15,15h70c8.284,0,15-6.716,15-15S323.284,90,315,90z'></path> <path id='SVGRepoEditor' d='M192.078,31.775c-4.878-2.61-10.796-2.324-15.398,0.744L90.459,90H15c-8.284,0-15,6.716-15,15v120 c0,8.284,6.716,15,15,15h75.459l86.221,57.481c2.51,1.673,5.411,2.519,8.321,2.519c2.427,0,4.859-0.588,7.077-1.775 c4.877-2.61,7.922-7.693,7.922-13.225V45C200,39.468,196.955,34.385,192.078,31.775z M170,256.972l-66.68-44.453 C100.856,210.876,97.961,210,95,210H30v-90h65c2.961,0,5.856-0.876,8.32-2.519L170,73.028V256.972z'></path> </g></svg>";
      }
    }

    function changePillsFinish(n) {
      var x = document.getElementsByClassName("pills");
      x[n].classList.remove("record-active");
      x[n].className += " record-done";
    }

    function doneCard(n) {
      var el = document.getElementsByClassName("card");

      el[n + 1].setAttribute(
        "style",
        "transform: translateX(0%) scale(1); opacity:1;"
      );
      el[n + 1].classList.remove("inactive");
      el[n + 1 - 1].setAttribute(
        "style",
        `transform: translateX(${prevCardValue}%) scale(0.9); opacity:0;`
      );

      el[n + 2].setAttribute(
        "style",
        `transform: translateX(${nextCardValue}%) scale(0.9); opacity:1;`
      );
    }

    prevCardValue += 130;
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <svg className="animate-spin h-24 w-24" viewBox="0 0 24 24"></svg>
        </div>
      ) : (
        <div
          className="bg-gradient-to-t from-[var(--white)] to-[var(--desert-storm)] overflow-hidden"
          id="listen-page"
        >
          <div className="container mx-auto overflow-visible static p-5 flex flex-col w-full max-w-[1400px]">
            <div className="flex justify-between items-center top">
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center bg-white rounded-full w-14 h-14 cursor-pointer shadow-sm">
                  <Link to="/">
                    <AiOutlineArrowLeft className="text-lg" />
                  </Link>
                </div>
                <div>
                  <Link to="/speak">
                    <span className="mx-10 text-xl pb-3 font-serif">Speak</span>
                  </Link>
                  <span
                    className={`text-xl pb-3 font-serif ${
                      window.location.pathname === "/listen" &&
                      "border-b-2 border-[var(--blue)]"
                    }`}
                  >
                    Listen
                  </span>
                </div>
              </div>
              <div className="uppercase font-semibold flex justify-center items-center text-sm hover:underline cursor-pointer">
                <FiExternalLink className="inline-block mr-2 text-lg" />
                Understand Contribution Criteria
              </div>
            </div>
            <div className="flex flex-row flex-shrink-0">
              <div className="block flex-1 m-auto"></div>
              <div className="flex flex-col justify-center items-center w-full h-[100%] max-w-[60%] mt-0">
                <div className="mb-5 text-lg">
                  <i>
                    Click{" "}
                    <FaPlay className="mx-2 inline-block text-[var(--valid-green)] text-xl" />{" "}
                    then listen the sentence carefully
                  </i>
                </div>
                {/* cards */}
                <div
                  className="cards relative max-w-[700px] w-full h-[43vh] max-h-[430px]"
                  id="cards"
                >
                  <div className="bg-white break-words shadow-md px-24 w-full h-[100%] overflow-auto absolute flex items-center card inactive left-0 transition-all duration-300 ease-linear">
                    <h1 className="text-3xl text-center">{quotes[0].text}</h1>
                  </div>
                  <div className="bg-white break-words shadow-md px-24 w-full h-[100%]  overflow-auto absolute flex items-center card inactive left-0 transition-all duration-300 ease-linear">
                    <h1 className="text-3xl text-center">{quotes[1].text}</h1>
                  </div>
                  <div className="bg-white break-words shadow-md px-24 w-full h-[100%]  overflow-auto absolute flex items-center card inactive left-0 transition-all duration-300 ease-linear">
                    <h1 className="text-3xl text-center">{quotes[2].text}</h1>
                  </div>
                  <div className="bg-white break-words shadow-md px-24 w-full h-[100%]  overflow-auto absolute flex items-center card inactive left-0 transition-all duration-300 ease-linear">
                    <h1 className="text-3xl text-center">{quotes[3].text}</h1>
                  </div>
                  <div className="bg-white break-words shadow-md px-24 w-full h-[100%]  overflow-auto absolute flex items-center card inactive left-0 transition-all duration-300 ease-linear">
                    <h1 className="text-3xl text-center">{quotes[4].text}</h1>
                  </div>
                  <div className="bg-white break-words shadow-md px-24 w-full h-[100%]  overflow-auto absolute flex items-center card inactive left-0 transition-all duration-300 ease-linear">
                    <h1 className="text-3xl text-center">{quotes[5].text}</h1>
                  </div>
                  <div className="bg-white break-words shadow-md px-24 w-full h-[100%]  overflow-auto absolute flex items-center card inactive left-0 transition-all duration-300 ease-linear">
                    <h1 className="text-3xl text-center">{quotes[6].text}</h1>
                  </div>
                </div>
              </div>
              {/* pills */}
              <div className="flex-1">
                <div className="flex flex-col justify-start max-w-max items-center relative ml-auto gap-5">
                  <div className="flex flex-row justify-between px-3 h-14 w-full items-center pills record-active">
                    <div className="pill-content mr-3 tracking-wide">
                      <svg
                        fill="#000000"
                        height="2em"
                        width="2em"
                        version="1.1"
                        id="SVGRepoEditor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 330 330"
                        stroke="#000000"
                        strokeWidth="0"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>{" "}
                        <g id="SVGRepoEditor">
                          {" "}
                          <path
                            id="SVGRepoEditor"
                            d="M255,210h-10c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h10c8.284,0,15-6.716,15-15 C270,216.716,263.284,210,255,210z"
                          ></path>{" "}
                          <path
                            id="SVGRepoEditor"
                            d="M285,150h-40c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h40c8.284,0,15-6.716,15-15 C300,156.716,293.284,150,285,150z"
                          ></path>{" "}
                          <path
                            id="SVGRepoEditor"
                            d="M315,90h-70c-8.284,0-15,6.716-15,15s6.716,15,15,15h70c8.284,0,15-6.716,15-15S323.284,90,315,90z"
                          ></path>{" "}
                          <path
                            id="SVGRepoEditor"
                            d="M192.078,31.775c-4.878-2.61-10.796-2.324-15.398,0.744L90.459,90H15c-8.284,0-15,6.716-15,15v120 c0,8.284,6.716,15,15,15h75.459l86.221,57.481c2.51,1.673,5.411,2.519,8.321,2.519c2.427,0,4.859-0.588,7.077-1.775 c4.877-2.61,7.922-7.693,7.922-13.225V45C200,39.468,196.955,34.385,192.078,31.775z M170,256.972l-66.68-44.453 C100.856,210.876,97.961,210,95,210H30v-90h65c2.961,0,5.856-0.876,8.32-2.519L170,73.028V256.972z"
                          ></path>{" "}
                        </g>
                      </svg>
                    </div>
                    <div className="items-center rounded-full justify-center flex h-8 w-8 bg-[var(--warm-grey)] pill-num">
                      1
                    </div>
                  </div>
                  <div className="flex justify-between px-3 w-full h-14 items-center pills">
                    <div className="pill-content mr-3"></div>
                    <div className="items-center rounded-full justify-center flex h-8 w-8 bg-[var(--warm-grey)] pill-num ">
                      2
                    </div>
                  </div>
                  <div className="flex justify-between px-3 w-full h-14 items-center pills">
                    <div className="pill-content mr-3"></div>
                    <div className="items-center rounded-full justify-center flex h-8 w-8 bg-[var(--warm-grey)] pill-num">
                      3
                    </div>
                  </div>
                  <div className="flex justify-between px-3 w-full h-14 items-center pills">
                    <div className="pill-content mr-3"></div>
                    <div className="items-center rounded-full justify-center flex h-8 w-8 bg-[var(--warm-grey)] pill-num">
                      4
                    </div>
                  </div>
                  <div className="flex justify-between px-3 w-full h-14 items-center pills">
                    <div className="pill-content mr-3"></div>
                    <div className="items-center rounded-full justify-center flex h-8 w-8 bg-[var(--warm-grey)] pill-num">
                      5
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* play button  */}
            <div className="flex justify-center items-center mt-20">
              <button
                className="mr-24 flex items-center px-3 py-2 rounded-full shadow-md"
                onClick={() => {
                  domChangeOnSave(index);
                  setValidated(true);
                  setIndex(index + 1);
                }}
              >
                <AiOutlineLike className="inline-block mr-2 text-xl" />
                YES
              </button>
              <div className="listen-button-group">
                <div className="absolute listen-button-background z-10"></div>
                <div className="absolute listen-button z-20"></div>
                <button
                  className="play-button z-30"
                  title="Play"
                  onClick={() => {
                    togglePlay();
                  }}
                >
                  <div id="play-icon">
                    <FaPlay className="text-[var(--valid-green)] z-40 text-3xl" />
                  </div>
                </button>
              </div>
              <button
                className="ml-24 px-3 py-2 rounded-full shadow-md"
                onClick={() => {
                  domChangeOnSave(index);
                  setIndex(index + 1);
                  setValidated(false);
                }}
              >
                <AiOutlineDislike className="inline-block mr-2 text-xl" />
                NO
              </button>
            </div>

            {/* footer buttons */}
            <div className="flex items-center justify-between mt-[3.5vh]">
              <div className="flex">
                <button className="px-9 bg-[var(--white)] rounded-full mr-5 h-14 font-semibold flex items-center border-[1px]">
                  <FaRegKeyboard className="inline-block mr-2 text-xl" />{" "}
                  Shortcuts
                </button>
                <button className="px-8 bg-[var(--white)] rounded-full mr-5 h-14 font-semibold flex items-center border-[1px]">
                  <BsFlag className="inline-block mr-2 text-xl" /> Report
                </button>
              </div>
              <div className="flex">
                <button className="px-8 bg-[var(--white)] rounded-full mr-5 h-14 font-semibold flex items-center border-[1px]">
                  Skip{" "}
                  <MdOutlineDoubleArrow className="inline-block ml-2 text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Listen;
