import React from "react";

const Home = () => {
  return (
    <div className="bg-[#252934] min-h-[100vh] flex justify-center items-center gap-2 ">
      <div className="text-white text-3xl text-center">
        <div>
          Hello,I am <span className="text-[#E31B6D]">THIHA LINN.</span>
        </div>
        <div>I'am a full-stack web developer.</div>
        <button className="mt-5 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-[#252934] rounded-md group-hover:bg-opacity-0">
            Download CV
          </span>
        </button>
      </div>
    </div>
  );
};

export default Home;
