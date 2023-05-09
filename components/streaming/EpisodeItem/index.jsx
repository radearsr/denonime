import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./EpisodeItem.module.css";

const EpisodeItem = ({
  number,
  label,
  labelNumber,
  isActive,
  fullSlug,
}) => {
  const currentEps = useRef(null);
  useEffect(() => {
    if (currentEps.current) {
      const activeEl = currentEps.current;
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center"
      });
    }
  }, []);
  return (
    <Link className={`${styles.episode_item} ${isActive ? `${styles.active}` : ""}`} href={`/streaming/${fullSlug}`} ref={isActive ? currentEps : null}>
      <span className={styles.episode_item_number}>{number}</span>
      <div className={styles.group_label}>
        <p className={styles.label}>{label}</p>
        <span className={styles.label_number}>{labelNumber}</span>
      </div>
    </Link>
  );
};

export default EpisodeItem;
