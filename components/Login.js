import { useState } from "react";
import Image from "next/image";
import LoginBg from "../components/LoginBg";
import { useForm } from "react-hook-form";

export default function Login() {
  const [signUp, setSignUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();

  const onSignUpSubmit = async (data) => {
    console.log(data);
  };

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="bg-[#060933] max-h-screen overflow-hidden relative flex flex-col justify-center items-center z-0">
      <LoginBg />

      {/* <div className="max-w-3xl border-2 border-gray-500 w-1/3 z-50 h-3/5 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 px-10 py-20 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-white font-semibold">Login</h1>
      </div> */}
      <div className="flex justify-center items-center min-h-screen duration-500 z-50">
        <div className="relative w-[800px] h-[500px] m-5 login:max-w-[400px] login:h-screen loginSm:w-[90vw] flex justify-center items-center">
          {/* <div className="blueBg"> */}
          <div className="absolute top-10 border-2 border-gray-500 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-3xl flex justify-center items-center bg-[rgba(255, 255, 255, 0.2)] shadow-[0_5px_45px_rgba(0, 0, 0, 0.15)] login:top-0 login:h-full animate-width w-full h-[420px]">
            <div className={`loginBox login:top-0 ${!signUp && "opacity-0 invisible"}`}>
              <h2 className="loginBoxH2">Already Have an Account</h2>
              <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group" onClick={() => setSignUp(false)}>
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Sign in</span>
              </button>
            </div>

            <div className={`loginBox animate-fadeIn ${signUp && "opacity-0 invisible"}`}>
              <h2 className="loginBoxH2">Don't Have an Account</h2>
              <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group" onClick={() => setSignUp(true)}>
                <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Sign up</span>
              </button>
            </div>
          </div>

          {/* <div className={`formBx ${signUp === true ? "active" : ""}`}> */}
          <div className="animate-fadeIn">
            <div className={`absolute top-0 w-1/2 h-full border-2 border-gray-500 backdrop-filter backdrop-blur-sm bg-opacity-0 rounded-3xl z-50 flex justify-center items-center shadow-[0_5px_45px_rgba(0, 0, 0, 0.25)] transition-all ease-in-out duration-500 overflow-hidden login:w-full login:min-h-[390px] login:max-h-[75%] login:shadow-none opacity-100 ${signUp ? "left-1/2 login:left-0 login:top-[25%]" : "left-0 login:top-0"}`}>
              <div className={`loginForm ${signUp ? "delay-[0s] -left-full" : "delay-[0.25s]"}`}>
                <form className="loginFields" onSubmit={handleSubmit(onSubmit)}>
                  <h3 className="loginTitle">Sign In</h3>

                  <input type="email" placeholder="Email" className="loginFormInput" {...register("userName", { required: true })} />
                  <input type="password" placeholder="Password" className="loginFormInput" {...register("password", { required: true })} />

                  <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white/10 rounded group w-fit mx-auto" type="submit">
                    <span className="w-48 h-48 rounded rotate-[-40deg] bg-[#1b9bf0] absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-left text-white transition-colors duration-300 ease-in-out group-hover:text-white">Login</span>
                  </button>
                </form>
              </div>

              <div className={`loginForm delay-[0s]  ${signUp ? "left-0" : "left-full"}`}>
                <form className="loginFields" onSubmit={handleSubmitSignUp(onSignUpSubmit)}>
                  <h3 className="loginTitle">Sign Up</h3>
                  <input type="text" placeholder="Username" className="loginFormInput" {...registerSignUp("userName", { required: true })} />
                  <input type="email" placeholder="Email Address" className="loginFormInput" {...registerSignUp("email", { required: true })} />
                  <input type="password" placeholder="Password" className="loginFormInput" {...registerSignUp("password", { required: true })} />
                  <input type="password" placeholder="Confirm Password" className="loginFormInput" {...registerSignUp("confirmPassword", { required: true })} />

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
