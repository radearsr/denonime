import Link from "next/link";
import { useRef } from "react";
import styles from "./animeGenres.module.css";

const AnimeGenres = ({ genres }) => {
  const sliderContentRef = useRef(null);

  const handleSliderNext = (event) => {
    const { scrollWidth, clientWidth } = sliderContentRef.current;
    let { scrollLeft } = sliderContentRef.current;
    const totalScrollMax = scrollWidth - clientWidth;
    if (scrollLeft < totalScrollMax) sliderContentRef.current.scrollLeft += 155;
    scrollLeft = scrollLeft > 0 ? scrollLeft : 155;
    if (scrollLeft > 1 && scrollLeft < totalScrollMax) {
      event.target.previousSibling.classList.remove("d-none");
    }
    if ((sliderContentRef.current.scrollLeft + 155) >= totalScrollMax) event.target.classList.add("d-none");
  };
  const handleSliderPrev = (event) => {
    const { scrollWidth, clientWidth } = sliderContentRef.current;
    let { scrollLeft } = sliderContentRef.current;
    const totalScrollMax = scrollWidth - clientWidth;
    scrollLeft = scrollLeft > 0 ? scrollLeft : 155;
    console.log(scrollLeft);
    if (scrollLeft > 1) sliderContentRef.current.scrollLeft -= 155;
    if (scrollLeft === totalScrollMax) {
      event.target.nextSibling.classList.remove("d-none");
    }
    if ((sliderContentRef.current.scrollLeft - 155) <= 0) {
      event.target.classList.add("d-none");
    }
  };
  const sliderItems = genres.map((genre) => (
    <Link
      key={genre.genreId}
      href={`/genre/${genre.genreId}`}
      className={`${styles.slider_item} rounded-pill`}
    >
      {genre.name}
    </Link>
  ));
  return (
    <div className="container-md mt-4">
      <header className="d-flex justify-content-between align-items-center">
        <h2 className="fs-2 fw-bold mb-3">Genre</h2>
      </header>
      <div className="row">
        <div className="container position-relative w-100">
          <div className={styles.slider_inner} ref={sliderContentRef}>
            {sliderItems}
          </div>
          <button
            className={`${styles.slider_btn} ${styles.btn_prev} d-none bi bi-chevron-left`}
            onClick={handleSliderPrev}
          >
            {" "}
          </button>
          <button
            className={`${styles.slider_btn} ${styles.btn_next} bi bi-chevron-right`}
            onClick={handleSliderNext}
          >
            {" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimeGenres;
