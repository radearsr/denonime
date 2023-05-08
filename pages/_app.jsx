import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import Script from "next/script";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min");
  });
  const isProduction = process.env.NODE_ENV === "production" ? true : false;  
  return (
    <>
      {
        isProduction ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', ${process.env.GOOGLE_ANALYTICS});
              `}
            </Script>
          </>
        ) : ("")
      }
      <NextNProgress
        color="#FFFFFF"
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
