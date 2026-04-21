import { useState, useEffect } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./carousel.css";

function Carousel({ images }) {

  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setSlide((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setSlide((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">

      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={prevSlide}
      />

      {images.map((item, index) => (
        <img
          key={index}
          src={item.image}
          alt=""
          className={slide === index ? "slide" : "slide hidden"}
          onClick={() => item.link && navigate(item.link)}
        />
      ))}

      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={nextSlide}
      />

    </div>
  );
}

export default Carousel;