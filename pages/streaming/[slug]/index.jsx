import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
// import ReactPlayer from "react-player";
import VideoPlayer from "../../../components/streaming/VideoPlayer";
import EpisodeList from "../../../components/streaming/EpisodeList";
import EpisodeItem from "../../../components/streaming/EpisodeItem";
import TitleEpisodeList from "../../../components/streaming/TitleEpisodeList";

export const getServerSideProps = async (context) => {
  try {
    const endpoint = process.env.NODE_ENV === "development" ? process.env.API_DEV : process.env.API_PROD;
    const { slug } = context.params;
    const { data: animesWithEpisode } = await axios.get(`${endpoint}/api/v1/episodes/${slug}`);
    const { data: episodes } = await axios.get(`${endpoint}/api/v1/episodes/${animesWithEpisode.data.id}/animes`, {
      params: {
        sortBy: "asc",
      },
    });
    const { data: playersData } = await axios.post(`https://addon.deyapro.com/api/player`, {
      link: animesWithEpisode.data.episodes[0].source360p,
      strategy: "otakudesu",
    }, {
      headers: {
        "Content-Type": "application/json",
        "sec-ch-ua": `${context.req.headers["sec-ch-ua"]}`,
        "user-agent": `${context.req.headers["user-agent"]}`,
      },
    });
    const animes = {
      title: animesWithEpisode.data.title,
      slug: animesWithEpisode.data.slug,
      type: animesWithEpisode.data.type,
      description: animesWithEpisode.data.description,
    };
    return {
      props: {
        animes,
        fullSlug: slug,
        episodes: episodes.data,
        player: playersData.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const Streaming = ({
  animes,
  fullSlug,
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
    const episode = `${genEpisode >= 10 ? genEpisode : `0${genEpisode}`}`;
    if (genType === "Series") {
      // console.log(`${genSlug}-episode-${episode}`);
      return `${genSlug}-episode-${episode}`;
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
        <title>{`${animes.title} Episode ${titleEpisode(fullSlug)}`}</title>
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
        <Row className="g-2 justify-content-between mb-1 overflow-hidden">
          <Col xs={12} lg={9}>
            <div className="video-wrapper">
              { hasWindow && <VideoPlayer srcVideo={player} autoPlay /> }
            </div>
          </Col>
          <Col xs={12} lg={3} className="g-2">
            <TitleEpisodeList text="Daftar Episode" />
            <EpisodeList>
              {episodes.map((episode, idx) => (
                <EpisodeItem
                  number={idx + 1}
                  label={episode.numEpisode === 0 ? "OVA" : "Episode"}
                  labelNumber={episode.numEpisode}
                  isActive={titleEpisode(fullSlug) === episode.numEpisode ? 1 : 0}
                  fullSlug={slugGenerator(animes.slug, animes.type, episode.numEpisode)}
                />
              ))}
            </EpisodeList>
          </Col>
        </Row>
        <Container className="py-2">
          <h2 className="fw-bold fs-4 mb-1">{animes.title}</h2>
          <h3 className="fw-ligter fs-5 mb-1">{animes.type === "Series" ? `Episode ${titleEpisode(fullSlug)}` : "Movie"}</h3>
          <Row>
            <Col xs={12} lg={10} xl={8}>
              <p className={`text-sinopsis fs-6 ${seeMore}`}>{animes.description}</p>
              <button className="toggle-text fw-bold" onClick={handleReadMore} ref={textReadmore}>Baca selengkapnya</button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Streaming;
