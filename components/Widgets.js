import { SearchIcon } from "@heroicons/react/outline";
import Joke from "./Joke";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { postState, searchPostState } from "../atoms/PostAtom";
import { BeatLoader } from "react-spinners";

function Widgets({ joke, followResults }) {
  const [searchValue, setSearchValue] = useState("");
  const [searchedPosts, setSearchedPosts] = useRecoilState(searchPostState);
  const posts = useRecoilValue(postState);
  const [jokes, setJokes] = useState(joke);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchValue.length === 0) {
      setSearchedPosts([]);
      return;
    }

    const searchResults = posts.filter((post) => post.text?.toString().toLowerCase().startsWith(searchValue.toLowerCase()));
    setSearchedPosts(searchResults);
  }, [searchValue]);

  const fetchMoreJokes = async () => {
    setLoading(true);
    const fetchJokes = await fetch("https://official-joke-api.appspot.com/jokes/ten").then((res) => res.json());
    const joke = fetchJokes.splice(0, 3);
    setJokes(joke);
    setLoading(false);
  };

  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] py-1 space-y-5 animate-widthShrink z-[100]">
      <div className="sticky top-0 py-1.5 z-50 w-11/12 xl:w-9/12 mt-5">
        <div className="flex items-center p-3 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-500 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full rounded-full
           focus:shadow-lg"
            placeholder="Search Twitter"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="text-[#d9d9d9] space-y-3 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-3xl pt-2l w-11/12 xl:w-9/12 xl:max-w-[91.666667%] max-h-min">
        <h4 className="font-bold text-xl px-4">Daily Jokes</h4>
        {loading ? (
          <div className="min-h-[320px] flex justify-center items-center">
            <BeatLoader color="#fff" size={25} aria-label="Loading Spinner" data-testid="loader" />
          </div>
        ) : (
          <>
            {jokes.map((result, index) => (
              <Joke key={index} result={result} />
            ))}
            <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light" onClick={fetchMoreJokes}>
              Show more
            </button>
          </>
        )}
      </div>

      <div className="text-[#d9d9d9] space-y-3 bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 rounded-3xl pt-2 w-11/12 xl:w-9/12 max-w-[91.666667%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {followResults.map((result, index) => (
          <div className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center" key={index}>
            <Image src={result.userImg} width={50} height={50} objectFit="cover" className="rounded-full" />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">{result.username}</h4>
              <h5 className="text-gray-500 text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">Follow</button>
          </div>
        ))}
        <button className="hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">Show more</button>
      </div>
    </div>
  );
}

export default Widgets;
