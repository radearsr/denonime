import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/Layout";
import AnimeComp from "../../components/AnimeComp";

export async function getServerSideProps(context) {
  const keyword = context.query.query;
  const response = await fetch(`https://api.deyapro.com/api/v1/animes/search?querySearch=${keyword}&currentPage=1&pageSize=100`);
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
        <title>{`Denonime - Search ${query}`}</title>
      </Head>
      <Layout addonClass="bg-orange sticky-top mb-3">
        <div className="container-md mt-4">
          <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
            {animes.map((anime) => (
              <div className="col-4 col-md-3 col-lg-3 col-xl-2">
                <AnimeComp
                  idAnime={anime.id}
                  linkEps={anime.title}
                  poster={anime.poster}
                  title={anime.title}
                  key={anime.id}
                />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default index;
