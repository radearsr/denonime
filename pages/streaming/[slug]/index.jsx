import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  const response = await fetch(`https://api.deyapro.com/api/v1/episodes/${slug}`);
  const resultJson = await response.json();
  if (resultJson.status === "error" || resultJson.status === "fail") {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      animes: resultJson.data,
      slug,
    },
  };
};

const Streaming = ({ animes, slug }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [seeMore, setSeeMore] = useState("");
  const textReadmore = useRef();

  const titleEpisode = (fullText) => {
    const [, episode] = fullText.split("-episode-");
    return episode;
  };

  const handleReadMore = () => {
    if (textReadmore.current.textContent === "Baca selengkapnya") {
      setSeeMore("more");
      textReadmore.current.textContent = "Baca lebih sedikit";
    } else {
      setSeeMore("");
      textReadmore.current.textContent = "Baca selengkapnya";
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  });

  return (
    <>
      <Head>
        <title>{`Streaming | ${animes.title} Episode ${titleEpisode(slug)}`}</title>
      </Head>
      <nav className="navbar bg-lighter showmore-nav shadow-sm sticky-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <Link href="/" className="showmore-back d-flex rounded p-1">
                <i className="bi bi-arrow-left showmore-back">{" "}</i>
                <p className="showmore-title fw-bold ms-3">{animes.title}</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container streaming-container">
        <div className="row g-0 justify-content-between mb-4">
          <div className="col-12 col-lg-9 g-0">
            <div className="video-wrapper">
              { hasWindow && <ReactPlayer width="100%" height="100%" url={animes.episodes[0].source360p} controls /> }
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
        <Container className="py-4">
          <h3 className="fw-bold title-sinopsis mb-2">Sinopsis</h3>
          <Row>
            <Col xs={12} lg={10} xl={8}>
              <p className={`text-sinopsis ${seeMore}`}>{animes.description}</p>
              <button className="toggle-text fw-bold" onClick={handleReadMore} ref={textReadmore}>Baca selengkapnya</button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Streaming;
