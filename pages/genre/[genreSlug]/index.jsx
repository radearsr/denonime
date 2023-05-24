import { useEffect, useState, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import SkeletonAnimeComp from "../../../components/shared/SkeletonAnimeComp";
import AnimeComp from "../../../components/shared/AnimeComp";
import toCapitalize from "../../../utils";
import NotFoundError from "../../404";

export const getServerSideProps = ({ params }) => ({
  props: {
    genre: params.genreSlug,
  },
});

const ShowMore = ({ genre }) => {
  const [statusCode, setStatusCode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalLoad, setTotalLoad] = useState(0);
  const loadingElement = useRef(null);

  const endpoint = "https://fuzzy-gold-dolphin.cyclic.app";

  const callAnime = async (currentPage, genreParams, pageSize) => {
    try {
      setIsLoading(true);

      const type = "Series";
      const status = "Completed";
      const orderBy = "title";
      const sort = "asc";
      const { data: resultFetch } = await axios.get(`${endpoint}/api/v1/animes/genres/${genreParams}`, {
        params: {
          type,
          status,
          orderBy,
          sort,
          currentPage,
          pageSize,
        },
      });

      setAnimes((prev) => [...prev, ...resultFetch.data]);
      setTotalPages(resultFetch.pages.totalPage);
      setIsLoading(false);
      setTotalLoad(0);
    } catch (error) {
      setStatusCode(error.response.status);
      console.log(error.response.status);
    }
  };

  const handleObserver = (entries) => {
    const [entry] = entries;
    if (totalLoad < 1 && entry.isIntersecting) {
      setTotalLoad(1);
      setPageNum((num) => num + 1);
    }
  };

  useEffect(() => {
    callAnime(1, genre, 36);
  }, []);

  useEffect(() => {
    if (pageNum !== 1) {
      callAnime(pageNum, genre, 36);
    }
    return () => {};
  }, [pageNum]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver);
    const currentTarget = loadingElement.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  });

  return (
    <>
      <Head>
        <title>{`Show More ${toCapitalize(genre)}`}</title>
      </Head>
      { statusCode === 404 ? (<NotFoundError />) : (
        <>
          <nav className="navbar bg-lighter showmore-nav shadow-sm sticky-top">
            <div className="container">
              <div className="row align-items-center">
                <div className="col">
                  <Link href="/" className="showmore-back d-flex rounded p-1">
                    <i className="bi bi-arrow-left showmore-back">{" "}</i>
                    <p className="showmore-title fw-bold ms-3 m-0">{`Anime ${toCapitalize(genre)}`}</p>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <div className="container-md mt-4">
            <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
              {animes.map((anime) => (
                <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2" key={`showmore-${anime.animeId}`}>
                  <AnimeComp
                    slug={anime.slug}
                    status={anime.status}
                    poster={anime.poster}
                    title={anime.title}
                    totalEps={anime.totalEps}
                    type={anime.type}
                  />
                </div>
              ))}
              {isLoading ? (Array.from(Array(36)).map((val, idx) => (
                <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2" key={`skeleton-showmore-${idx.toFixed(2)}`}>
                  <SkeletonAnimeComp />
                </div>
              ))) : ("")}
            </div>
            {
              pageNum < totalPages ? (
                <div className="text-center" ref={loadingElement} style={{ height: "4rem", backgroundColor: "var(--space)" }}>
                  <Spinner animation="border" style={{ color: "var(--orange)" }} />
                </div>
              ) : ("")
            }
          </div>
        </>
      ) }
    </>
  );
};

export default ShowMore;
