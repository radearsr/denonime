import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/SharedComp/Layout";
import Carousel from "../components/home/Carousel";
import SliderContent from "../components/home/SliderContent";
import SkeletonLatestContent from "../components/home/SkeletonLatestContent";
import LatestContent from "../components/home/LatestContent";

export const getStaticProps = async () => {
  const dataAnimePopuler = await fetch("https://api.deyapro.com/api/v1/animes/list/finished?currentPage=1&pageSize=10");
  const dataCarousel = await fetch("https://api.deyapro.com/api/v1/animes?type=movie&currentPage=1&pageSize=10");
  const dataAnimeSeries = await fetch("https://api.deyapro.com/api/v1/animes?type=series&currentPage=1&pageSize=10");
  const dataAnimeMovie = await fetch("https://api.deyapro.com/api/v1/animes?type=movie&currentPage=1&pageSize=10");

  const resultCarousel = await dataCarousel.json();
  const resultSeries = await dataAnimeSeries.json();
  const resultMovies = await dataAnimeMovie.json();
  const resultPopuler = await dataAnimePopuler.json();

  return {
    props: {
      carousel: resultCarousel.data,
      series: resultSeries.data,
      movies: resultMovies.data,
      populer: resultPopuler.data,
    },
  };
};

const Home = ({
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
    const responseAnimes = await fetch("https://api.deyapro.com/api/v1/animes/list/latest?take=12");
    const resultsJson = await responseAnimes.json();
    setOngoing(resultsJson.data);
    setIsLoading(false);
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
