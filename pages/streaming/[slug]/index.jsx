import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import ReactPlayer from "react-player";
import EpisodeList from "../../../components/streaming/EpisodeList";
import EpisodeItem from "../../../components/streaming/EpisodeItem";
import TitleEpisodeList from "../../../components/streaming/TitleEpisodeList";

const endpoint = process.env.NODE_ENV === "development" ? process.env.API_DEV : process.env.API_PROD;

export const getServerSideProps = async (context) => {
  try {
    let { slug } = context.params;
    let currentNumEpisode;

    if (slug.includes("-episode-")) {
      [slug, currentNumEpisode] = slug.split("-episode-");
    }

    const {
      data: {
        data: details,
      },
    } = await axios.get(`${endpoint}/api/v2/animes/details/${slug}`);
    console.log(details);

    if (!currentNumEpisode) {
      return ({
        props: {
          details,
          currentNumEpisode: 1,
        },
      });
    }
    return {
      props: {
        details,
        currentNumEpisode: parseInt(currentNumEpisode),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const Streaming = ({ details, currentNumEpisode }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [seeMore, setSeeMore] = useState("");

  const [episodes, setEpisodes] = useState([]);
  const [sources, setSources] = useState([]);
  const [player, setPlayer] = useState("");

  const textReadmore = useRef();

  const handleReadMore = () => {
    if (textReadmore.current.textContent === "Baca selengkapnya") {
      setSeeMore("more");
      textReadmore.current.textContent = "Baca lebih sedikit";
    } else {
      setSeeMore("");
      textReadmore.current.textContent = "Baca selengkapnya";
    }
  };

  const getEpisodeHandler = async (animeId) => {
    const {
      data: {
        data: episodeLists,
      },
    } = await axios.get(`${endpoint}/api/v2/episodes/anime/${animeId}`);
    setEpisodes(episodeLists);
  };

  const getEpisodeSourceHandler = async (episodeId) => {
    const {
      data: {
        data: episodeSource,
      },
    } = await axios.get(`${endpoint}/api/v2/episodes/sources/details/${episodeId}`);
    setSources(episodeSource);
  };

  const getSourceVideoPlayerHandler = async (link, strategy) => {
    try {
      const { data: playersData } = await axios.post(`http://localhost:4000/api/player`, {
        link,
        strategy,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      if (!playersData.data) {
        console.log("PLAYER_ERROR_AFTER_REQ");
      }
      setPlayer(playersData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const playerErrorHandling = () => {
    console.log("PLAYER_ERROR_ONERROR");
  }

  useEffect(() => {
    getEpisodeHandler(details.id);
  }, [details]);

  useEffect(() => {
    if (episodes.length > 0) {
      const currentEpisode = episodes.find((episode) => (
        episode.number_episode === parseInt(currentNumEpisode)
      ));
      getEpisodeSourceHandler(currentEpisode.id);
    }
  }, [episodes, currentNumEpisode]);

  useEffect(() => {
    if (sources.length > 0) {
      console.log(sources);
      getSourceVideoPlayerHandler(sources[0].url_source, sources[0].scraping_strategy);
    }
  }, [sources]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    return () => {
      setHasWindow(true);
    };
  });

  return (
    <>
      <Head>
        <title>{`${details.title} Episode ${currentNumEpisode}`}</title>
      </Head>
      <nav className="navbar bg-lighter showmore-nav shadow-sm sticky-top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <Link href="/" className="showmore-back d-flex rounded p-1 text-decoration-none">
                <i className="bi bi-arrow-left showmore-back">{" "}</i>
                <p className="showmore-title m-0 fw-bold ms-3">Streaming</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container streaming-container mt-2">
        <Row className="g-2 justify-content-between mb-1 overflow-hidden">
          <Col xs={12} lg={9}>
            <div className="video-wrapper">
              { hasWindow && <ReactPlayer url={player} onError={playerErrorHandling} width="100%" height="100%" controls />}
            </div>
          </Col>
          <Col xs={12} lg={3} className="g-2">
            <TitleEpisodeList text="Daftar Episode" />
            <EpisodeList>
              {episodes.map((episode, idx) => (
                <EpisodeItem
                  number={idx + 1}
                  label={episode.episode_type}
                  labelNumber={episode.number_episode}
                  isActive={currentNumEpisode === episode.number_episode ? 1 : 0}
                  fullSlug={episode.episode_slug}
                  key={episode.id}
                />
              ))}
            </EpisodeList>
          </Col>
        </Row>
        <Container className="py-2">
          <h2 className="fw-bold fs-4 mb-1">{details.title}</h2>
          <h3 className="fw-ligter fs-5 mb-1">{details.anime_type === "SERIES" ? `Episode ${currentNumEpisode}` : "Movie"}</h3>
          <Row>
            <Col xs={12} lg={10} xl={8}>
              <p className={`text-sinopsis fs-6 ${seeMore}`}>{details.synopsis}</p>
              <button className="toggle-text fw-bold" onClick={handleReadMore} ref={textReadmore}>Baca selengkapnya</button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Streaming;
