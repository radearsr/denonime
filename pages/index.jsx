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

const index = ({ animes, carousel }) => (
  <>
    <Head>
      <title>Home | DenoNime - Streaming Anime 360p 720p </title>
      <meta property="og:title" content="My page title" key="title" />
    </Head>
    <Layout>
      <Carousel animes={carousel} key="1" />
      <SliderContent title="Lastest" animes={animes} category="series" />
      <SliderContent title="Lastest" animes={animes} category="movie" />
    </Layout>
  </>
);

export default index;
