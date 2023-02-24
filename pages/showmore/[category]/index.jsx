import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Head from "next/head";
import Link from "next/link";
import AnimeComp from "../../../components/SharedComp/AnimeComp";

export async function getServerSideProps(context) {
  const type = context.params.category;
  const response = await fetch(`https://api.deyapro.com/api/v1/animes?type=${type}&currentpage=1&pagesize=36`);
  const resultJson = await response.json();

  return {
    props: {
      firstAnimes: resultJson.data,
      totalPages: resultJson.pages.totalPage,
      type,
    },
  };
}

const ShowMore = ({ firstAnimes, type, totalPages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [animes, setAnimes] = useState([...firstAnimes]);
  const [pageNum, setPageNum] = useState(1);

  const callAnime = async (animeType, currentPage, pageSize) => {
    const response = await fetch(`https://api.deyapro.com/api/v1/animes?type=${animeType}&currentpage=${currentPage}&pagesize=${pageSize}`);
    console.log(pageNum);
    const result = await response.json();
    setAnimes((prev) => ([...prev, ...result.data]));
  };

  useEffect(() => {
    if (pageNum !== 1) {
      callAnime(type, pageNum, 36);
      setIsLoading(false);
    }
    return () => {};
  }, [pageNum]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const totalScrollHeight = window.document.documentElement.scrollHeight;
      const scrollFromTop = window.document.documentElement.scrollTop;
      const height = window.innerHeight;
      const currentScroll = scrollFromTop + height;

      if ((currentScroll >= totalScrollHeight) && (isLoading === false)) {
        console.log("Panggil");
        setIsLoading(true);
        if (pageNum < totalPages) {
          setPageNum((prev) => (prev + 1));
        } else {
          setTimeout(() => {
            setIsLoading(false);
          }, 3000);
          console.log("selesai");
        }
      }
    });
  });

  return (
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
            <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2" key={`${type}-${anime.animeId}`}>
              <AnimeComp
                linkEps={anime.title}
                poster={anime.poster}
                title={anime.title}
                type={anime.type}
                totalEps={anime.episodes}
                slug={anime.slug}
              />
            </div>
          ))}
          {
            isLoading ? (
              <div className="w-100 text-center">
                <Spinner animation="border" variant="secondary" size="md" />
              </div>
            ) : ("")
          }
        </div>
      </div>
    </>
  );
};

export default ShowMore;
