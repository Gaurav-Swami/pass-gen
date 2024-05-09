import React from "react";
import { GrRefresh } from "react-icons/gr";
import { GiCrackedShield } from "react-icons/gi";
import { MdOutlineShield } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";
import { useState, useEffect } from "react";

const PassBox = () => {
  const [isChecked, setIsChecked] = useState([true, false, false, false]);
  const [password, setPassword] = useState("");
  const [str, setStr] = useState("abcdefghijklmnopqrstuvwxyz");
  const [len, setLen] = useState(15);
  const [rotation, setRotation] = useState(0);
  const [strength, setStrength] = useState(1);
  const [status, setStatus] = useState("Copy Password");
  const [color, setColor] = useState("green");

  const handleChange = (position) => {
    const checkedCount = isChecked.reduce(
      (acc, item) => acc + (item ? 1 : 0),
      0
    );

    if (checkedCount === 1 && isChecked[position]) {
      return;
    }

    const updatedIsChecked = isChecked.map((item, index) =>
      index === position ? !item : item
    );
    setIsChecked(updatedIsChecked);
  };

  const createStr = () => {
    let newStr = "";
    if (isChecked[0]) {
      newStr += "abcdefghijklmnopqrstuvwxyz";
    }
    if (isChecked[1]) {
      newStr += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (isChecked[2]) {
      newStr += "0123465789";
    }
    if (isChecked[3]) {
      newStr += "!@#$%^&*()_+}]|:;<,>.?/~`|";
    }
    setStr(newStr);
  };
  useEffect(() => {
    createStr();
  }, [isChecked]);
  useEffect(() => {
    createPass();
  }, [len, str]);

  const createPass = () => {
    setStatus("Copy Password");
    
    let pass = "";
    for (let i = 0; i < len; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str[randomIndex];
    }
    setPassword(pass);
    console.log(pass);
    return pass;
  };
  const handleRefresh = () => {
    const newRotation = rotation + 360;
    setRotation(newRotation);
    createPass();
  };

  const checkStrength = () => {
    let points = 1;
    if (len > 12 && len <= 20) {
      points += 4;
    } else if (len > 20) {
      points += 6;
    }

    const countTrue = isChecked.filter((item) => item === true).length;
    if (countTrue == 2) {
      points += 1;
    } else if (countTrue == 3) {
      points += 2;
    } else if (countTrue == 4) {
      points += 3;
    }

    if (points < 3) {
      setStrength(1);
    } else if (points > 2 && points < 5) {
      setStrength(2);
    } else if (points > 4) {
      setStrength(3);
    }
  };

  useEffect(() => {
    checkStrength();
  }, [password]);

  const onCopy = () => {
    navigator.clipboard.writeText(password);  
    setStatus("\u2713" + " Copied!");
  };

  const copyClass = `bg-green-300  py-2 w-[162px] font-bold hover:bg-green-100 transition-all rounded-full`;

  return (
    <div className="w-[100%] lg:w-[912px] md:w-[90%]   bg-slate-800 rounded-2xl">
      <div className=" flex flex-col  md:flex-row md:justify-between items-center p-8">
        <div className="w-full md:w-[60%] lg:w-[70%]">
          <p className="text-white text-2xl break-words sm:text-center md:text-left">
            {password}
          </p>
        </div>
        <div className="flex item-center justify-between mt-7 md:mt-0">
          <div
            style={{ transform: `rotate(${rotation}deg)` }}
            className="text-4xl mr-6 text-gray-400  cursor-pointer transition-transform"
            onClick={handleRefresh}
          >
            <GrRefresh />
          </div>
          <button
            className={copyClass}
            onClick={onCopy}
          >
            {status}
          </button>
        </div>
      </div>
      <hr className="h-[0.5px] " />
      <div className="px-8 text-base md:text-lg">
        <div className="text-white py-6 border-b text-left  ">
          <span className="mr-3"> Password strength: </span>
          {strength === 1 && (
            <div className="inline">
              <GiCrackedShield className="inline text-3xl text:2xl  text-red-400 " />{" "}
              <span className="ml-2">WEAK</span>
            </div>
          )}
          {strength === 2 && (
            <div className="inline">
              <MdOutlineShield className="inline text-3xl  text-gray-400 " />{" "}
              <span className="ml-2">MODERATE</span>
            </div>
          )}
          {strength === 3 && (
            <div className="inline ">
              <LuShieldCheck className="inline text-3xl  text-green-400 " />{" "}
              <span className="ml-2">STRONG</span>
            </div>
          )}
        </div>
        <div className="text-white py-6 border-b  flex">
          <div className="mr-6 py-1 text-left whitespace-nowrap">
            Password length:{" "}
          </div>
          <div className="flex items-center w-[100%]">
            {len}
            <input
              type="range"
              value={len}
              min="8"
              max="60"
              className="w-[100%] accent-green-300 ml-2"
              onChange={(e) => {
                setLen(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="text-white py-6 flex flex-col md:flex-row justify-around mb-4    ">
          <div className="flex">
            <input
              type="checkbox"
              className="w-6 accent-green-300"
              checked={isChecked[0]}
              onChange={() => handleChange(0)}
            />
            <div className="ml-4 mb-2">Use lowercase</div>
          </div>
          <div className="flex ">
            <input
              type="checkbox"
              className="w-6 accent-green-300"
              checked={isChecked[1]}
              onChange={() => handleChange(1)}
            />
            <div className="ml-4 mb-2">Use uppercase</div>
          </div>
          <div className="flex  ">
            <input
              type="checkbox"
              className="w-6 accent-green-300"
              checked={isChecked[2]}
              onChange={() => handleChange(2)}
            />
            <div className="ml-4 mb-2">Use digits</div>
          </div>
          <div className="flex    ">
            <input
              type="checkbox"
              className="w-6 accent-green-300"
              checked={isChecked[3]}
              onChange={() => handleChange(3)}
            />
            <div className="ml-4 mb-2">Use symbols</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassBox;
