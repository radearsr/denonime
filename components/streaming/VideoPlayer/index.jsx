import { useState, useRef, useEffect } from "react";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ srcVideo, autoPlay }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!videoRef.current) {
      return false;
    }

    const onPlay = () => {
      console.log("Event Play");
      if (isWaiting) setIsWaiting(false);
      setIsPlaying(true);
    };

    const onPause = () => {
      console.log("Event Pause");
      setIsPlaying(false);
    };

    const onWaiting = () => {
      console.log("Event Waiting");
      if (isPlaying) setIsPlaying(false);
      setIsPlaying(true);
    };

    const videoElement = videoRef.current;

    videoElement.addEventListener("play", onPlay);
    videoElement.addEventListener("playing", onPlay);
    videoElement.addEventListener("pause", onPause);
    videoElement.addEventListener("waiting", onWaiting);

    return () => {
      videoElement.removeEventListener("playing", onPlay);
      videoElement.removeEventListener("play", onPlay);
      videoElement.removeEventListener("pause", onPause);
      videoElement.removeEventListener("waiting", onWaiting);
    };
  }, [videoRef.current]);

  const handlePlayPauseClick = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  return (
    <div className={styles.player}>
      <h2 className={styles.video__header}>
        Lorem ipsum dolor sit amet.
      </h2>
      <video
        src={srcVideo}
        className={styles.player__video}
        onClick={handlePlayPauseClick}
        ref={videoRef}
        autoPlay={autoPlay}
      >
        <track kind="captions" />
      </video>
      <div className={styles.player__control}>
        <div className={styles.progress}>
          <div className={styles.progress__filled}>
            {" "}
          </div>
        </div>
        <div className={styles.control__left}>
          <p className={styles.duration}>20:20</p>
          <p className={styles.duration}>/</p>
          <p className={styles.duration}>20:20</p>
        </div>
        <div className={styles.control__center}>
          <i className="bi bi-chevron-double-left fs-1" title="Previous 5 Second">{" "}</i>
          { isPlaying ? <i className="bi bi-pause-fill fs-1">{" "}</i> : <i className="bi bi-play-fill fs-1">{" "}</i>}
          <i className="bi bi-chevron-double-right fs-1" title="Previous 5 Second">{" "}</i>
        </div>
        <div className={styles.control__right}>
          <i className="bi bi-arrows-fullscreen fs-4 fw-bold" title="Fullscreen">{" "}</i>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
