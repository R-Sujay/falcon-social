// pages/_app.js
import { RecoilRoot } from "recoil";
import "../styles/globals.css";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/dist/client/router";

const progess = new ProgressBar({
  size: 5,
  color: "#1D9BF0",
  classname: "z-[200]",
  delay: 100,
});

Router.events.on("routeChangeStart", progess.start);
Router.events.on("routeChangeComplete", progess.finish);
Router.events.on("routeChangeError", progess.finish);

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
