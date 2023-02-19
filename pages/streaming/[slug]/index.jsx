import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";
import EpisodeList from "../../../components/streaming/EpisodeList";
import EpisodeItem from "../../../components/streaming/EpisodeItem";
import TitleEpisodeList from "../../../components/streaming/TitleEpisodeList";

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  const response = await fetch(`https://api.deyapro.com/api/v1/episodes/${slug}`);
  const resultJson = await response.json();
  if (resultJson.status === "error" || resultJson.status === "fail") {
    return {
      notFound: true,
    };
  }
  const responseReqPlayer = await fetch(`https://addon.deyapro.com/api/player`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      link: resultJson.data.episodes[0].source360p,
      strategy: "otakudesu",
    }),
  });
  const resultJsonPlayer = await responseReqPlayer.json();
  return {
    props: {
      animes: resultJson.data,
      slug,
      player: resultJsonPlayer.data,
    },
  };
};

const Streaming = ({ animes, slug, player }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [seeMore, setSeeMore] = useState("");
  const textReadmore = useRef();

  const titleEpisode = (fullText) => {
    const [, episode] = fullText.split("-episode-");
    return parseFloat(episode);
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
              <Link href="/" className="showmore-back d-flex rounded p-1 text-decoration-none">
                <i className="bi bi-arrow-left showmore-back">{" "}</i>
                <p className="showmore-title fw-bold ms-3">{animes.title}</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container streaming-container">
        <Row className="g-0 justify-content-between mb-4">
          <Col xs={12} lg={9}>
            <div className="video-wrapper">
              { hasWindow && <ReactPlayer width="100%" height="100%" url={player} controls /> }
            </div>
          </Col>
          <Col xs={12} lg={3} className="g-0">
            <TitleEpisodeList text="Daftar Episode" />
            <EpisodeList>
              {Array.from(Array(10)).map((arr, idx) => (
                <EpisodeItem
                  number={idx + 1}
                  label={idx % 2 === 0 ? "Episode" : "OVA"}
                  labelNumber={idx + 1}
                  isActive={titleEpisode(slug) === idx + 1 ? 1 : 0}
                  fullSlug="episode-01"
                />
              ))}
            </EpisodeList>
          </Col>
        </Row>
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
