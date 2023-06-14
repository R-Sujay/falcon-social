import Image from "next/image";
import SidebarLink from "./SidebarLink";
import { DotsHorizontalIcon, HomeIcon } from "@heroicons/react/solid";
import { BellIcon, BookmarkIcon, ClipboardListIcon, DotsCircleHorizontalIcon, HashtagIcon, InboxIcon, UserIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import useSession from "../lib/useSession";
import { useRecoilState } from "recoil";
import { profileModalState } from "../atoms/modalAtom";

function Sidebar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [modal, setModal] = useRecoilState(profileModalState);

  return (
    <div className="hidden sm:flex flex-col mr-1 items-center xl:items-start xl:w-[340px] p-2 fixed h-full animate-widthShrink z-[100]">
      <div className="flex items-center ml-5 justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} onClick={() => router.push("/")} />
      </div>

      <div className="mt-auto mb-8 xl:hidden" onClick={() => setModal(true)}>
        <img src={session.user.image} alt="" className="h-10 w-10 rounded-full ml-5" />
      </div>

      <div className="hidden xl:flex justify-between items-center h-full w-full pl-20">
        <div className="text-[#d9d9d9] items-center justify-center hoverAnimation py-5 rounded-3xl w-full xl:-mr-3">
          <img src={session.user.image} alt="" className="h-56 w-56 rounded-3xl mx-auto mb-5 object-cover" />
          <div className="hidden xl:inline leading-5 text-center">
            <h4 className="font-bold text-2xl">{session.user.name}</h4>
            <p className="text-[#6e767d] text-lg">@{session.user.tag}</p>
          </div>
          {/* <DotsHorizontalIcon className="h-5 hidden xl:inline-flex ml-10" /> */}

          <div className="flex flex-col mt-5 items-center w-full mx-auto">
            <div className="w-full max-w-[85%]">
              <button className="text-gray-200 w-full bg-red-600 hover:bg-transparent border-red-600 hover:border transition-all rounded-3xl py-2">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
