import React from 'react'
import './About.scss'
import { Link } from 'react-router-dom'
import { BsShop } from 'react-icons/bs'
import { CiTwitter } from 'react-icons/ci'
import { PiInstagramLogoLight } from 'react-icons/pi'
import { RiLinkedinLine } from 'react-icons/ri'
import { TbTruckDelivery } from 'react-icons/tb'
import { SlEarphonesAlt } from 'react-icons/sl'
import { AiFillSafetyCertificate } from 'react-icons/ai'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

function About() {
  return (
    <div className='about'>
      <div className="container">
        <p><Link to={'/'}>Home</Link> / <span>About</span></p>
        <div className="story">
            <div className="info">
                <h1>Our Story</h1>
                <p><span>Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </span><span>Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</span></p>
            </div>
            <div className="img">
                <img src="../public/images/about.png" alt="" />
            </div>
        </div>
        <div className="bonus">
            <div className="card">
                <div className="icon">
                <BsShop />
                </div>
                <h1>10.5k </h1>
                <p>Sallers active our site</p>
            </div>
            <div className="card">
                <div className="icon">
                <BsShop />
                </div>
                <h1>10.5k </h1>
                <p>Sallers active our site</p>
            </div>
            <div className="card">
                <div className="icon">
                <BsShop />
                </div>
                <h1>10.5k </h1>
                <p>Sallers active our site</p>
            </div>
            <div className="card">
                <div className="icon">
                <BsShop />
                </div>
                <h1>10.5k </h1>
                <p>Sallers active our site</p>
            </div>
        </div>
        <div className="people">
            <Swiper 
            modules={[Pagination]} 
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
          clickable: true,
        }}className="mySwiper cards">
        <SwiperSlide>
        <div className="card1">
                    <div className="img">
                        <img src="../public/images/people1.png" alt="" />
                    </div>
                    <div className="info">
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                        <div className="btns">
                            <button><CiTwitter /></button>
                            <button><PiInstagramLogoLight /></button>
                            <button><RiLinkedinLine /></button>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card1">
                    <div className="img">
                        <img src="../public/images/people1.png" alt="" />
                    </div>
                    <div className="info">
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                        <div className="btns">
                            <button><CiTwitter /></button>
                            <button><PiInstagramLogoLight /></button>
                            <button><RiLinkedinLine /></button>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card1">
                    <div className="img">
                        <img src="../public/images/people1.png" alt="" />
                    </div>
                    <div className="info">
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                        <div className="btns">
                            <button><CiTwitter /></button>
                            <button><PiInstagramLogoLight /></button>
                            <button><RiLinkedinLine /></button>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card1">
                    <div className="img">
                        <img src="../public/images/people1.png" alt="" />
                    </div>
                    <div className="info">
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                        <div className="btns">
                            <button><CiTwitter /></button>
                            <button><PiInstagramLogoLight /></button>
                            <button><RiLinkedinLine /></button>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card1">
                    <div className="img">
                        <img src="../public/images/people1.png" alt="" />
                    </div>
                    <div className="info">
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                        <div className="btns">
                            <button><CiTwitter /></button>
                            <button><PiInstagramLogoLight /></button>
                            <button><RiLinkedinLine /></button>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card1">
                    <div className="img">
                        <img src="../public/images/people1.png" alt="" />
                    </div>
                    <div className="info">
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                        <div className="btns">
                            <button><CiTwitter /></button>
                            <button><PiInstagramLogoLight /></button>
                            <button><RiLinkedinLine /></button>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className="card1">
                    <div className="img">
                        <img src="../public/images/people1.png" alt="" />
                    </div>
                    <div className="info">
                        <h1>Tom Cruise</h1>
                        <p>Founder & Chairman</p>
                        <div className="btns">
                            <button><CiTwitter /></button>
                            <button><PiInstagramLogoLight /></button>
                            <button><RiLinkedinLine /></button>
                        </div>
                    </div>
                </div>
        </SwiperSlide>
      </Swiper>
        </div>
        
                        <div className="dostavka">
                            <div className="card">
                                <div className="img">
                                <TbTruckDelivery />
                                </div>
                                <h1>FREE AND FAST DELIVERY</h1>
                                <p>Free delivery for all orders over $140</p>
                            </div>
                            <div className="card">
                                <div className="img">
                                <SlEarphonesAlt />
                                </div>
                                <h1>24/7 CUSTOMER SERVICE</h1>
                                <p>Friendly 24/7 customer support</p>
                            </div>
                            <div className="card">
                                <div className="img">
                                <AiFillSafetyCertificate />
                                </div>
                                <h1>MONEY BACK GUARANTE</h1>
                                <p>We reurn money within 30 days</p>
                            </div>
                        </div>
      </div>
    </div>
  )
}

export default About
