import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import SliderContent from "../components/SliderContent";

const index = () => {
  const [animesCarousel, setAnimesCarousel] = useState([]);
  const [animesLastest, setAnimesLastest] = useState([]);
  const [animeMovie, setAnimeMovie] = useState([]);
  const [animeSeries, setAnimeSeries] = useState([]);

  useEffect(() => {
    fetch("http://47.254.251.95:5000/api/animes?type=series&limit=10")
      .then((response) => response.json())
      .then((result) => setAnimeSeries(result.data.animes));
  }, []);
  useEffect(() => {
    fetch("http://47.254.251.95:5000/api/animes?type=movie&limit=10")
      .then((response) => response.json())
      .then((result) => setAnimeMovie(result.data.animes));
  }, []);
  useEffect(() => {
    fetch("http://47.254.251.95:5000/api/animes?type=series&limit=10")
      .then((response) => response.json())
      .then((result) => setAnimesLastest(result.data.animes));
  }, []);
  useEffect(() => {
    fetch("http://47.254.251.95:5000/api/animes/5/carousel")
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAnimesCarousel(result.data.animes);
      });
  }, []);

  return (
    <Layout>
      <Carousel animes={animesCarousel} />
      <SliderContent title="Terbaru" animes={animesLastest} key="lastest" />
      <SliderContent title="Movie" animes={animeMovie} key="movie" />
      <SliderContent title="Series" animes={animeSeries} key="series" />
    </Layout>
  );
};

export default index;
