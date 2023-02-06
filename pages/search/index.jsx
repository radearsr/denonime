import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import AnimeCardComp from "../../components/AnimeSearchComp";

export async function getServerSideProps(context) {
  const keyword = context.query.query;
  const response = await fetch(`https://api.deyapro.com/api/v1/animes/search?querySearch=${keyword}&currentPage=1&pageSize=10`);
  const resultJson = await response.json();
  return {
    props: {
      animes: resultJson.data.data,
    },
  };
}

const index = ({ animes }) => {
  const router = useRouter();
  const { query } = router.query;

  return (
    <>
      <Head>
        <title>{`Search | DenoNime | ${query}`}</title>
      </Head>
      <Layout addonClass="bg-orange sticky-top mb-3">
        <div className="container-lg">
          <div className="row justify-content-between">
            {animes.map((anime) => (
              <AnimeCardComp
                key={`anime-search-${anime.id}`}
                poster={anime.poster}
                title={anime.title}
                genres={anime.anime_genres.join(", ")}
                episodes={anime.episodes}
                lengthData={animes.length}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default index;
