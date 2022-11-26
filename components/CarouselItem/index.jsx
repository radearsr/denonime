import Link from "next/link";
import Image from "next/image";
import style from "./carouselItem.module.css";

const CarouselItem = ({
  title,
  description,
  poster,
  urlStreaming,
  isActive,
}) => (
  <div className={`carousel-item ${isActive}`}>
    <div className="row slide-item p-3 justify-content-between g-0">
      <div className="bg-poster" style={{ backgroundImage: `url('${poster}')` }}>{" "}</div>
      <div className="col-3 col-lg-9 poster">
        <Image
          src={poster}
          alt={title}
          width="10"
          height="10"
          className={style.carousel_poster}
          quality="100"
        />
      </div>
      <div className="col-8 col-lg-9 details">
        <h1 className="title-detail text">{title}</h1>
        <p className="description-detail text">{description}</p>
        <Link href={urlStreaming} className={style.btn_watch}>Watch</Link>
      </div>
    </div>
  </div>
);

export default CarouselItem;
