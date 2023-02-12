import CarouselItem from "../CarouselItem";

const Carousel = ({ animes }) => (
  <div className="carousel slide carousel-fade" data-bs-ride="carousel">
    <div className="carousel-inner">
      {animes.map((anime, idx) => (
        <CarouselItem
          title={anime.title}
          rate="8"
          genres={anime.anime_genres.join(", ")}
          releaseDate={anime.releaseDate}
          poster={anime.poster}
          urlStreaming="/"
          isActive={idx === 0 ? "active" : ""}
          key={`carouselItem-${anime.animeId}`}
        />
      ))}
    </div>
  </div>
);

export default Carousel;
