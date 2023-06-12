import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Comment from "../components/comment";
import useSession from "../lib/useSession";
import Widgets from "../components/Widgets";
import useGetState from "../hooks/useGetState";
import { commentState, postState } from "../atoms/PostAtom";
import Modal from "../components/Modal";

function PostPage({ trendingResults, followResults }) {
  const { data: session } = useSession();
  if (!session) return <Login />;

  const isOpen = useRecoilValue(modalState);
  const router = useRouter();
  const { id } = router.query;

  const { getPosts } = useGetState({ postId: "" });
  const posts = useRecoilValue(postState);
  const post = posts.find((post) => post.$id === id);

  const comments = useRecoilValue(commentState);
  const postFoundComments = comments.find((comment) => comment.id === id);
  const postComments = postFoundComments?.doc;

  useEffect(() => {
    getPosts();
  }, []);

  setInterval(() => {
    getPosts();
  }, 60000);

  return (
    <div className="bg-black ">
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          <div className="flex items-center px-1.5 py-2 border-b border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" onClick={() => router.push("/")}>
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>

          <Post id={id} post={post} postPage />

          {comments.length > 0 && (
            <div className="pb-72">
              {postComments?.map((comment) => (
                <Comment key={comment.$id} id={comment.$id} comment={comment} />
              ))}
            </div>
          )}
        </div>
        <Widgets trendingResults={trendingResults} followResults={followResults} />

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;

export async function getServerSideProps(context) {
  const trendingResults = [
    { heading: "T20 World Cup 2021 · LIVE", description: "NZvAUS: New Zealand and Australia clash in the T20 World Cup final", img: "https://rb.gy/d9yjtu", tags: ["#T20WorldCupFinal, ", "Kane Williamson"] },
    { heading: "Trending in United Arab Emirates", description: "#earthquake", img: "https://rb.gy/jvuy4v", tags: ["#DubaiAirshow, ", "#gessdubai"] },
    { heading: "Trending in Digital Creators", description: "tubbo and quackity", img: "", tags: ["QUACKITY AND TUBBO,"] },
  ];
  const followResults = [
    { userImg: "https://rb.gy/urakiy", username: "SpaceX", tag: "@SpaceX" },
    { userImg: "https://rb.gy/aluxgh", username: "Elon Musk", tag: "@elonmusk" },
    { userImg: "https://rb.gy/zyvazm", username: "Tesla", tag: "@Tesla" },
  ];

  return {
    props: {
      trendingResults,
      followResults,
    },
  };
}
