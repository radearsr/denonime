import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import SliderContent from "../components/SliderContent";

export async function getServerSideProps() {
  const res = await fetch("http://47.254.251.95:5000/api/animes?type=series&limit=10");
  const resCarousel = await fetch("http://47.254.251.95/api/animes/5/carousel");
  const result = await res.json();
  const resultCarousel = await resCarousel.json();
  return {
    props: {
      animes: result.data.animes,
      carousel: resultCarousel.data.animes,
    },
  };
}

const Home = ({ animes, carousel }) => {
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
        <title>Home | DenoNime - Streaming Anime 360p 720p </title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Layout addonClass={`fixed-top ${navbarClass}`}>
        <Carousel animes={carousel} key="home-1" />
        <SliderContent title="Series" animes={animes} category="series" key="home-2" />
        <SliderContent title="Movie" animes={animes} category="movie" key="home-3" />
      </Layout>
    </>
  );
};

export default Home;
