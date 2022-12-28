import Head from "next/head";
import Layout from "../../components/Layout";
import AnimeHistoryComp from "../../components/AnimeHistoryComp";

export async function getServerSideProps() {
  const response = await fetch(`http://47.254.251.95:5000/api/animes/search?q=a&page=1&perpage=30`);
  const resultJson = await response.json();

  return {
    props: {
      animes: resultJson.data.animes,
    },
  };
}

const History = ({ animes }) => (
  <>
    <Head>
      <title>History | DenoNime</title>
    </Head>
    <Layout addonClass="bg-orange sticky-top mb-3">
      <div className="container-lg">
        <div className="row justify-content-between">
          {animes.map((anime) => (
            <AnimeHistoryComp
              poster={anime.poster}
              title={anime.title}
              lengthData={animes.length}
            />
          ))}
        </div>
      </div>
    </Layout>
  </>
);

export default History;
