import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import AnimeComp from "../AnimeComp";
import syles from "./sliderContent.module.css";

const SliderContent = ({
  title,
  animes,
  category,
}) => {
  const SwipperBreakpoints = {
    1400: {
      slidesPerView: 8,
      spaceBetween: 23,
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

  const slugPrefixGenerator = (slug, type) => {
    const resultEpisode = 1;
    if (type === "series") {
      return `${slug}-episode-${resultEpisode}`;
    }
    return `${slug}-episode-${resultEpisode}`;
  };

  return (
    <div className="my-2">
      <div className="container">
        <header className="d-flex justify-content-between align-items-center">
          <h2 className={syles.content_title}>{title}</h2>
          <Link href={`/showmore/${category}`} className={syles.content_link_more}>Lebih Banyak</Link>
        </header>
        <main>
          <Swiper slidesPerView={3} spaceBetween={10} breakpoints={SwipperBreakpoints}>
            {animes.map((anime) => (
              <SwiperSlide key={`slide-${category}-${anime.animeId}`}>
                <AnimeComp
                  slug={slugPrefixGenerator(anime.slug, anime.type)}
                  poster={anime.poster}
                  title={anime.title}
                  totalEps={anime.episodes}
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
