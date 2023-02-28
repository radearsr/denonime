import Link from "next/link";
import Image from "next/image";
import style from "./carouselItem.module.css";

const CarouselItem = ({
  title,
  rating,
  releaseDate,
  poster,
  slug,
  type,
  isActive,
}) => {
  const dateToString = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleString("in-ID", options);
  };

  const slugGenerator = (genSlug, genType) => {
    const resultEpisode = 1;
    if (genType === "Series" || genType === "series") {
      return `${genSlug}-episode-${resultEpisode.length > 1 ? resultEpisode : `0${resultEpisode}`}`;
    }
    return genSlug;
  };

  return (
    <div className={`carousel-item ${isActive}`}>
      <div className="row slide-item p-3 justify-content-evenly g-0">
        <div className="bg-poster" style={{ backgroundImage: `url('${poster}')` }}>{" "}</div>
        <div className="col-3 col-lg-9 poster">
          <Image
            src={poster}
            alt={title}
            width="100"
            height="100"
            className={style.carousel_poster}
            priority
          />
        </div>
        <div className="col-8 col-lg-9 details">
          <h1 className="title-detail text">{title}</h1>
          <p className="text-detail fw-bold text m-0">
            Rating :
            <span className="fw-normal">{` ${rating} / 10`}</span>
          </p>
          <p className="text-detail fw-bold m-0">
            Release :
            <span className="fw-normal">{` ${dateToString(new Date(releaseDate).getTime())}`}</span>
          </p>
          <Link href={`streaming/${slugGenerator(slug, type)}`} className={style.btn_watch}>Watch</Link>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
