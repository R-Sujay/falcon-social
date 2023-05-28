import { getProviders, getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();

  if (!session) return <Login providers={providers} callback={router.pathname} />;

  return (
    <div>
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
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
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
