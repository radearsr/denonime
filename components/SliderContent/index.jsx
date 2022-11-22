import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import SliderContentItem from "../SliderContentItem";
import syles from "./sliderContent.module.css";

const SliderContent = ({ title, animes }) => {
  const SwipperBreakpoints = {
    1400: {
      slidesPerView: 7,
    },
    1200: {
      slidesPerView: 6,
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
  };
  return (
    <div className="my-2">
      <div className="container">
        <header className="d-flex justify-content-between align-items-center">
          <h2 className={syles.content_title}>{title}</h2>
          <Link href="/" className={syles.content_link_more}>Lebih Banyak</Link>
        </header>
        <main>
          <Swiper slidesPerView={3} spaceBetween={10} breakpoints={SwipperBreakpoints}>
            {animes.map((anime) => (
              <SwiperSlide>
                <SliderContentItem
                  idAnime={anime.id}
                  linkEps={anime.title}
                  poster={anime.poster}
                  title={anime.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </main>
      </div>
    </div>
  );
};

export default SliderContent;
