import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/shared/Layout";
import Carousel from "../components/home/Carousel";
import SliderContent from "../components/home/SliderContent";
import SkeletonLatestContent from "../components/home/SkeletonLatestContent";
import LatestContent from "../components/home/LatestContent";

export const getStaticProps = async () => {
  try {
    const endpoint = "https://fuzzy-gold-dolphin.cyclic.app";
    const { data: animeCarousel } = await axios.get(`${endpoint}/api/v1/animes`, {
      params: {
        type: "movie",
        currentPage: 1,
        pageSize: 10,
      },
    });

    // console.log(animeCarousel);

    const { data: animePopuler } = await axios.get(`${endpoint}/api/v1/animes/list/finished`, {
      params: {
        currentPage: 1,
        pageSize: 10,
      },
    });

    const { data: animeSeries } = await axios.get(`${endpoint}/api/v1/animes`, {
      params: {
        type: "series",
        currentPage: 1,
        pageSize: 10,
      },
    });

    const { data: animeMovie } = await axios.get(`${endpoint}/api/v1/animes`, {
      params: {
        type: "movie",
        currentPage: 1,
        pageSize: 10,
      },
    });
    return {
      props: {
        endpoint,
        carousel: animeCarousel.data,
        populer: animePopuler.data,
        series: animeSeries.data,
        movies: animeMovie.data,
      },
    };
  } catch (error) {
    console.log(error);
    if (process.env.NODE_ENV === "production") {
      return { notFound: true };
    }
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
};

const Home = ({
  endpoint,
  populer,
  series,
  movies,
  carousel,
}) => {
  const [navbarClass, setNavbarClass] = useState("bg-transparent");
  const [isLoading, setIsLoading] = useState(false);
  const [ongoing, setOngoing] = useState([]);

  const handleNavbar = (e) => {
    const window = e.currentTarget;
    if (window.scrollY > 50) {
      setNavbarClass("bg-orange");
    } else {
      setNavbarClass("bg-transparent");
    }
  };

  const getOngoingAnimes = async () => {
    try {
      const { data: animeOngoing } = await axios.get(`${endpoint}/api/v1/animes/list/latest`, {
        params: {
          size: 12,
        },
      });
      setOngoing(animeOngoing.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Gagal Menampilakan data anime ongoing");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getOngoingAnimes();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", (e) => handleNavbar(e));
  });

  return (
    <>
      <Head>
        <title>DenoNime - Streaming Anime Sub Indonesia</title>
        <meta name="description" content="Denonime adalah aplikasi website yang ditujukan untuk para pecinta anime. Kami menyediakan konten dari berbagai sumber. Untuk saat ini kami hanya mengambil dari dua sumber yaitu otakudesu dan animeindo, dengan cara menscraping website tersebut, lalu diolah agar video dapat diputar diwebsite kami, dan juga dengan cara mendownload ulang koten yang mereka sediakan lalu upload ulang ke server kami. Perlu diketahui bahwa kami tidak ada hubungan kerja sama antara situs penyedia konten tersebut." />
        <meta name="keywords" content="denonime, denonime.deyapro.com, deyapro, deyapro.com, radearsr, streaming anime, nonton anime" />
        <meta property="og:title" content="Denonime" key="title" />
        <meta property="og:url" content="https://denonime.deyapro.com" />
        <meta property="og:site_name" content="DenoNime" />
        <meta property="og:description" content="Denonime adalah aplikasi website yang ditujukan untuk para pecinta anime. Kami menyediakan konten dari berbagai sumber. Untuk saat ini kami hanya mengambil dari dua sumber yaitu otakudesu dan animeindo, dengan cara menscraping website tersebut, lalu diolah agar video dapat diputar diwebsite kami, dan juga dengan cara mendownload ulang koten yang mereka sediakan lalu upload ulang ke server kami. Perlu diketahui bahwa kami tidak ada hubungan kerja sama antara situs penyedia konten tersebut." />
      </Head>
      <Layout addonClass={`fixed-top ${navbarClass}`}>
        <Carousel animes={carousel} key="home-1" />

        { isLoading ? (<SkeletonLatestContent count={12} />)
          : (<LatestContent animes={ongoing} key="home-2" />) }
        <SliderContent title="Completed" animes={populer} category="completed" key="home-3" />
        <SliderContent title="Series" animes={series} category="series" key="home-4" />
        <SliderContent title="Movie" animes={movies} category="movie" key="home-5" />
      </Layout>
    </>
  );
};

export default Home;
