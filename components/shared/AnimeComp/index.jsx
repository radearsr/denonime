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
  const slugGenerator = (genSlug, genType) => {
    const resultEpisode = 1;
    if (genType === "Series" || genType === "series") {
      return `${genSlug}-episode-${resultEpisode.length > 1 ? resultEpisode : `0${resultEpisode}`}`;
    }
    return genSlug;
  };

  return (
    <Link href={`streaming/${slugGenerator(slug, type)}`} className={styles.anime_comp_wrapper} title={title}>
      <div className={styles.poster_content_item}>
        <Image
          src={poster}
          alt={title}
          className={styles.img_poster}
          width="90"
          height="90"
          quality="70"
        />
        <span className={styles.hov_effect}>
          <i className="bi bi-play-fill icon-play">{" "}</i>
        </span>
        <span className={status === "Completed" ? styles.anime_eps_muted : styles.anime_eps}>
          { type === "Movie" ? "Movie" : `Eps ${totalEps}` }
        </span>
      </div>
      <p className={styles.anime_title} title={title}>{title}</p>
    </Link>
  );
};

export default AnimeComp;
