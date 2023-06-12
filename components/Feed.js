import Input from "./Input";
import Post from "./Post";
import fetchPosts from "../lib/fetchPosts";
import { toast } from "react-hot-toast";
import { RefreshIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import { postState } from "../atoms/PostAtom";
import useGetState from "../hooks/useGetState";

function Feed() {
  const posts = useRecoilValue(postState);
  const { getPosts } = useGetState({ postId: "" });

  const handleRefresh = () => {
    const refreshToast = toast.loading("Refreshing...", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    getPosts();

    toast.success("Feed Updated!", {
      id: refreshToast,
    });
  };

  return (
    <div className="text-white flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-12 h-12 flex items-center justify-center xl:px-0 ml-auto">
          <RefreshIcon className="h-8 text-white" onClick={() => handleRefresh()} />
        </div>
      </div>

      <Input />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.$id} id={post.$id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
