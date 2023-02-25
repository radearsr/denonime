import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import AnimeComp from "../../SharedComp/AnimeComp";
import syles from "./sliderContent.module.css";

const SliderContent = ({
  title,
  animes,
  category,
}) => {
  const SwipperBreakpoints = {
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
          <h2 className="fs-2 fw-bold mb-3">{title}</h2>
          <Link href={`/showmore/${category}`} className={syles.content_link_more}>Lebih Banyak</Link>
        </header>
        <main>
          <Swiper slidesPerView={3} spaceBetween={10} breakpoints={SwipperBreakpoints}>
            {animes.map((anime) => (
              <SwiperSlide key={`slide-${category}-${anime.id}`}>
                <AnimeComp
                  slug={anime.slug}
                  status={anime.status}
                  poster={anime.poster}
                  title={anime.title}
                  totalEps={anime.episodes}
                  type={anime.type}
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
