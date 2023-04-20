import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Spinner from "react-bootstrap/Spinner";
import Layout from "../../components/shared/Layout";
import AnimeComp from "../../components/shared/AnimeComp";

export async function getServerSideProps(context) {
  const keyword = context.query.query;
  const response = await fetch(`https://fuzzy-gold-dolphin.cyclic.app/api/v1/animes/search?querySearch=${keyword}&currentPage=1&pageSize=100`);
  const resultJson = await response.json();
  return {
    props: {
      firstAnimes: resultJson.data,
      pages: resultJson.pages,
      keyword,
    },
  };
}

const index = ({ firstAnimes, pages, keyword }) => {
  const [animes, setAnimes] = useState([...firstAnimes]);
  const [isLoading, setIsLoading] = useState(false);
  const totalPages = pages.totalPage;
  const [pageNum, setPageNum] = useState(1);
  const router = useRouter();
  const { query } = router.query;

  const callAnime = async (currentPage, keywordSearch) => {
    const response = await fetch(`https://fuzzy-gold-dolphin.cyclic.app/api/v1/animes/search?querySearch=${keywordSearch}&currentPage=${currentPage}&pageSize=100`);
    const resultJson = await response.json();
    setAnimes((prev) => [...prev, ...resultJson.data]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (pageNum !== 1) {
      callAnime(pageNum, keyword);
    }
    return () => {};
  }, [pageNum]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const totalScrollHeight = window.document.documentElement.scrollHeight;
      const scrollFromTop = window.document.documentElement.scrollTop;
      const height = window.innerHeight;
      const currentScroll = scrollFromTop + height;

      if (currentScroll >= totalScrollHeight) {
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
        <title>{`Denonime - Search ${query}`}</title>
      </Head>
      <Layout addonClass="search-nav bg-orange sticky-top mb-3">
        <div className="container-md mt-4">
          <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
            {animes.map((anime) => (
              <div className="col-4 col-md-3 col-lg-3 col-xl-2" key={`search-${anime.id}`}>
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
            {
              isLoading ? (
                <div className="w-100 text-center h-25">
                  <Spinner animation="border" variant="secondary" />
                </div>
              ) : ("")
            }
          </div>
        </div>
      </Layout>
    </>
  );
};

export default index;
