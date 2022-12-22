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
import pause from "../images/pause.svg";
import play from "../images/play.svg";

const Speak = () => {
  const initialQuotes = [
    {
      id: 1,
      text: "Thrinaxodon has been dated between the Permian-Triassic boundary and the mid-Triassic.",
    },
    {
      id: 2,
      text: "North Freedom was named from the American ideal of freedom.",
    },
    {
      id: 3,
      text: "For much of this period he recorded and toured with Eddie Kirkland.",
    },
    {
      id: 4,
      text: "Blythe was buried at Rose Hill Cemetery in Hope, Hempstead County, Arkansas.",
    },
    {
      id: 5,
      text: "Further, klezmorim were usually itinerant musicians, who moved from town to town for work.",
    },
    {
      id: 6,
      text: "Further, klezmorim were usually itinerant musicians, who moved from town to town for work.",
    },
    {
      id: 7,
      text: "Further, klezmorim were usually itinerant musicians, who moved from town to town for work.",
    },
    {
      id: 8,
      text: "Further, klezmorim were usually itinerant musicians, who moved from town to town for work.",
    },
  ];

  const { recorderState, ...handlers } = useRecorder();
  // const { audio } = recorderState;
  const { initRecording } = recorderState;
  const { startRecordingFunc, saveRecordingFunc, cancelRecording } = handlers;

  const [quotes, setQuotes] = useState(initialQuotes);
  const { recordings, setRecordings, loading, setLoading } =
    useContext(RecordingContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (recordings.length > 0) {
      var y = document.getElementsByClassName("pill-content");
      function togglePlay() {
        var myAudio = document.getElementsByTagName("audio")[0];

        if (myAudio) {
          if (myAudio.paused) {
            myAudio.play();
            document.getElementById("button-pill").innerText = "Pause";
          } else {
            myAudio.pause();
            document.getElementById("button-pill").innerText = "Play";
          }
        }
      }
      y[recordings.length - 1].innerHTML = `<div id="player">
        <button id="button-pill">Play</button>
          <audio>
              <source src="${recordings[recordings.length - 1].audio}"
              />
          </audio>
        </div>`;
      document
        .getElementById("button-pill")
        .addEventListener("click", togglePlay);
    }
  }, [recordings]);

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
              <span className="mx-10 text-xl pb-3 border-b-2 border-black font-serif">
                Speak
              </span>
              <span className="text-xl pb-3 font-serif">Listen</span>
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
                <CgPlayStopR className="text-red-500 z-40 text-3xl" />
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
