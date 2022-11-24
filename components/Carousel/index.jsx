import CarouselItem from "../CarouselItem";

const Carousel = ({ animes }) => (
  <div className="carousel slide carousel-fade" data-bs-ride="carousel">
    <div className="carousel-inner">
      {animes.map((anime, idx) => (
        <CarouselItem
          title={anime.title}
          description={anime.descriptions}
          poster={anime.poster}
          urlStreaming="/"
          isActive={idx === 0 ? "active" : ""}
        />
      ))}
    </div>
  </div>
);

export default Carousel;
