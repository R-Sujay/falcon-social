import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import useSession from "../lib/useSession";
import { useRecoilState } from "recoil";
import { profileModalState } from "../atoms/modalAtom";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useForm } from "react-hook-form";

function ProfileModal() {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useRecoilState(profileModalState);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const userInput = watch("userName");

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-[120] inset-0 pt-8" onClose={setIsModalOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="mx-auto flex flex-col min-h-[500px] align-bottom bg-black border border-[#333] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-xl md:max-w-3xl sm:w-full">
              <div className="flex items-center px-7 py-2 border-b border-gray-700">
                <h1 className="text-xl text-white font-semibold">Profile Details</h1>

                <div className="ml-auto hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" onClick={() => setIsModalOpen(false)}>
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>

              <div className="flex px-7 pt-5 pb-2.5 sm:px-6 w-full flex-1">
                <form className="w-full min-h-full flex" onSubmit={handleSubmit(onSubmit)}>
                  <div className=" flex justify-center items-center">
                    <div className="relative w-80 h-80">
                      <Image src={session.user.image} layout="fill" className="object-cover rounded-full" />
                    </div>
                  </div>

                  <div className="flex flex-col mt-10 items-center w-full pl-5">
                    <div className="flex-1 h-80 max-w-[85%]">
                      <input type="text" className="loginFormInput" placeholder={session.user.name} {...register("userName")} />
                      <input type="email" placeholder="Email Address" value={session.user.email} className="loginFormInput text-gray-400 cursor-no-drop" disabled />
                    </div>

                    <div className="mb-10 w-full max-w-[85%]">
                      <button className="text-gray-200 w-full border-2 border-[#1d9bf0] rounded-3xl py-2 disabled:opacity-50" disabled={!userInput || userInput === session.user.name}>
                        Update Profile
                      </button>
                      <div className="border border-[#333] my-5" />
                      <button className="text-gray-200 w-full bg-red-600 hover:bg-transparent border-red-600 hover:border transition-all rounded-3xl py-2">Delete Account</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ProfileModal;