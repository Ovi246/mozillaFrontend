import React, { useContext, useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { BsMic, BsFlag } from "react-icons/bs";
import { CgPlayStopR } from "react-icons/cg";
import { FaRegKeyboard } from "react-icons/fa";
import { MdOutlineDoubleArrow } from "react-icons/md";
import "./Speak.css";
import useRecorder from "./recorder/useRecorder";
import { Link } from "react-router-dom";
import { RecordingContext } from "./contexts/RecordingsProvider";

const Speak = () => {
  const { recorderState, ...handlers } = useRecorder();
  // const { audio } = recorderState;
  const { initRecording } = recorderState;
  const { startRecordingFunc, saveRecordingFunc, cancelRecording } = handlers;

  const { quotes, recordings, loading, setLoading, setRecordings } =
    useContext(RecordingContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (recordings.length > 0) {
      var y = document.getElementsByClassName("pill-content");
      y[recordings.length - 1].innerHTML = `<div id="player">
        <button class="button-pill"><svg width="24" height="24" viewBox="0 0 24 24"><defs><path id="play-outline-path11" d="M15.5 9.173L1.5.15c-.3-.2-.7-.2-1 0-.3.1-.5.401-.5.802v18.045c0 .401.2.702.5.903.2.1.3.1.5.1s.4-.1.5-.2l14-9.023c.3-.2.5-.501.5-.802 0-.3-.2-.702-.5-.802zM2 17.193V2.757l11.2 7.218L2 17.193z"></path></defs><g fill="none" fill-rule="evenodd" transform="translate(4 2)"><mask id="play-outline-mask11" fill="#fff"><use xlink:href="#play-outline-path11"></use></mask><g fill="#4A4A4A" mask="url(#play-outline-mask11)"><path d="M-4-1h24v24H-4z"></path></g></g></svg></button>
          <audio preload="auto" id=audio-${recordings.length - 1}}>
              <source src="${recordings[recordings.length - 1].audio}"
              />
          </audio>
        </div>`;
      var buttons = document.getElementsByClassName("button-pill");
      buttons[recordings.length - 1].setAttribute(
        "buttonId",
        recordings.length - 1
      );
      buttons[recordings.length - 1].addEventListener("click", (e) =>
        togglePlay(e.currentTarget.attributes.buttonId.value)
      );

      function togglePlay(index) {
        var myAudio = document.getElementsByTagName("audio")[index];

        console.log(myAudio);

        if (myAudio) {
          if (myAudio.paused) {
            myAudio.play();
            buttons[recordings.length - 1].innerHTML =
              "<svg fill='#ff4f5e' width='24' height='24' viewBox='0 0 56 56' xmlns='http://www.w3.org/2000/svg' stroke='#ff4f5e' stroke-width='0'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><path d='M 8.8984 41.9219 C 8.8984 45.1797 10.8672 47.1016 14.1719 47.1016 L 41.8281 47.1016 C 45.1328 47.1016 47.1016 45.1797 47.1016 41.9219 L 47.1016 14.0781 C 47.1016 10.8203 45.1328 8.8984 41.8281 8.8984 L 14.1719 8.8984 C 10.8672 8.8984 8.8984 10.8203 8.8984 14.0781 Z M 12.6719 41.0312 L 12.6719 14.9688 C 12.6719 13.5390 13.5156 12.6719 14.9219 12.6719 L 41.0781 12.6719 C 42.4844 12.6719 43.3281 13.5390 43.3281 14.9688 L 43.3281 41.0312 C 43.3281 42.4609 42.4844 43.3281 41.0781 43.3281 L 14.9219 43.3281 C 13.5156 43.3281 12.6719 42.4609 12.6719 41.0312 Z'></path></svg>";
          } else {
            myAudio.pause();
            buttons[recordings.length - 1].innerHTML =
              "<svg width='24' height='24' viewBox='0 0 24 24'><defs><path id='play-outline-path11' d='M15.5 9.173L1.5.15c-.3-.2-.7-.2-1 0-.3.1-.5.401-.5.802v18.045c0 .401.2.702.5.903.2.1.3.1.5.1s.4-.1.5-.2l14-9.023c.3-.2.5-.501.5-.802 0-.3-.2-.702-.5-.802zM2 17.193V2.757l11.2 7.218L2 17.193z'></path></defs><g fill='none' fill-rule='evenodd' transform='translate(4 2)'><mask id='play-outline-mask11' fill='#fff'><use xlink:href='#play-outline-path11'></use></mask><g fill='#4A4A4A' mask='url(#play-outline-mask11)'><path d='M-4-1h24v24H-4z'></path></g></g></svg>";
          }
          myAudio.addEventListener("ended", function () {
            buttons[recordings.length - 1].innerHTML =
              "<svg width='24' height='24' viewBox='0 0 24 24'><defs><path id='play-outline-path11' d='M15.5 9.173L1.5.15c-.3-.2-.7-.2-1 0-.3.1-.5.401-.5.802v18.045c0 .401.2.702.5.903.2.1.3.1.5.1s.4-.1.5-.2l14-9.023c.3-.2.5-.501.5-.802 0-.3-.2-.702-.5-.802zM2 17.193V2.757l11.2 7.218L2 17.193z'></path></defs><g fill='none' fill-rule='evenodd' transform='translate(4 2)'><mask id='play-outline-mask11' fill='#fff'><use xlink:href='#play-outline-path11'></use></mask><g fill='#4A4A4A' mask='url(#play-outline-mask11)'><path d='M-4-1h24v24H-4z'></path></g></g></svg>";
          });
        }
      }
    }
  }, [recordings, index]);

  useEffect(() => {
    setRecordings([]);
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

  // dom functions

  var prevCardValue = 130;
  var nextCardValue = -130;

  function domChangeOnSave(idx) {
    changePillsFinish(idx);
    doneCard(idx);
    changePillsActive(idx);

    function changePillsActive(n) {
      var x = document.getElementsByClassName("pills");
      if (n === 4) {
        var button = document.getElementById("disable-submit");
        button.removeAttribute("disabled");
        button.classList.remove("disable");
        var startButton = document.getElementsByClassName("start-button");
        startButton[0].setAttribute("disabled", true);
      }
      if (n < 4) {
        x[n + 1].className += " record-active";
        var y = document.getElementsByClassName("pill-content");
        y[n + 1].innerHTML = "Start Recording";
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

    if (index === 5) {
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recordings),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-gradient-to-t from-[var(--white)] to-[var(--desert-storm)] overflow-hidden">
      <div className="container mx-auto overflow-visible static p-5 flex flex-col w-full max-w-[1400px]">
        <div className="flex justify-between items-center top">
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center bg-white rounded-full w-14 h-14 cursor-pointer shadow-sm">
              <Link to="/">
                <AiOutlineArrowLeft className="text-lg" />
              </Link>
            </div>
            <div>
              <span
                className={`mx-10 text-xl pb-3 ${
                  window.location.pathname === "/speak" &&
                  "border-b-2 border-[var(--blue)]"
                } font-serif`}
              >
                Speak
              </span>
              <Link to="/listen">
                <span className="text-xl pb-3 font-serif">Listen</span>
              </Link>
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
                <BsMic className="mx-2 inline-block text-[var(--red)] text-xl" />{" "}
                then read the sentence aloud
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
                  Start Recording
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
        {/* start button  */}
        <div className="flex justify-center items-center mt-20">
          {initRecording ? (
            <div className="speak-button-group">
              <div className="absolute speak-button-background z-10"></div>
              <div className="absolute speak-button z-20"></div>
              <button
                className="start-button z-30"
                title="Save recording"
                onClick={() => {
                  saveRecordingFunc();
                  domChangeOnSave(index);
                  setIndex(index + 1);
                }}
              >
                <svg
                  fill="#ff4f5e"
                  width="40"
                  height="40"
                  viewBox="0 0 56 56"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ff4f5e"
                  strokeWidth="0"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <path d="M 8.8984 41.9219 C 8.8984 45.1797 10.8672 47.1016 14.1719 47.1016 L 41.8281 47.1016 C 45.1328 47.1016 47.1016 45.1797 47.1016 41.9219 L 47.1016 14.0781 C 47.1016 10.8203 45.1328 8.8984 41.8281 8.8984 L 14.1719 8.8984 C 10.8672 8.8984 8.8984 10.8203 8.8984 14.0781 Z M 12.6719 41.0312 L 12.6719 14.9688 C 12.6719 13.5390 13.5156 12.6719 14.9219 12.6719 L 41.0781 12.6719 C 42.4844 12.6719 43.3281 13.5390 43.3281 14.9688 L 43.3281 41.0312 C 43.3281 42.4609 42.4844 43.3281 41.0781 43.3281 L 14.9219 43.3281 C 13.5156 43.3281 12.6719 42.4609 12.6719 41.0312 Z"></path>
                </svg>
              </button>
            </div>
          ) : (
            <div className="speak-button-group">
              <div className="absolute speak-button-background z-10"></div>
              <div className="absolute speak-button z-20"></div>
              <button
                className="start-button z-30"
                title="Start recording"
                onClick={() => {
                  startRecordingFunc();
                }}
              >
                <BsMic className="text-red-500 z-40 text-3xl" />
              </button>
            </div>
          )}
        </div>
        {/* footer buttons */}
        <div className="flex items-center justify-between mt-[3.5vh]">
          <div className="flex">
            <button className="px-9 bg-[var(--white)] rounded-full mr-5 h-14 font-semibold flex items-center border-[1px]">
              <FaRegKeyboard className="inline-block mr-2 text-xl" /> Shortcuts
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
            <form method="post">
              <button
                className="px-9 bg-[var(--white)] rounded-full mr-5 h-14 font-semibold flex items-center border-[1px] disable"
                id="disable-submit"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speak;
