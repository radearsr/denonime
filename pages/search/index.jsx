import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import AnimeCardComp from "../../components/AnimeSearchComp";

export async function getServerSideProps(context) {
  const keyword = context.query.query;
  const response = await fetch(`http://47.254.251.95:5000/api/animes/search?q=${keyword}&page=1&perpage=30`);
  const resultJson = await response.json();

  return {
    props: {
      animes: resultJson.data.animes,
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
      <Layout>
        <div className="container-lg">
          <div className="row justify-content-between">
            {animes.map((anime) => (
              <AnimeCardComp
                key={`anime-search-${anime.id}`}
                poster={anime.poster}
                title={anime.title}
                genres={anime.genre}
                episodes={anime.episode}
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
