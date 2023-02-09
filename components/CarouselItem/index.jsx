import Link from "next/link";
import Image from "next/image";
import style from "./carouselItem.module.css";

const CarouselItem = ({
  title,
  rate,
  genres,
  releaseDate,
  poster,
  urlStreaming,
  isActive,
}) => (
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
        <p className="text-detail fw-bold text">
          Rating :
          <span className="fw-normal">{` ${rate} / 10`}</span>
        </p>
        <p className="text-detail fw-bold">
          Genre :
          <span className="fw-normal">{` ${genres}`}</span>
        </p>
        <p className="text-detail fw-bold">
          Release :
          <span className="fw-normal">{` ${releaseDate}`}</span>
        </p>
        <Link href={urlStreaming} className={style.btn_watch}>Watch</Link>
      </div>
    </div>
  </div>
);

export default CarouselItem;
