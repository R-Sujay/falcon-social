import { useState } from "react";
import LoginBg from "../components/LoginBg";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Toaster } from "react-hot-toast";

export default function Login() {
  const [signUp, setSignUp] = useState(false);

  return (
    <div className="bg-[#1a0835] max-h-screen h-screen overflow-hidden relative flex flex-col justify-center items-center z-0">
      <LoginBg />
      <Toaster />

      <div className="flex justify-center items-center min-h-screen duration-500 z-50">
        <div className="relative w-[800px] h-[500px] m-5 login:max-w-[400px] login:h-screen loginSm:w-[90vw] flex justify-center items-center">
          <div className="absolute top-10 border-2 border-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-3xl flex justify-center items-center bg-[rgba(255, 255, 255, 0.2)] shadow-[0_5px_45px_rgba(0, 0, 0, 0.15)] login:top-0 login:h-full animate-width w-full h-[420px]">
            <div className={`loginBox login:top-0 ${!signUp && "opacity-0 invisible"}`}>
              <h2 className="loginBoxH2">Already Have an Account</h2>
              <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group" onClick={() => setSignUp(false)}>
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#5a16c6] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Sign in</span>
              </button>
            </div>

            <div className={`loginBox animate-fadeIn ${signUp && "opacity-0 invisible"}`}>
              <h2 className="loginBoxH2">Don't Have an Account</h2>
              <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group" onClick={() => setSignUp(true)}>
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#5a16c6] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Sign up</span>
              </button>
            </div>
          </div>

          <div className="animate-fadeIn">
            <div className={`absolute top-0 w-1/2 h-full border-2 border-gray-500 backdrop-filter backdrop-blur-sm bg-opacity-0 rounded-3xl z-50 flex justify-center items-center shadow-[0_5px_45px_rgba(0, 0, 0, 0.25)] transition-all ease-in-out duration-500 overflow-hidden login:w-full login:min-h-[390px] login:max-h-[75%] login:shadow-none opacity-100 ${signUp ? "left-1/2 login:left-0 login:top-[25%]" : "left-0 login:top-0"}`}>
              <div className={`loginForm ${signUp ? "delay-[0s] -left-full" : "delay-[0.25s]"}`}>
                <SignIn />
              </div>

              <div className={`loginForm delay-[0s]  ${signUp ? "left-0" : "left-full"}`}>
                <SignUp />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
