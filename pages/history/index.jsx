import Head from "next/head";
import Layout from "../../components/shared/Layout";
import AnimeHistoryComp from "../../components/shared/AnimeHistoryComp";

export async function getServerSideProps() {
  const response = await fetch(`https://fuzzy-gold-dolphin.cyclic.app/api/v1/animes?type=Series&currentPage=2&pageSize=10`);
  const resultJson = await response.json();
  console.log(resultJson);
  return {
    props: {
      animes: resultJson.data,
    },
  };
}

const History = ({ animes }) => (
  <>
    <Head>
      <title>History | DenoNime</title>
    </Head>
    <Layout addonClass="bg-orange sticky-top mb-3">
      <div className="container-lg py-3">
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
