import React from "react";
import Navbar from "./Navbar";
import "./Home.css";
import { BsMic } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import Register from "./Register";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* speak & listen section  */}
      <div className="heroes-multiple">
        <div className="hero-box-speak">
          <div className="speak-container">
            <div className="speak-info">
              <h1 className="text-5xl font-normal my-2 font-serif">Speak</h1>
              <h3 className="text-xl font-serif">Donate your voice</h3>
              <p className="speak-desc">
                Recording voice clips is an integral part of building our open
                dataset; some would say it's the fun part too.
              </p>
            </div>
            <Link to="/speak" className="z-40">
              <div className="speak-button-group">
                <div className="absolute speak-button-background z-10"></div>
                <div className="absolute speak-button z-20"></div>
                <BsMic className="text-red-500 text-3xl mic-icon z-30" />
                <p className="below-button-text">Help us get to 1,200</p>
              </div>
            </Link>
            <div className="progress">
              <h3 className="text-xl font-normal font-serif">
                Today's Progress
              </h3>
              <span className="inline-flex items-start">
                <span className="font-semibold text-2xl">253</span>
                <span className="font-semibold whitespace-pre"> / 1200</span>
              </span>
              <p className="text-gray-500">
                <i>Clips recorded</i>
              </p>
            </div>
          </div>
          <div className="speak-background"></div>
        </div>
        <div className="hero-box-listen">
          <div className="listen-container">
            <div className="listen-info">
              <h1 className="text-5xl font-normal my-2 font-serif">Listen</h1>
              <h3 className="text-xl font-serif">Help us validate voices</h3>
              <p className="listen-desc">
                Validating donated clips is equally important to the Common
                Voice mission. Take a listen and helimport Footer from
                './Footer'; p us create quality open source voice data.
              </p>
            </div>
            <Link to="/listen" className="z-40">
              <div className="listen-button-group">
                <div className="absolute listen-button-background z-10"></div>
                <div className="absolute listen-button z-20"></div>
                <FaPlay className="text-[var(--valid-green)] text-3xl play-icon z-30" />
                <p className="below-button-text">Help us get to 2,400</p>
              </div>
            </Link>
            <div className="progress-listen">
              <h3 className="text-xl font-normal font-serif">
                Today's Progress
              </h3>
              <span className="inline-flex items-start">
                <span className="font-semibold text-2xl">30</span>
                <span className="font-semibold whitespace-pre"> / 2400</span>
              </span>
              <p className="text-gray-500">
                <i>Validated Clips</i>
              </p>
            </div>
          </div>
          <div className="listen-background"></div>
        </div>
      </div>
      {/* text section  */}
      <div className="bg-[var(--lighter-grey)] pt-24 px-5 pb-40">
        <div className="flex justify-center mx-auto container px-40">
          <div className="w-1/2 mr-8">
            <h1 className="text-4xl font-serif w-[85%] m-auto">
              Mozilla Common Voice is an initiative to help teach machines how
              real people speak.
            </h1>
          </div>
          <div className="desc w-1/2">
            <p className="max-w-lg mr-auto text-[var(--near-black)]">
              Voice is natural, voice is human. That’s why we’re excited about
              creating usable voice technology for our machines. But to create
              voice systems, developers need an extremely large amount of voice
              data.
            </p>
            <br />
            <p className="max-w-lg mr-auto text-[var(--near-black)]">
              Most of the data used by large companies isn’t available to the
              majority of people. We think that stifles innovation. So we’ve
              launched Common Voice, a project to help make voice recognition
              open and accessible to everyone.
            </p>
            <br />
            <button className="text-[var(--blue)] uppercase text-xs font-semibold">
              Read More
            </button>
          </div>
        </div>
      </div>
      {/* register  */}
      <Register />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
