import Head from "next/head";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { motion } from "framer-motion";
import { itemSelectedAtom } from "../atoms/headerAtom";
import HeaderItem from "../components/HeaderItem";
import { items } from "../constants/headerItems";
import { useRouter } from "next/router";

export default function Home({ jokes }) {
  const router = useRouter();
  const { registered } = router.query;
  const { data: session } = useSession();
  const isOpen = useRecoilValue(modalState);
  const { getPosts } = useGetState({ postId: "" });
  const [selected, setSelected] = useRecoilState(itemSelectedAtom);
  const [isProfileModalOpen, setModal] = useRecoilState(profileModalState);

  useEffect(() => {
    if (session) {
      getPosts();
    }
  }, []);

  setInterval(() => {
    if (session) {
      getPosts();
    }
  }, 60000);

  if (session === null) return <Login registered={registered === "true" && true} />;

  return (
    <div className="relative overflow-x-hidden max-w-screen">
      <HomeBg />

      <Head>
        <title>Falcon Social</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Toaster />

      <main className="min-h-screen flex max-w-[1500px] mx-auto md:px-5 sm:p-0">
        <Sidebar />
        <div className="lg:hidden h-14 ml-3 sm:mx-auto sm:ml-auto mt-5">
          <div className="w-[90vw] sm:w-min relative xs:mx-auto flex justify-between items-center">
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
            <div className="mt-auto sm:hidden w-10 ml-auto" onClick={() => setModal(true)}>
              <img src={session.user.image} alt="" className="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
        <Feed />
        <Widgets joke={jokes} />

        {isOpen && <Modal />}
        {isProfileModalOpen && <ProfileModal />}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const fetchJokes = await fetch("https://official-joke-api.appspot.com/jokes/ten").then((res) => res.json());
  const jokes = fetchJokes.splice(0, 3);

  return {
    props: {
      jokes,
    },
  };
}
