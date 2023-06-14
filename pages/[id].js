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
import HomeBg from "../components/HomeBg";
import FlipMove from "react-flip-move";

function PostPage({ jokes, followResults }) {
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
    <div className="relative overflow-x-hidden max-w-screen">
      <HomeBg />

      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen flex max-w-[1500px] mx-auto md:px-5 sm:p-0">
        <Sidebar />
        <div className="flex-grow max-w-2xl sm:!ml-[110px] sm:mr-0 xl:!ml-[25%] xs:mx-5 mx-3 lg:!ml-23">
          <div className="flex items-center py-3 sticky top-0 z-50 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 rounded-3xl my-5 px-4 gap-x-4 font-semibold text-xl text-[#d9d9d9]">
            <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0" onClick={() => router.push("/")}>
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Post
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <FlipMove className="pb-72 transition-all space-y-4 mt-5">
              {postComments?.map((comment) => (
                <Comment key={comment.$id} id={comment.$id} comment={comment} />
              ))}
            </FlipMove>
          )}
        </div>

        <Widgets joke={jokes} followResults={followResults} />

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;

export async function getServerSideProps(context) {
  const fetchJokes = await fetch("https://official-joke-api.appspot.com/jokes/ten").then((res) => res.json());
  const jokes = fetchJokes.splice(0, 3);
  const followResults = [
    { userImg: "https://rb.gy/urakiy", username: "SpaceX", tag: "@SpaceX" },
    { userImg: "https://rb.gy/aluxgh", username: "Elon Musk", tag: "@elonmusk" },
    { userImg: "https://rb.gy/zyvazm", username: "Tesla", tag: "@Tesla" },
  ];

  return {
    props: {
      jokes,
      followResults,
    },
  };
}
