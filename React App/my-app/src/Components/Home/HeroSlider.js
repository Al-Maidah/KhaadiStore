import Carousel from "react-bootstrap/Carousel";

const slides = [
  {
    id: 1,
    image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwd0599c74/images/0.0-TRIBAL-desktop-banner-1920x700.jpg",
    alt: "Studio Tribal Tones Look 1",
  },
  {
    id: 2,
    image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dw9a7ebbae/images/0.0-FMD-Aug-desktop-banner-1920x700.jpg",
    alt: "Studio Tribal Tones Look 2",
  },
  {
    id: 3,
    image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwfbbb256c/images/(0.0)-0.0-0.0-0.0-0.0-B8-ZAINAB-desktop-banner-1920x700.jpg",
    alt: "Studio Tribal Tones Look 3",
  },
  {
    id: 4,
    image: "https://pk.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Library-Sites-KhaadiSharedLibrary/default/dwfe2a9ec9/images/(0.0)-KHAAS-STAGE-desktop-banner-1920x700.jpg",
    alt: "Studio Tribal Tones Look 4",
  },
];

function HeroSlider() {
  return (
    <Carousel
      interval={3000}
      controls={false}
      indicators={true}
      fade
      className="hero-slider"
    >
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-100 hero-slide-img"
            src={slide.image}
            alt={slide.alt}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HeroSlider;