import Link from "next/link";
import styles from "./sliderContentItem.module.css";

const SliderContentItem = ({
  idAnime,
  linkEps,
  poster,
  title,
}) => (
  <Link href={`streaming/${idAnime}/${linkEps}`} className={styles.anime_comp_wrapper}>
    <div className={styles.poster_content_item}>
      <img src={poster} alt={title} className={styles.img_poster} />
    </div>
    <p className={styles.anime_title}>{title}</p>
  </Link>
);

export default SliderContentItem;
