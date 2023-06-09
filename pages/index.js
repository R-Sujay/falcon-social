import Head from "next/head";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import useSession from "../lib/useSession";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { postState, refreshState } from "../atoms/PostAtom";
import useGetState from "../hooks/useGetState";

export default function Home({ trendingResults, followResults }) {
  const isOpen = useRecoilValue(modalState);
  const { data: session } = useSession();
  const { getPosts, getComments, getLikes } = useGetState({ postId: "" });
  const [refresh, setRefresh] = useRecoilState(refreshState);

  if (!session) return <Login />;

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    getComments();
    getLikes();
  }, [refresh]);

  setInterval(() => {
    getPosts();
  }, 60000);

  return (
    <div className="bg-black">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className=" in-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets trendingResults={trendingResults} followResults={followResults} />

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const trendingResults = [
    { heading: "T20 World Cup 2021 · LIVE", description: "NZvAUS: New Zealand and Australia clash in the T20 World Cup final", img: "https://i.imgur.com/IQeDZaV.jpg", tags: ["#T20WorldCupFinal, ", "Kane Williamson"] },
    { heading: "Trending in United Arab Emirates", description: "#earthquake", img: "https://i.imgur.com/eEu1sjA.jpg", tags: ["#DubaiAirshow, ", "#gessdubai"] },
    { heading: "Trending in Digital Creators", description: "tubbo and quackity", img: "", tags: ["QUACKITY AND TUBBO,"] },
  ];
  const followResults = [
    { userImg: "https://i.imgur.com/muzGndB.jpg", username: "SpaceX", tag: "@SpaceX" },
    { userImg: "https://i.imgur.com/K8NGDtZ.jpg", username: "Elon Musk", tag: "@elonmusk" },
    { userImg: "https://i.imgur.com/XSpr1pu.png", username: "Tesla", tag: "@Tesla" },
  ];

  return {
    props: {
      trendingResults,
      followResults,
    },
  };
}
