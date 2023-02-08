import Head from "next/head";
import Link from "next/link";
import AnimeComp from "../../../components/AnimeComp";

export async function getServerSideProps(context) {
  const type = context.params.category;
  const response = await fetch(`https://api.deyapro.com/api/v1/animes?type=${type}&currentpage=1&pagesize=54`);
  const resultJson = await response.json();

  return {
    props: {
      animes: resultJson.data,
    },
  };
}

const ShowMore = ({ animes }) => (
  <>
    <Head>
      <title>Show More</title>
    </Head>
    <nav className="navbar bg-lighter showmore-nav shadow-sm sticky-top">
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <Link href="/" className="showmore-back d-flex rounded p-1">
              <i className="bi bi-arrow-left showmore-back">{" "}</i>
              <p className="showmore-title fw-bold ms-3">Anime Lastest</p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
    <div className="container-md mt-4">
      <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
        {animes.map((anime) => (
          <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2">
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
  </>
);

export default ShowMore;
