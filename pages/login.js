import Image from "next/image";
import React, { useEffect, useState } from "react";
import LeftTopBg from "../components/login/LeftTopBg";
import LeftBottomBg from "../components/login/LeftBottomBg";
import RightBottomBg from "../components/login/RightBottomBg";
import RightTopBg from "../components/login/RightTopBg";

function login() {
  const [signUp, setSignUp] = useState(false);
  console.log(signUp);

  return (
    <div className="bg-[#060933] h-screen relative flex flex-col justify-center items-center z-0">
      <div className="-z-10">
        {/* <Image src="https://i.imgur.com/Djjy7fC.png" layout="fill" /> */}
        <div className="absolute max-h-[50%] w-1/2 overflow-clip left-0 top-0">
          <LeftTopBg />
        </div>
        <div className="absolute max-h-[70%] w-[70%] bottom-0 left-0 z-10">
          <LeftBottomBg />
        </div>
        <div className="absolute max-h-[50%] w-[40%] top-0 right-0">
          <RightTopBg />
        </div>
        <div className="absolute max-h-[80%] w-[68%] bottom-0 right-0">
          <RightBottomBg />
        </div>
      </div>

      {/* <div className="max-w-3xl border-2 border-gray-500 w-1/3 z-50 h-3/5 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-10 py-20 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-white font-semibold">Login</h1>
      </div> */}
      <div className="flex justify-center items-center min-h-screen duration-500 z-50">
        {/* <div className="container"> */}
        <div className="relative w-[800px] h-[500px] m-5 login:max-w-[400px] login:h-[650px] login:flex login:justify-center login:items-center">
          {/* <div className="blueBg"> */}
          <div className="absolute top-10  border-2 border-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 w-full rounded-3xl h-[420px] flex justify-center items-center bg-[rgba(255, 255, 255, 0.2)] shadow-[0_5px_45px_rgba(0, 0, 0, 0.15)] login:top-0 login:h-full">
            <div className={`loginBox login:top-0 ${!signUp && "opacity-0"}`}>
              <h2 className="loginBoxH2">Already Have an Account</h2>
              <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group" onClick={() => setSignUp(false)}>
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Sign in</span>
              </button>
            </div>
            <div className={`loginBox ${signUp && "opacity-0"}`}>
              <h2 className="loginBoxH2">Don't Have an Account</h2>
              <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group" onClick={() => setSignUp(true)}>
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Sign up</span>
              </button>
            </div>
          </div>
          {/* <div className={`formBx ${signUp === true ? "active" : ""}`}> */}
          <div className={`absolute top-0 w-1/2 h-full border-2 border-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-3xl z-50 flex justify-center items-center shadow-[0_5px_45px_rgba(0, 0, 0, 0.25)] ease-in-out duration-500 overflow-hidden login:w-full login:h-[500px] login:top-0 login:shadow-none ${signUp ? "left-1/2 login:left-0 login:top-[150px]" : "left-0"}`}>
            <div className={`loginForm ${signUp ? "delay-[0s] -left-full" : "delay-[0.25s]"}`}>
              <form className="loginFields">
                <h3 className="loginTitle">Sign In</h3>
                <input type="text" placeholder="Username" className="loginFormInput" />
                <input type="password" placeholder="Password" className="loginFormInput" />

                <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-transparent group w-fit mx-auto" type="submit">
                  <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Login</span>
                </button>
              </form>
            </div>

            <div className={`loginForm delay-[0s]  ${signUp ? "left-0" : "left-full"}`}>
              <form className="loginFields">
                <h3 className="loginTitle">Sign Up</h3>
                <input type="text" placeholder="Username" className="loginFormInput" />
                <input type="password" placeholder="Email Address" className="loginFormInput" />
                <input type="password" placeholder="Password" className="loginFormInput" />
                <input type="password" placeholder="Confirm Password" className="loginFormInput" />

                <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group" type="submit">
                  <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Register</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default login;
