import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: [false, false, false], // State for each card
    };
  }

  handleMouseEnter = (index) => {
    const newHoveredState = this.state.isHovered.map((state, i) => (i === index ? true : state));
    this.setState({ isHovered: newHoveredState });
  };

  handleMouseLeave = (index) => {
    const newHoveredState = this.state.isHovered.map((state, i) => (i === index ? false : state));
    this.setState({ isHovered: newHoveredState });
  };


  render() {
    const cardData = [
      {
        image: process.env.PUBLIC_URL + '/images/repair.jpg',
        title: 'Furniture Delivery Assistance',
        text: 'We offer professional assistance with delivering and setting up your new furniture at your home or office.',
      },
      {
        image: process.env.PUBLIC_URL + '/images/design.jpg',
        title: 'Custom Furniture Design',
        text: 'Our team specializes in creating custom-designed furniture pieces tailored to your unique style and preferences.',
      },
      {
        image: process.env.PUBLIC_URL + '/images/furniture.jpg',
        title: 'Furniture Restoration Services',
        text: 'Bring new life to your old furniture with our expert restoration services, preserving its beauty and functionality.',
      },
    ];
    return (
      <div className="mainContainer">
          <div class="custom-shape-divider-bottom-1702062582 main">
              <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                  <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                  <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
              </svg>
          </div>
          <p class = "mainTitle">StylishHome</p>
          <div class="titleBlock"> <p class="title">Welcome to Stylish Home — your personal guide to the world of elegant and stylish home furniture! We believe that your home should reflect your unique taste and create an atmosphere of comfort and coziness.</p></div>
          <img class="wardrobe" src={process.env.PUBLIC_URL + '/images/wardrobe.png'} alt="Моє Зображення" />
          <button class ="btn demo"> <NavLink tag={Link} className="text-dark" to="/room">Open demo</NavLink></button>
          <div class="middle">
          <div class="our-services">
          <div className="container containerHome">
              <p class ="service-title">Our Services</p>
                <div className="row row-cols-3">
                {cardData.map((card, index) => (
                        <div
                          key={index}
                          className={`card cardHome ${this.state.isHovered[index] ? 'hovered' : ''}`}
                          onMouseEnter={() => this.handleMouseEnter(index)}
                          onMouseLeave={() => this.handleMouseLeave(index)}
                        >
                          <img src={card.image} className="card-img-top card-img-top-home" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{card.title}</h5>
                            <p className="card-text">{card.text}</p>
                          </div>
                            <a href="#" className="btn btn-primary home-btn">
                              More info
                            </a>
                        </div>
                      ))}
                </div>
          </div>
          </div>
          
          </div>
          <p class ="review-title">Yours reviews</p>
          <div className="swiper">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  centerInsufficientSlides={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                >
                  <SwiperSlide>
                    <div className='swiper-slide'>
                    <p className="swiper-text">StylishHome is a gem! The furniture selection is top-notch, and the customer service is exceptional. I found the perfect pieces for my home and couldn't be happier. Thank you for the wonderful experience!</p>
                    <p className='swiper-by'>-Dmytro</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='swiper-slide'>
                    <p className="swiper-text">StylishHome is the best furniture store! Their collection is amazing and the quality is top-notch. The staff is friendly and helpful, making the shopping experience delightful. Thank you for helping me find the perfect pieces for my home!</p>
                    <p className='swiper-by'>-Dmytro</p>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className='swiper-slide'>
                    <p className="swiper-text">StylishHome is a hidden gem! Their furniture selection is exquisite, and the quality is exceptional. The staff is knowledgeable and friendly, providing excellent customer service. Thank you, StylishHome, for transforming my house into a stylish and cozy home!</p>
                    <p className='swiper-by'>-Dmytro</p>
                    </div>
                  </SwiperSlide>
                </Swiper>
          </div>

          <div class="custom-shape-divider-top-1702063406 main">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
              <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
              <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
          </svg>
          </div>
          <div className="AboutUs">
            <img class="AboutImg" src={process.env.PUBLIC_URL + '/images/aboutimg.jpg'} alt="Моє Зображення" />
            <div className='About'>
              <p className='AboutTitle'>About us</p>
              <p className='AboutText'>
Welcome to StylishHome, a premier furniture store located in Rava-Ruska, 46. We are dedicated to providing our customers with high-quality and stylish furniture that will transform their homes into beautiful and inviting spaces. With our wide range of furniture options, exceptional customer service, and competitive prices, we strive to exceed your expectations and make your shopping experience enjoyable and hassle-free.
</p>
<p className='AboutText'>
At StylishHome, we understand that your home is a reflection of your personal style and taste. That's why we offer a carefully curated selection of furniture pieces that are both functional and aesthetically pleasing. Whether you are looking for a cozy sofa, a stunning dining table, or a comfortable bed, our knowledgeable team is here to assist you in finding the perfect furniture to suit your needs and enhance your living space. Visit our store today and let us help you create the home of your dreams.</p>
            </div>
          </div>
      </div>
    );
  }
}
