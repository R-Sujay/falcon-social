import Head from "next/head";
import { useRecoilValue } from "recoil";
import { modalState, profileModalState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import useSession from "../lib/useSession";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import useGetState from "../hooks/useGetState";
import ProfileModal from "../components/ProfileModal";
import HomeBg from "../components/HomeBg";

export default function Home({ jokes, followResults }) {
  const isOpen = useRecoilValue(modalState);
  const isProfileModalOpen = useRecoilValue(profileModalState);
  const { data: session } = useSession();
  const { getPosts } = useGetState({ postId: "" });

  if (!session) return <Login />;

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
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="min-h-screen flex max-w-[1500px] mx-auto md:px-5 sm:p-0">
        <Sidebar />
        <Feed />
        <Widgets joke={jokes} followResults={followResults} />

        {isOpen && <Modal />}
        {isProfileModalOpen && <ProfileModal />}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const fetchJokes = await fetch("https://official-joke-api.appspot.com/jokes/ten").then((res) => res.json());
  const jokes = fetchJokes.splice(0, 3);
  const followResults = [
    { userImg: "https://i.imgur.com/muzGndB.jpg", username: "SpaceX", tag: "@SpaceX" },
    { userImg: "https://i.imgur.com/K8NGDtZ.jpg", username: "Elon Musk", tag: "@elonmusk" },
    { userImg: "https://i.imgur.com/XSpr1pu.png", username: "Tesla", tag: "@Tesla" },
  ];

  return {
    props: {
      jokes,
      followResults,
    },
  };
}
