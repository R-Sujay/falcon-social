import Input from "./Input";
import Post from "./Post";
import { toast } from "react-hot-toast";
import { RefreshIcon } from "@heroicons/react/solid";
import { useRecoilValue } from "recoil";
import { isSearchingState, postState, searchPostState, showEmojisState } from "../atoms/postAtom";
import useGetState from "../hooks/useGetState";
import { itemSelectedAtom } from "../atoms/headerAtom";
import FlipMove from "react-flip-move";

function Feed() {
  const { getRefreshedPosts } = useGetState({ postId: "" });
  const posts = useRecoilValue(postState);
  const searchedPosts = useRecoilValue(searchPostState);
  const isSearching = useRecoilValue(isSearchingState);
  const selected = useRecoilValue(itemSelectedAtom);
  const showEmojis = useRecoilValue(showEmojisState);

  const handleRefresh = () => {
    getRefreshedPosts();
  };

  return (
    <div className={`text-white flex-grow lg:max-w-2xl w-[93%] xs:w-[95%] sm:!w-[83%] sm:ml-24 xl:ml-[21%] xl:mr-[5%] animate-fadeFeedIn mt-20 lg:mt-5 mx-3 sm:mx-0 absolute lg:relative lg:mr-5 transition-all xl:left-[5%] ${selected === 1 && "-left-full lg:left-[50%] xl:left-[48%] left-move"}`}>
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-5 sm:px-10 sticky top-0 z-[100] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-3xl">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div className="hoverAnimation w-12 h-12 flex items-center justify-center xl:px-0 ml-auto">
          <RefreshIcon className="h-8 text-white" onClick={() => handleRefresh()} />
        </div>
      </div>

      <Input />
      <FlipMove className={`pb-72 transition-all flex flex-col space-y-5 mt-5 ${showEmojis && "hidden"}`}>{isSearching ? searchedPosts.map((post) => <Post key={post.$id} id={post.$id} post={post} />) : posts.map((post) => <Post key={post.$id} id={post.$id} post={post} />)}</FlipMove>
    </div>
  );
}

export default Feed;
