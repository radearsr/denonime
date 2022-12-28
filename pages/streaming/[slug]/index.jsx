import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";

export async function getServerSideProps() {
  // const { slug } = context.params;
  const response = await fetch("http://47.254.251.95:5000/api/animes/57-1/details");
  const resultJson = await response.json();

  return {
    props: {
      animes: resultJson.data.details,
    },
  };
}

const Streaming = ({ animes }) => {
  const [hasWindow, setHasWindow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  });
  return (
    <>
      <Head>
        <title>{animes.title}</title>
      </Head>
      <nav className="navbar bg-lighter showmore-nav shadow-sm mb-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-2">
              <Link href="/">
                <i className="bi bi-arrow-left showmore-back">{" "}</i>
              </Link>
            </div>
            <div className="col ms-4">
              <p className="showmore-title fw-bold">{animes.title}</p>
            </div>
          </div>
        </div>
      </nav>
      <div className="container streaming-container">
        <div className="row g-0 justify-content-between mb-4">
          <div className="col-12 col-lg-9 g-0">
            <div className="video-wrapper">
              { hasWindow && <ReactPlayer width="100%" height="100%" url={animes.videos[0].gdrive} controls /> }
            </div>
          </div>
          <div className="col-12 col-lg-3 eps-section">
            <h3 className="title-episode-list">Daftar Episode</h3>
            <div className="episode-list">
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
              <Link className="episode-item" href="/">
                <span className="number">1</span>
                <div className="group-label">
                  <p className="label">Episode</p>
                  <span className="label-number">1</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <p>{animes.descriptions}</p>
      </div>
    </>
  );
};

export default Streaming;
