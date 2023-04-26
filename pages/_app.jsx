import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min");
  });
  return (
    <>
      <NextNProgress
        color="#FFFFFF"
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
