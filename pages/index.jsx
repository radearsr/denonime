import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import SliderContent from "../components/SliderContent";

export const getServerSideProps = async () => {
  const dataAnimeSeries = await fetch("https://api.deyapro.com/api/v1/animes?type=series&currentpage=1&pagesize=10");
  const dataAnimeMovie = await fetch("https://api.deyapro.com/api/v1/animes?type=movie&currentpage=1&pagesize=10");
  const dataCarousel = await fetch("https://api.deyapro.com/api/v1/animes?type=movie&currentpage=1&pagesize=10");

  const resultSeries = await dataAnimeSeries.json();
  const resultMovies = await dataAnimeMovie.json();
  const resultCarousel = await dataCarousel.json();

  return {
    props: {
      series: resultSeries.data,
      movies: resultMovies.data,
      carousel: resultCarousel.data,
    },
  };
};

const Home = ({ series, movies, carousel }) => {
  const [navbarClass, setNavbarClass] = useState("bg-transparent");

  const handleNavbar = (e) => {
    const window = e.currentTarget;
    if (window.scrollY > 50) {
      setNavbarClass("bg-orange");
    } else {
      setNavbarClass("bg-transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => handleNavbar(e));
  });

  return (
    <>
      <Head>
        <title>DenoNime - Streaming Anime 360p 480p 720p </title>
        <meta name="description" content="Denonime Adalah Tempat Nonton Streaming Anime Subtitle Indonesia Terlengkap Dan Terupdate Kualitas 360p 480p 720p" />
        <meta name="keywords" content="denonime, denonime.deyapro.com, deyapro, deyapro.com" />
        <meta property="og:title" content="Denon ime" key="title" />
        <meta property="og:url" content="https://denonime.deyapro.com" />
        <meta property="og:site_name" content="DenoNime" />
        <meta property="og:description" content="Denonime Adalah Tempat Nonton Streaming Anime Subtitle Indonesia Terlengkap Dan Terupdate Kualitas 360p 480p 720p" />
      </Head>
      <Layout addonClass={`fixed-top ${navbarClass}`}>
        <Carousel animes={carousel} key="home-1" />
        <SliderContent title="Series" animes={series} category="series" key="home-2" />
        <SliderContent title="Movie" animes={movies} category="movie" key="home-3" />
      </Layout>
    </>
  );
};

export default Home;
