import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Layout from "../../components/shared/Layout";
import SkeletonAnimeComp from "../../components/shared/SkeletonAnimeComp";
import AnimeComp from "../../components/shared/AnimeComp";

export const getServerSideProps = ({ req, query, resolvedUrl }) => ({
  props: {
    liveKeyword: query.query,
    title: "Denonime",
    host: req.headers.host,
    path: resolvedUrl.split("?")[0],
  },
});

const Search = ({
  liveKeyword,
  title,
  host,
  path,
}) => {
  const router = useRouter();
  const { query: keyword = "" } = router.query;
  const [animes, setAnimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [totalLoad, setTotalLoad] = useState(0);
  const loadingElement = useRef(null);

  const callAnime = async (currentPage, querySearch, pageSize) => {
    setIsLoading(true);
    const { data: resultSearch } = await axios.get("https://fuzzy-gold-dolphin.cyclic.app/api/v1/animes/search", {
      params: {
        querySearch,
        currentPage,
        pageSize,
      },
    });
    setAnimes((prev) => [...prev, ...resultSearch.data]);
    setTotalPages(resultSearch.pages.totalPage);
    setIsLoading(false);
    setTotalLoad(0);
  };

  const handleObserver = (entries) => {
    const [entry] = entries;
    if (totalLoad < 1 && entry.isIntersecting) {
      setTotalLoad(1);
      setPageNum((num) => num + 1);
    }
  };

  useEffect(() => {
    callAnime(1, keyword, 100);
  }, [keyword]);

  useEffect(() => {
    if (pageNum !== 1) {
      callAnime(pageNum, keyword, 100);
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
        <title>{`${title} - Search ${keyword}`}</title>
        <meta name="description" content={`Hasil pencarian ${liveKeyword}`} />
        <meta name="keywords" content={`${title.toLowerCase()} ${liveKeyword}`} />
        <meta name="author" content={`${title}`} />
        <meta name="DC.title" content={`${liveKeyword} - ${title}`} />
        <meta property="og:title" content={`${liveKeyword} - ${title}`} />
        <meta property="og:description" content={`Hasil pencarian ${liveKeyword}`} />
        <meta property="og:url" content={`${host}${path}`} />
        <meta property="og:site_name" content={`${title}`} />
        <meta name="geo.placename" content="Indonesia" />
        <meta name="geo.region" content="ID" />
        <link rel="canonical" href={`${host}${path}`} />
      </Head>
      <Layout addonClass="search-nav bg-orange sticky-top mb-3">
        <div className="container-md mt-4 position-relative">
          {!isLoading && animes.length > 1 ? (
            <p className="fs-4 mb-2 fw-bolder color-black">
              Result for keyword
              &lsquo;
              <span className="color-orange">{keyword}</span>
              &rsquo;
            </p>
          ) : ("")}
          <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
            {animes.map((anime) => (
              <div className="col-4 col-md-3 col-lg-3 col-xl-2" key={`search-${anime.animeId}`}>
                <AnimeComp
                  slug={anime.slug}
                  status={anime.status}
                  poster={anime.poster}
                  title={anime.title}
                  totalEps={anime.episodes}
                  type={anime.type}
                />
              </div>
            ))}
            {isLoading ? (Array.from(Array(100)).map((val, idx) => (
              <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2" key={`skeleton-search-${idx.toFixed(2)}`}>
                <SkeletonAnimeComp />
              </div>
            ))) : ("")}
            {!isLoading && animes.length < 1 ? (
              <p className="fs-4 mb-2 text-center fw-bolder color-black">
                anime not found keyword
                &lsquo;
                <span className="color-orange">{keyword}</span>
                &rsquo;
              </p>
            ) : ("")}
          </div>
          {
            pageNum < totalPages ? (
              <div className="text-center" ref={loadingElement} style={{ height: "4rem" }}>
                <Spinner animation="border" style={{ color: "var(--orange)" }} />
              </div>
            ) : ("")
          }
        </div>
      </Layout>
    </>
  );
};

export default Search;
