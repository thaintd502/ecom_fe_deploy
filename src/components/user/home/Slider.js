import React from "react";
import Slider from "react-slick";
import "./Slider.css"; // Thêm CSS để tùy chỉnh giao diện
import img_slider1 from '../../../assets/images/dien-may-xanh.png';
import img_slider2 from '../../../assets/images/khuyen-mai.jpg';
import img_slider3 from '../../../assets/images/the-gioi-di-dong.png';


const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Thời gian chuyển đổi ảnh (ms)
    arrows: false, // Ẩn nút điều hướng
  };

  const images = [ img_slider1, img_slider2, img_slider3 ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="slide">
            <img src={img} alt={`Slide ${index + 1}`} className="slide-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
