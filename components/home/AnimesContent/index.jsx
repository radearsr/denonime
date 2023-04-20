import Link from "next/link";
import AnimeComp from "../../shared/AnimeComp";

const AnimesContent = ({ animes, labelTitle = "Ongoing", isShowMore = false }) => (
  <div className="container-md mt-4">
    <header className="d-flex justify-content-between align-items-center">
      <h2 className="fs-2 fw-bold mb-3">{labelTitle}</h2>
      { isShowMore ? <Link href={`/showmore/${labelTitle}`} className="fs-6 text-dark text-decoration-none">Lebih Banyak</Link> : "" }
    </header>
    <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
      {animes.map((anime) => (
        <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2" key={`${anime.animeId}`}>
          <AnimeComp
            linkEps={anime.title}
            poster={anime.poster}
            title={anime.title}
            type={anime.type}
            totalEps={anime.totalEps}
            slug={anime.slug}
            status={anime.status}
          />
        </div>
      ))}
    </div>
  </div>
);

export default AnimesContent;
