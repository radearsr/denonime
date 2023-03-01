import SkeletonAnimeComp from "../../shared/SkeletonAnimeComp";

const SkeletonLatestContent = ({ count }) => (
  <div className="container-md mt-4">
    <header className="d-flex justify-content-between align-items-center">
      <h2 className="fs-2 fw-bold mb-3">Ongoing</h2>
    </header>
    <div className="row justify-content-start gy-xl-3 g-2 g-lg-3">
      {Array.from(Array(count)).map((idx) => (
        <div className="showmore col-4 col-md-3 col-lg-3 col-xl-2" key={`${idx}`}>
          <SkeletonAnimeComp />
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonLatestContent;
