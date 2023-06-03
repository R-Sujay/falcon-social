import { useState } from "react";
import Image from "next/image";
import LoginBg from "../components/LoginBg";

export default function Login() {
  const [signUp, setSignUp] = useState(false);
  const [getStarted, setGetStarted] = useState(false);

  return (
    <div className="bg-[#060933] h-screen relative flex flex-col justify-center items-center z-0">
      <LoginBg />

      {/* <div className="max-w-3xl border-2 border-gray-500 w-1/3 z-50 h-3/5 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-10 py-20 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-white font-semibold">Login</h1>
      </div> */}
      <div className="flex justify-center items-center min-h-screen duration-500 z-50">
        <div className="relative w-[800px] h-[500px] m-5 login:max-w-[400px] login:h-[650px] flex justify-center items-center">
          {/* <div className="blueBg"> */}
          <div className={`absolute top-10 border-2 border-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-3xl  flex justify-center items-center bg-[rgba(255, 255, 255, 0.2)] shadow-[0_5px_45px_rgba(0, 0, 0, 0.15)] login:top-0 login:h-full transition-width duration-500 ${getStarted ? "w-full h-[420px]" : "h-[450px] w-1/2"}`}>
            {getStarted ? (
              <>
                <div className={`loginBox login:top-0 ${!signUp && "opacity-0 invisible"}`}>
                  <h2 className="loginBoxH2">Already Have an Account</h2>
                  <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group" onClick={() => setSignUp(false)}>
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Sign in</span>
                  </button>
                </div>
                <div className={`loginBox ${signUp && "opacity-0 invisible"}`}>
                  <h2 className="loginBoxH2">Don't Have an Account</h2>
                  <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group" onClick={() => setSignUp(true)}>
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Sign up</span>
                  </button>
                </div>
              </>
            ) : (
              <div className={`flex flex-col items-center space-y-20 transition-opacity duration-300 ${getStarted ? "opacity-0" : "opacity-1001"}`}>
                <Image src="https://rb.gy/ogau5a" width={150} height={150} objectFit="contain" />

                <div>
                  <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group" onClick={() => setGetStarted(true)}>
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white px-3 text-lg">Get Started</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* <div className={`formBx ${signUp === true ? "active" : ""}`}> */}
          <div className={`transition-display duration-1000 opacity-0 ${getStarted ? "visible opacity-100" : "invisible"}`}>
            <div className={`absolute top-0 w-1/2 h-full border-2 border-gray-500 backdrop-filter backdrop-blur-sm bg-opacity-0 rounded-3xl z-50 flex justify-center items-center shadow-[0_5px_45px_rgba(0, 0, 0, 0.25)] transition-all ease-in-out duration-500 overflow-hidden login:w-full login:h-[500px] login:top-0 login:shadow-none opacity-100 ${signUp ? "left-1/2 login:left-0 login:top-[150px]" : "left-0"}`}>
              <div className={`loginForm ${signUp ? "delay-[0s] -left-full" : "delay-[0.25s]"}`}>
                <form className="loginFields">
                  <h3 className="loginTitle">Sign In</h3>

                  <input type="email" placeholder="Email" className="loginFormInput" />
                  <input type="password" placeholder="Password" className="loginFormInput" />

                  <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group w-fit mx-auto" type="submit">
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Login</span>
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

                  <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group w-fit mx-auto" type="submit">
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Register</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
