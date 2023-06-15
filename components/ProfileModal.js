import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import useSession from "../lib/useSession";
import { useRecoilState } from "recoil";
import { profileModalState } from "../atoms/modalAtom";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/solid";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

function ProfileModal() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useRecoilState(profileModalState);

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-[120] inset-0" onClose={setIsModalOpen}>
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-[#000] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div className="mx-auto pt-5 flex flex-col min-h-[500px] align-bottom bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 rounded-2xl text-left overflow-hidden shadow-xl transform transition-all mt-3 sm:align-middle w-full sm:max-w-xl md:max-w-3xl sm:w-full">
              <div className="flex items-center px-7 ">
                <h1 className="xs:text-xl text-white font-semibold text-lg">Profile Details</h1>

                <div className="ml-auto hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" onClick={() => setIsModalOpen(false)}>
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>

              <div className="flex px-0 pt-5 pb-2.5 sm:px-6 w-full flex-1">
                <form className="w-full min-h-full flex flex-col sm:flex-row">
                  <div className=" flex justify-center items-center">
                    <div className="relative sm:w-40 sm:h-40 md:w-80 md:h-80 w-full h-full mx-5 sm:max-w-none max-w-[200px]">
                      <img src={session.user.image} layout="fill" className="object-cover rounded-full" />
                    </div>
                  </div>

                  <div className="flex flex-col mt-10 sm:mt-10 items-center w-full sm:pl-5">
                    <div className="flex-1 h-80 max-w-[85%]">
                      <input type="text" className="loginFormInput text-gray-400 cursor-no-drop" placeholder={session.user.name} disabled />
                      <input type="email" placeholder="Email Address" value={session.user.email} className="loginFormInput text-gray-400 cursor-no-drop" disabled />
                    </div>

                    <div className="mb-10 w-full max-w-[85%]">
                      <button
                        className="text-gray-200 w-full bg-red-600 hover:bg-transparent border-red-600 hover:border transition-all rounded-3xl py-2"
                        onClick={() => {
                          setCookie("user", null);
                          router.reload();
                        }}
                      >
                        Sign Out
                      </button>
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
