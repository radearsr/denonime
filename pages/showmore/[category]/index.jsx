import Head from "next/head";
import Link from "next/link";
import AnimeComp from "../../../components/AnimeComp";

export async function getServerSideProps(context) {
  const type = context.params.category;
  const response = await fetch(`http://47.254.251.95:5000/api/animes?type=${type}&limit=20`);
  const resultJson = await response.json();

  return {
    props: {
      animes: resultJson.data.animes,
    },
  };
}

const ShowMore = ({ animes }) => (
  <>
    <Head>
      <title>Show More</title>
    </Head>
    <nav className="navbar bg-lighter showmore-nav shadow-sm fixed-top">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-2">
            <Link href="/">
              <i className="bi bi-arrow-left showmore-back">{" "}</i>
            </Link>
          </div>
          <div className="col ms-4">
            <p className="showmore-title fw-bold">Anime Lastest</p>
          </div>
        </div>
      </div>
    </nav>
    <div className="container-md pt-5 mt-4">
      <div className="row justify-content-start">
        {animes.map((anime) => (
          <div className="showmore col-3 col-sm-3 col-md-3 col-lg-2 col-xl-1 mb-4">
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
