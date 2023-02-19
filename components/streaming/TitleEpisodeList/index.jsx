import styles from "./TitleEpisodeList.module.css";

const TitleEpisodeList = ({ text }) => (
  <h3 className={styles.title_episode_list}>{text}</h3>
);

export default TitleEpisodeList;
