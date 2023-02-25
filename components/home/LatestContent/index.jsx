import AnimeComp from "../../SharedComp/AnimeComp";

const LatestContent = ({ animes }) => (
  <div className="container-md mt-4">
    <header className="d-flex justify-content-between align-items-center">
      <h2 className="fs-2 fw-bold mb-3">Ongoing</h2>
    </header>
    <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
      {animes.map((anime) => (
        <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2" key={`${anime.id}`}>
          <AnimeComp
            linkEps={anime.title}
            poster={anime.poster}
            title={anime.title}
            type={anime.type}
            totalEps={anime.totalEps}
            slug={anime.slug}
          />
        </div>
      ))}
    </div>
  </div>
);

export default LatestContent;
