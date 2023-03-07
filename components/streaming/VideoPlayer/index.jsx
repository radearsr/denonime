import { useState, useRef, useEffect } from "react";
import styles from "./VideoPlayer.module.css";

const VideoPlayer = ({ srcVideo, autoPlay }) => {
  const videoRef = useRef(null);
  const progressFill = useRef(null);
  const textCurrentTime = useRef(null);
  const textDuration = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  const reformatTime = (seconds) => {
    const addLeadingZeros = (num, totalLength) => (
      String(num).padStart(totalLength, "0")
    );

    let secondLeft = Math.floor(seconds);

    const hours = addLeadingZeros(Math.floor(secondLeft / 3600), 2);
    secondLeft = seconds % 3600;

    const mins = addLeadingZeros(Math.floor(secondLeft / 60), 2);
    secondLeft = addLeadingZeros(Math.floor(secondLeft % 60), 2);

    if (hours < 1) {
      return `${mins}:${secondLeft}`;
    }
    return `${hours}:${mins}:${secondLeft}`;
  };

  useEffect(() => {
    if (!videoRef.current) {
      return false;
    }

    textCurrentTime.current.innerText = reformatTime(videoRef.current.currentTime);
    textDuration.current.innerText = videoRef.current.duration ? reformatTime(videoRef.current.duration) : "00:00";

    const videoElement = videoRef.current;
    const onPlay = (e) => {
      console.log("Event Play");
      if (isWaiting) setIsWaiting(false);
      setIsPlaying(true);
    };

    const onPause = () => {
      console.log("Event Pause");
      setIsPlaying(false);
    };

    const onPlaying = () => {
      console.log("Event Playing");
    };

    const onTimeUpdate = (e) => {
      if (videoRef.current.duration && videoRef.current.currentTime) {
        const progressTime = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        progressFill.current.style.width = `${progressTime}%`;
        textCurrentTime.current.innerText = reformatTime(videoRef.current.currentTime);
      }
      // if (isPlaying) setIsPlaying(false);
      // setIsPlaying(true);
    };

    videoElement.addEventListener("play", onPlay);
    videoElement.addEventListener("playing", onPlaying);
    videoElement.addEventListener("pause", onPause);
    videoElement.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      videoElement.removeEventListener("playing", onPlay);
      videoElement.removeEventListener("play", onPlay);
      videoElement.addEventListener("timeupdate", onTimeUpdate);
      videoElement.removeEventListener("pause", onPause);
    };
  }, [videoRef.current]);

  const handlePlayPauseClick = () => {
    console.log("Click");
    if (!isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  // useEffect(() => {
  //   window.addEventListener("DOMContentLoaded", () => {
  //     if (autoPlay) {
  //       videoRef.current.play();
  //     } else {
  //       videoRef.current.pause();
  //     }
  //     console.log(isPlaying);
  //   });
  // });

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
      >
        <track kind="captions" />
      </video>
      <div className={styles.player__control}>
        <div className={styles.progress}>
          <div className={styles.progress__filled} ref={progressFill}>
            {" "}
          </div>
        </div>
        <div className={styles.control__left}>
          { isPlaying ? <i className="bi bi-pause-fill fs-4 player__icon">{" "}</i> : <i className="bi bi-play-fill fs-4">{" "}</i>}
          <i className="bi bi-rewind-fill fs-5 me-1 player__icon" title="Rewind 5 Second">{" "}</i>
          <i className="bi bi-fast-forward-fill fs-5 ms-1 player__icon" title="Forward 5 Second">{" "}</i>
        </div>
        {/* <div className={styles.control__center}>
          <i className="bi bi-chevron-double-left fs-1" title="Previous 5 Second">{" "}</i>
          { isPlaying ? <i className="bi bi-pause-fill fs-1">{" "}</i> : <i className="bi bi-play-fill fs-1">{" "}</i>}
          <i className="bi bi-chevron-double-right fs-1" title="Previous 5 Second">{" "}</i>
        </div> */}
        <div className={styles.control__right}>
          <p className={styles.duration} ref={textCurrentTime}>00:00:00</p>
          <p className={styles.duration}>/</p>
          <p className={styles.duration} ref={textDuration}>00:00:00</p>
          <i className="bi bi-gear-fill fs-6 fw-bold player__icon ms-2" title="Resolution">{" "}</i>
          <i className="bi bi-arrows-angle-expand fs-6 fw-bold player__icon ms-2" title="Fullscreen">{" "}</i>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
