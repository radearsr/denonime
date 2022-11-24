import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/swiper-bundle.min.css";
import "../styles/globals.css";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min");
  });
  return (<Component {...pageProps} />);
};

export default MyApp;
