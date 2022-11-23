import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel";
import SliderContent from "../components/SliderContent";

const index = () => {
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

  return (
    <Layout>
      <Carousel />
      <SliderContent title="Terbaru" animes={animesLastest} />
      <SliderContent title="Movie" animes={animeMovie} />
      <SliderContent title="Series" animes={animeSeries} />
    </Layout>
  );
};

export default index;
