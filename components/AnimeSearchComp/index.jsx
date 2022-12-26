import Image from "next/image";
import Link from "next/link";

const AnimeSearchComp = ({
  poster,
  title,
  genres,
  episodes,
  lengthData,
}) => (
  <Link className={`col-12 col-md-6 col-lg-4 mb-3 anime-card rounded-2 d-flex ${lengthData > 1 ? "mx-auto" : ""}`} href="/search?query=">
    <div className="wrapper-card-thumb">
      <Image
        src={poster}
        alt={title}
        width="200"
        height="200"
        quality="100"
        className="img-fluid rounded-start-2"
      />
    </div>
    <div className="card-about align-self-center">
      <h1 className="card-about-title text">{title}</h1>
      <p className="card-about-text text">{genres}</p>
      <span className="badge rounded-pill bg-orange">
        {episodes}
        {" "}
        episodes
      </span>
    </div>
  </Link>
);

export default AnimeSearchComp;
