import styles from "./EpisodeList.module.css";

const EpisodeList = ({ children }) => (
  <div className={styles.episode_list}>
    {children}
  </div>
);

export default EpisodeList;
