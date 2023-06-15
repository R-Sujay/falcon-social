import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import useSession from "../lib/useSession";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { useState } from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import { postState } from "../atoms/postAtom";
import addComment from "../lib/addComment";
import useGetState from "../hooks/useGetState";

function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const postId = useRecoilValue(postIdState);
  const posts = useRecoilValue(postState);
  const post = posts.find((post) => post.$id === postId);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { getPosts } = useGetState({ postId: "" });

  const sendComment = async (e) => {
    e.preventDefault();

    const promise = await addComment({
      comment: comment,
      tag: session.user.tag,
      userImg: session.user.image,
      username: session.user.name,
      postRef: postId,
    });

    getPosts();
    setIsOpen(false);
    setComment("");
    router.push(`/${postId}`);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="inline-block align-bottom bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" onClick={() => setIsOpen(false)}>
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />
                    <img src={post?.userImg} alt="" className="h-11 w-11 rounded-full" />
                    <div>
                      <div className="inline-block group">
                        <h4 className="font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base">{post?.username}</h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">@{post?.tag} </span>
                      </div>{" "}
                      ·{" "}
                      <span className="hover:underline text-sm sm:text-[15px]">
                        <Moment fromNow>{post?.$createdAt}</Moment>
                      </span>
                      <p className="text-[#d9d9d9] text-[15px] sm:text-base">{post?.text}</p>
                    </div>
                  </div>

                  <div className="mt-7 flex space-x-3 w-full">
                    <img src={session.user.image} alt="" className="h-11 w-11 rounded-full" />
                    <div className="flex-grow mt-2">
                      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="What's going?!" rows="2" className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]" />

                      <div className="flex items-center justify-between pt-2.5">
                        <button className="bg-[#1d9bf0] w-full mb-3 text-white rounded-full px-4 py-2 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default" type="submit" onClick={sendComment} disabled={!comment.trim()}>
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
