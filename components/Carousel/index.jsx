import CarouselItem from "../CarouselItem";

const Carousel = ({ animes }) => (
  <div className="carousel slide carousel-fade" data-bs-ride="carousel">
    <div className="carousel-inner">
      {animes.map((anime, idx) => (
        <CarouselItem
          title={anime.title}
          description={anime.description}
          poster={anime.poster}
          urlStreaming="/"
          isActive={idx === 0 ? "active" : ""}
          key={`carouselItem-${anime.id}`}
        />
      ))}
    </div>
  </div>
);

export default Carousel;
