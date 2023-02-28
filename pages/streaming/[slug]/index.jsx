import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";
import VideoPlayer from "../../../components/streaming/VideoPlayer";
import EpisodeList from "../../../components/streaming/EpisodeList";
import EpisodeItem from "../../../components/streaming/EpisodeItem";
import TitleEpisodeList from "../../../components/streaming/TitleEpisodeList";

export const getServerSideProps = async (context) => {
  const { slug } = context.params;
  const response = await fetch(`http://localhost:5000/api/v1/episodes/${slug}`);
  const resultJson = await response.json();
  const resultEpisodes = resultJson.data.episodes;
  if (resultJson.status === "error" || resultJson.status === "fail") {
    return {
      notFound: true,
    };
  }
  const responseReqPlayer = await fetch(`https://addon.deyapro.com/api/player`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "sec-ch-ua": `${context.req.headers["sec-ch-ua"]}`,
      "user-agent": `${context.req.headers["user-agent"]}`,
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
      episodes: resultEpisodes,
      player: resultJsonPlayer.data,
    },
  };
};

const Streaming = ({
  animes,
  slug,
  episodes,
  player,
}) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [seeMore, setSeeMore] = useState("");
  const textReadmore = useRef();

  const titleEpisode = (fullText) => {
    const [, episode] = fullText.split("-episode-");
    return parseFloat(episode);
  };

  const slugGenerator = (genSlug, genType, genEpisode) => {
    const episode = `${genEpisode.length >= 2 ? genEpisode : `0${genEpisode}`}`;
    if (genType === "Series") {
      return `${slug}-episode-${episode}`;
    }
    return genSlug;
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
        <title>{`${animes.title} Episode ${titleEpisode(slug)}`}</title>
      </Head>
      <nav className="navbar bg-lighter showmore-nav shadow-sm sticky-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <Link href="/" className="showmore-back d-flex rounded p-1 text-decoration-none">
                <i className="bi bi-arrow-left showmore-back">{" "}</i>
                <p className="showmore-title fw-bold ms-3">Streaming</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container streaming-container mt-2">
        <Row className="g-0 justify-content-between mb-4">
          <Col xs={12} lg={9}>
            <div className="video-wrapper">
              { hasWindow && <VideoPlayer srcVideo={player} autoPlay /> }
            </div>
          </Col>
          <Col xs={12} lg={3} className="g-0">
            <TitleEpisodeList text="Daftar Episode" />
            <EpisodeList>
              {episodes.map((episode, idx) => (
                <EpisodeItem
                  number={idx + 1}
                  label={episode.numEpisode === 0 ? "OVA" : "Episode"}
                  labelNumber={episode.numEpisode}
                  isActive={titleEpisode(slug) === episode.numEpisode ? 1 : 0}
                  fullSlug={slugGenerator(slug, animes.type, episode.numEpisode)}
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
