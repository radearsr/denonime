import CarouselItem from "../CarouselItem";

const Carousel = ({ animes }) => (
  <div className="carousel slide carousel-fade" data-bs-ride="carousel">
    <div className="carousel-inner">
      {animes.map((anime, idx) => (
        <CarouselItem
          title={anime.title}
          rating={anime.rating}
          releaseDate={anime.releaseDate}
          poster={anime.poster}
          slug={anime.slug}
          type={anime.type}
          genres={anime.anime_genres}
          isActive={idx === 0 ? "active" : ""}
          key={`carouselItem-${anime.animeId}`}
        />
      ))}
    </div>
  </div>
);

export default Carousel;
