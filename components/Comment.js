import React, { forwardRef } from "react";
import Moment from "react-moment";
import Tilt from "react-parallax-tilt";

const Comment = forwardRef(({ id, comment }, ref) => {
  return (
    <div ref={ref}>
      <Tilt glareEnable={true} tiltEnable={true} className="overflow-hidden p-3 flex cursor-pointer bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-3xl">
        <img src={comment?.userImg} alt="" className="h-11 w-11 rounded-full mr-4" />
        <div className="flex flex-col space-y-2 w-full">
          <div className="flex justify-between">
            <div className="text-[#6e767d]">
              <div className="inline-block group">
                <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">{comment?.username}</h4>
                <span className="ml-1.5 text-sm sm:text-[15px]">@{comment?.tag} </span>
              </div>{" "}
              •{" "}
              <span className="hover:underline text-sm sm:text-[15px]">
                <Moment fromNow>{comment?.$createdAt}</Moment>
              </span>
              <p className="text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll text-[15px] sm:text-base scrollbar-hide">{comment?.comment}</p>
            </div>
          </div>
        </div>
      </Tilt>
    </div>
  );
});

export default Comment;
