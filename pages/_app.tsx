import "../styles/globals.css";
import type { AppProps } from "next/app";
import NProgress from "nprogress";
import { DefaultSeo } from "next-seo";
import Router from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { NavHeader } from "components/layout/nav";

const DEFAULT_SEO = {
  title: "Sample Page",
  description: "",
  openGraph: {
    type: "website",
    locale: "ko",
    title: "sample page",
    description: "sample",
    site_name: "sample page",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on("routeChangeComplete", () => {
      NProgress.start();
    });
    Router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
    Router.events.on("routeChangeError", () => {
      NProgress.done();
    });
  }, []);
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO} />
      <ChakraProvider>
        <NavHeader />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
