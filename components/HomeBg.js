import React from "react";
import TopBg from "./home/TopBg";
import BottomBg from "./home/BottomBg";

function HomeBg() {
  return (
    <div className="-z-10 bg-[#040433] w-screen h-screen overflow-hidden fixed">
      <div className="absolute h-screen w-screen md:h-[50vh] -top-[6%] -left-[19%] xs:-top-[9%] xs:-left-[19%]  sm:-left-[370px] sm:!-top-[15%] lg:!-top-[20%] xl:!-top-[23%] -z-50">
        <TopBg />
      </div>
      <div className="absolute h-screen w-screen sm:h-[50vh] -bottom-[82%] -right-[63px] xs:-bottom-[80%] xs:-right-[25%] sm:!-right-[160px] sm:!-bottom-10 md:!-bottom-6 md:!-right-[23%] lg:!bottom-20 lg:!-right-[260px] xl:!bottom-32 xl:!-right-[320px] z-50">
        <BottomBg />
      </div>

      <div className="absolute w-20 h-20 rounded-full left-[10vw] top-[40%] bg-gradient" />
      <div className="absolute w-14 h-14 rounded-full left-[10vw] top-[15%] bg-gradient" />
      <div className="absolute w-20 h-20 rounded-full left-[80vw] top-[20%] bg-gradient" />
      <div className="absolute w-20 h-20 rounded-full left-[50vw] top-[80%] bg-gradient hidden lg:inline" />
      <div className="z-50 absolute w-20 h-20 rounded-full left-[60vw] bottom-[20%] bg-gradient" />
      <div className="z-50 absolute w-14 h-14 rounded-full left-[40vw] bottom-[20%] bg-gradient hidden lg:inline" />
      <div className="z-50 absolute w-14 h-14 rounded-full left-[30vw] bottom-[5%] bg-gradient" />
    </div>
  );
}

export default HomeBg;
