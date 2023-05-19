import styles from "./EpisodeList.module.css";

const EpisodeList = ({ children }) => (
  <div className={`${styles.episode_list} ms-2 ms-md-0`}>
    {children}
  </div>
);

export default EpisodeList;
