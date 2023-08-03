import Link from "next/link";
import Image from "next/image";
import styles from "./animeComp.module.css";

const AnimeComp = ({
  slug,
  poster,
  title,
  type,
  status,
  totalEps,
}) => {
  return (
    <Link href={`/streaming/${slug}`} className={styles.anime_comp_wrapper} title={title}>
      <div className={styles.poster_content_item}>
        <Image
          src={poster}
          alt={title}
          className={styles.img_poster}
          width="90"
          height="90"
          quality="70"
          priority
        />
        <span className={styles.hov_effect}>
          <i className="bi bi-play-fill icon-play">{" "}</i>
        </span>
        <span className={status === "COMPLETED" ? styles.anime_eps_muted : styles.anime_eps}>
          { type === "MOVIES" ? "MOVIE" : `EPS ${totalEps}` }
        </span>
      </div>
      <p className={styles.anime_title} title={title}>{title}</p>
    </Link>
  );
};

export default AnimeComp;
