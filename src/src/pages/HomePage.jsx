import React from "react";
import PassBox from "../components/PassBox";
import { ImFire } from "react-icons/im";

const HomePage = () => {
  return (
    <div className="">
      <div className="h-16 bg-slate-900 flex items-center fixed w-full mb-16">
        <div className="flex w-[95%] md:w-[85%] mx-auto items-center">
          <div className="text-green-300 text-4xl">
            <ImFire />
          </div>
          <span className="text-white text-2xl font-bold ml-2">NordPass</span>
        </div>
      </div>

      <div className="flex h-ful w-[95%] mx-auto my-auto  justify-center items-center flex-col text-center">
        <p className="text-3xl md:text-5xl font-extrabold mt-20 md:mt-28 mb-10 ">
          Password Generator powered by NordPass
        </p>
        <p className="mb-10 text-black font-medium">
          Create unique passwords and store them safely in NordPass.
        </p>
        <PassBox />
      </div>
    </div>
  );
};

export default HomePage;
