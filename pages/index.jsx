import axios from "axios";
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/shared/Layout";
import Carousel from "../components/home/Carousel";
import SkeletonAnimeContent from "../components/home/SkeletonAnimeContent";
import AnimesContent from "../components/home/AnimesContent";
import AnimeGenres from "../components/home/AnimeGenres";

export const getStaticProps = async () => {
  try {
    const endpoint = "https://denonime-api.vercel.app";
    // const endpoint = "http://localhost:5000";
    const { data: animeCarousel } = await axios.get(`${endpoint}/api/v1/animes`, {
      params: {
        type: "Movie",
        status: "Completed",
        orderBy: "title",
        sort: "asc",
        currentPage: 1,
        pageSize: 10,
      },
    });
    const { data: animeGenres } = await axios.get(`${endpoint}/api/v1/animes/list/genres`);
    return {
      props: {
        endpoint,
        genres: animeGenres.data,
        carousel: animeCarousel.data,
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
  carousel,
  genres,
}) => {
  const [navbarClass, setNavbarClass] = useState("bg-transparent");
  const [isLoadingOngoingList, setIsLoadingOngoingList] = useState(true);
  const [isLoadingCompletedList, setIsLoadingCompletedList] = useState(true);
  const [isLoadingSeriesList, setIsLoadingSeriesList] = useState(true);
  const [isLoadingMoviesList, setIsLoadingMoviesList] = useState(true);
  const [ongoing, setOngoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [series, setSeries] = useState([]);
  const [movie, setMovie] = useState([]);

  const handleNavbar = (e) => {
    const window = e.currentTarget;
    if (window.scrollY > 50) {
      setNavbarClass("bg-orange");
    } else {
      setNavbarClass("bg-transparent");
    }
  };

  const isMobileDevice = () => (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );

  // Function Get All Animes Ongoing
  const getOngoingAnimes = async (currentPage, pageSize) => {
    try {
      const { data: animeOngoing } = await axios.get(`${endpoint}/api/v1/animes`, {
        params: {
          status: "Ongoing",
          type: "Series",
          orderBy: "lastUpdateEpisode",
          sort: "desc",
          currentPage,
          pageSize,
        },
      });
      setOngoing(animeOngoing.data);
      setIsLoadingOngoingList(false);
    } catch (error) {
      console.log("Gagal Menampilakan data anime ongoing");
      setIsLoadingOngoingList(false);
    }
  };

  // Function Get All Animes Completed
  const getLastCompletedAnimes = async (currentPage, pageSize) => {
    try {
      const { data: animePopuler } = await axios.get(`${endpoint}/api/v1/animes`, {
        params: {
          type: "Series",
          status: "Completed",
          orderBy: "releaseDate",
          sort: "desc",
          currentPage,
          pageSize,
        },
      });
      setCompleted(animePopuler.data);
      setIsLoadingCompletedList(false);
    } catch (error) {
      console.log("Gagal Menampilakan data anime completed");
      setIsLoadingCompletedList(false);
    }
  };

  // Function Get All Animes Series
  const getTypesAnimes = async (type, currentPage, pageSize, dataStore, loadingState) => {
    try {
      const { data: animeTypes } = await axios.get(`${endpoint}/api/v1/animes`, {
        params: {
          type,
          status: "Completed",
          orderBy: "title",
          sort: "asc",
          currentPage,
          pageSize,
        },
      });
      dataStore(animeTypes.data);
      loadingState(false);
    } catch (error) {
      console.log("Gagal Menampilakan data anime series");
      loadingState(false);
    }
  };

  useEffect(() => {
    const countFetchData = isMobileDevice() ? 3 : 6;
    getOngoingAnimes(1, countFetchData * 2);
    getLastCompletedAnimes(1, countFetchData);
    getTypesAnimes("Series", 1, countFetchData, setSeries, setIsLoadingSeriesList);
    getTypesAnimes("Movie", 1, countFetchData, setMovie, setIsLoadingMoviesList);
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
        <AnimeGenres genres={genres} key="home-2" />
        { isLoadingOngoingList ? (<SkeletonAnimeContent count={12} labelTitle="ongoing" />)
          : (<AnimesContent animes={ongoing} labelTitle="Ongoing" key="home-3" />) }
        { isLoadingCompletedList ? (<SkeletonAnimeContent count={6} labelTitle="completed" />)
          : (<AnimesContent animes={completed} labelTitle="Completed" isShowMore key="home-4" />) }
        { isLoadingSeriesList ? (<SkeletonAnimeContent count={6} labelTitle="series" />)
          : (<AnimesContent animes={series} labelTitle="Series" isShowMore key="home-5" />) }
        { isLoadingMoviesList ? (<SkeletonAnimeContent count={6} labelTitle="movie" />)
          : (<AnimesContent animes={movie} labelTitle="Movie" isShowMore key="home-6" />) }
      </Layout>
    </>
  );
};

export default Home;
