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
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full animate-widthShrink z-[100]">
      <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} onClick={() => router.push("/")} />
      </div>
      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarLink text="Home" Icon={HomeIcon} active />
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardListIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="hidden xl:inline bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] mr-auto ml-[100px]">Tweet</button>

      <div className="flex justify-start items-center h-min w-full mt-auto mb-5 pl-20">
        <div className="text-[#d9d9d9] flex items-center justify-center hoverAnimation w-max xl:-mr-3" onClick={() => setModal(true)}>
          <img src={session.user.image} alt="" className="h-10 w-10 rounded-full xl:mr-2.5" />
          <div className="hidden xl:inline leading-5">
            <h4 className="font-bold">{session.user.name}</h4>
            <p className="text-[#6e767d]">@{session.user.tag}</p>
          </div>
          <DotsHorizontalIcon className="h-5 hidden xl:inline-flex ml-10" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
