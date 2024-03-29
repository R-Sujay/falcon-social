import React from "react";
import LeftTopBg from "../components/login/LeftTopBg";
import LeftBottomBg from "../components/login/LeftBottomBg";
import RightBottomBg from "../components/login/RightBottomBg";
import RightTopBg from "../components/login/RightTopBg";

function LoginBg() {
  return (
    <div className="-z-10 bg-[#140726] w-screen h-screen overflow-hidden fixed">
      {/* <Image src="https://i.imgur.com/Djjy7fC.png" layout="fill" /> */}
      <div className="absolute max-h-[50%] w-1/2 -left-20 -top-3 z-50">
        <LeftTopBg />
      </div>
      <div className="absolute max-h-[70%] w-[70%] bottom-0 left-0 z- 0">
        <LeftBottomBg />
      </div>
      <div className="absolute max-h-[50%] w-[40%] top-0 right-0 opacity-70">
        <RightTopBg />
      </div>
      <div className="absolute max-h-[80%] w-[68%] -bottom-3 -right-3 -z-10">
        <RightBottomBg />
      </div>
    </div>
  );
}

export default LoginBg;
