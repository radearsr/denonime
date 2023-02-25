import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Carousel from "../components/home/Carousel";
import SliderContent from "../components/home/SliderContent";
import AnimeComp from "../components/SharedComp/AnimeComp";

export const getStaticProps = async () => {
  const dataAnimeOngoing = await fetch("https://api.deyapro.com/api/v1/animes/list/latest?take=12");
  const dataAnimePopuler = await fetch("https://api.deyapro.com/api/v1/animes/list/finished?currentPage=1&pageSize=10");
  const dataCarousel = await fetch("https://api.deyapro.com/api/v1/animes?type=movie&currentPage=1&pageSize=10");
  const dataAnimeSeries = await fetch("https://api.deyapro.com/api/v1/animes?type=series&currentPage=1&pageSize=10");
  const dataAnimeMovie = await fetch("https://api.deyapro.com/api/v1/animes?type=movie&currentPage=1&pageSize=10");

  const resultCarousel = await dataCarousel.json();
  const resultSeries = await dataAnimeSeries.json();
  const resultMovies = await dataAnimeMovie.json();
  const resultOngoing = await dataAnimeOngoing.json();
  const resultPopuler = await dataAnimePopuler.json();

  return {
    props: {
      carousel: resultCarousel.data,
      series: resultSeries.data,
      movies: resultMovies.data,
      ongoing: resultOngoing.data,
      populer: resultPopuler.data,
    },
    revalidate: 60 * 60 * 24,
  };
};

const Home = ({
  ongoing,
  populer,
  series,
  movies,
  carousel,
}) => {
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
        <meta name="description" content="Denonime adalah aplikasi website yang ditujukan untuk para pecinta anime. Kami menyediakan konten dari berbagai sumber. Untuk saat ini kami hanya mengambil dari dua sumber yaitu otakudesu dan animeindo, dengan cara menscraping website tersebut, lalu diolah agar video dapat diputar diwebsite kami, dan juga dengan cara mendownload ulang koten yang mereka sediakan lalu upload ulang ke server kami. Perlu diketahui bahwa kami tidak ada hubungan kerja sama antara situs penyedia konten tersebut." />
        <meta name="keywords" content="denonime, denonime.deyapro.com, deyapro, deyapro.com, radearsr, streaming anime, nonton anime" />
        <meta property="og:title" content="Denonime" key="title" />
        <meta property="og:url" content="https://denonime.deyapro.com" />
        <meta property="og:site_name" content="DenoNime" />
        <meta property="og:description" content="Denonime adalah aplikasi website yang ditujukan untuk para pecinta anime. Kami menyediakan konten dari berbagai sumber. Untuk saat ini kami hanya mengambil dari dua sumber yaitu otakudesu dan animeindo, dengan cara menscraping website tersebut, lalu diolah agar video dapat diputar diwebsite kami, dan juga dengan cara mendownload ulang koten yang mereka sediakan lalu upload ulang ke server kami. Perlu diketahui bahwa kami tidak ada hubungan kerja sama antara situs penyedia konten tersebut." />
      </Head>
      <Layout addonClass={`fixed-top ${navbarClass}`}>
        <Carousel animes={carousel} key="home-1" />
        <div className="container-md mt-4">
          <header className="d-flex justify-content-between align-items-center">
            <h2 className="fs-2 fw-bold mb-3">Ongoing</h2>
          </header>
          <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
            {ongoing.map((anime) => (
              <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2" key={`${anime.id}`}>
                <AnimeComp
                  linkEps={anime.title}
                  poster={anime.poster}
                  title={anime.title}
                  type={anime.type}
                  totalEps={anime.totalEps}
                  slug={anime.slug}
                />
              </div>
            ))}
          </div>
        </div>
        <SliderContent title="Completed" animes={populer} category="series" key="home-2" />
        <SliderContent title="Series" animes={series} category="series" key="home-2" />
        <SliderContent title="Movie" animes={movies} category="movie" key="home-3" />
      </Layout>
    </>
  );
};

export default Home;
