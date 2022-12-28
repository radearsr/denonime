import Link from "next/link";
import Image from "next/image";
import styles from "./animeComp.module.css";

const SliderContentItem = ({
  idAnime,
  linkEps,
  poster,
  title,
}) => (
  <Link href={`streaming/${idAnime}`} className={styles.anime_comp_wrapper}>
    <div className={styles.poster_content_item}>
      <Image
        src={poster}
        alt={title}
        className={styles.img_poster}
        width="100"
        height="100"
        quality="100"
      />
      <span>
        <i className="bi bi-play-fill icon-play">{" "}</i>
      </span>
    </div>
    <p className={styles.anime_title}>{title}</p>
  </Link>
);

export default SliderContentItem;
