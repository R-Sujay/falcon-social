import Input from "./Input";
import Post from "./Post";
import { toast } from "react-hot-toast";
import { RefreshIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import { postState, searchPostState } from "../atoms/PostAtom";
import useGetState from "../hooks/useGetState";
import { motion } from "framer-motion";
import HeaderItem from "./HeaderItem";
import { useState } from "react";

const items = [
  { text: "About", id: 0 },
  { text: "Projects", id: 1 },
];

function Feed() {
  const posts = useRecoilValue(postState);
  const { getPosts } = useGetState({ postId: "" });
  const searchedPosts = useRecoilValue(searchPostState);
  const [selected, setSelected] = useState(items[0].id);

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
    <div className="text-white flex-grow max-w-2xl sm:ml-24 xl:ml-[370px] animate-fadeFeedIn mt-5">
      <div className="xl:hidden h-14">
        <div className="w-min relative mx-auto">
          <motion.div layoutId={selected}>
            <ul className="list-none m-0 p-0 flex -z-50">
              {items.map((item, index) => (
                <HeaderItem
                  key={index}
                  text={item.text}
                  isSelected={selected === item.id}
                  onClick={() => {
                    setSelected(item.id);
                  }}
                />
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-10 sticky top-0 z-50 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-3xl">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-12 h-12 flex items-center justify-center xl:px-0 ml-auto">
          <RefreshIcon className="h-8 text-white" onClick={() => handleRefresh()} />
        </div>
      </div>

      <Input />
      <div className="pb-72 transition-all flex flex-col space-y-5 mt-5">{searchedPosts.length > 0 ? searchedPosts.map((post) => <Post key={post.$id} id={post.$id} post={post} />) : posts.map((post) => <Post key={post.$id} id={post.$id} post={post} />)}</div>
    </div>
  );
}

export default Feed;
