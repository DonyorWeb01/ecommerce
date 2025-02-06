import "./Home.scss";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Card from "../../components/card/Card";
// import { MdOutlinePhoneIphone } from 'react-icons/md';
// import { TbTruckDelivery } from 'react-icons/tb';
// import { SlEarphonesAlt } from 'react-icons/sl';
// import { AiFillSafetyCertificate } from 'react-icons/ai';
import { useEffect, useState } from "react";
import AddCartModal from "../../components/addCart/AddCartModal";
import { getToken } from "../services/Token";
import { Skeleton } from "@mui/material";
import { toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";

function Home({CartItems, data, loader, modalOpen,  setModalOpen, selectedProductId, setSelectedProductId, AddWishlist, getData, category}) {
  

  // Add To Cart bosilganda ochiladigan modal uchun
//   const [selectedProductId, setSelectedProductId] = useState(null);
  const [counter, setCounter] = useState(1);

  // Bu ochilgan Modaldan tanlangan elementlarni yig'ib Cartga qo'shish uchun
  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [productInfo, setProductInfo] = useState(null)

  const AddCart = () => {
    if(getToken()){
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken()}`);
  
      const raw = JSON.stringify({
        product_id: selectedProductId,
        quantity: counter,
        properties: {
          color: color,
          size: size,
        },
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch(
        "https://ecommercev01.pythonanywhere.com/order/add-to-cart/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if(result.cart_item){
            setProductInfo(result)
            setModalOpen(false)
            toast.info("Mahsulot cartga qo'shildi")
            CartItems()
            getData()
          }else{
            toast.error("Tanlanmagan element bor!")
          }
        })
        .catch((error) => console.error(error));
   }else{
      toast.error("Avval ro'yxatdan o'tishingiz kerak!")
      navigate("/Sign")
      setModalOpen(false)
   }
  };

  //  Bu teskari sanoq uchun vaqt
  const [days, setDays1] = useState(2)  
  const [hours, setHours] = useState(10)
  const [minutes, setMinutes] = useState(34)
  const [seconds, setSeconds] = useState(12)
  const [remainingTime, setRemainingTime] = useState(
    days * 24 * 60 * 60 * 1000 +
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000 +
    seconds * 1000
  );
  
  // Bu sanoq 0 ga yetganda to'xtatish uchun
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(timer); // Tozalash funksiyasi
  }, []);
  
  // Bu har safar vaqt yangilanganda o'sha vaqtni olish uchun
  useEffect(() => {
    if (remainingTime > 0) {
      setDays1(Math.floor(remainingTime / (24 * 60 * 60 * 1000)));
      setHours(Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)));
      setMinutes(Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000)));
      setSeconds(Math.floor((remainingTime % (60 * 1000)) / 1000));
    }
  }, [remainingTime]);



  return (
    <div onLoad={()=>{
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }} className="home">
      <AddCartModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        selectedProductId={selectedProductId}
        AddCart={AddCart}
        counter={counter}
        setCounter={setCounter}
        setColor={setColor}
        setSize={setSize}
        productInfo={productInfo}
      />
      <div className="hero">
        <div className="container">
          <ul>
            {category?.map((item)=>{
              return <li>
              <Link>{item?.title}</Link>
              <button>
                <IoIosArrowForward />
              </button>
            </li>
            })}
          </ul>
          <div className="hero-main">
            <Swiper
              pagination={true}
              modules={[Pagination]}
              className="mySwiper"
            >
              <SwiperSlide className="swiper1">
                <div className="hero-main-img">
                  <div className="img-info">
                    <div className="name">
                      <img src="../public/images/apple.png" alt="" />
                      <p>iPhone 14 Series</p>
                    </div>
                    <h1>Up to 10% off Voucher</h1>
                    <button>
                      Shop Now <FaArrowRightLong />
                    </button>
                  </div>
                  <div className="img">
                    <img src="../public/images/iPhone.png" alt="" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper1">
                <div className="hero-main-img">
                  <div className="img-info">
                    <div className="name">
                      <img src="../public/images/apple.png" alt="" />
                      <p>iPhone 15 Series</p>
                    </div>
                    <h1>Up to 20% off Voucher</h1>
                    <button>
                      Shop Now <FaArrowRightLong />
                    </button>
                  </div>
                  <div className="img">
                    <img src="../public/images/iPhone.png" alt="" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper1">
                <div className="hero-main-img">
                  <div className="img-info">
                    <div className="name">
                      <img src="../public/images/apple.png" alt="" />
                      <p>iPhone 16 Series</p>
                    </div>
                    <h1>Up to 30% off Voucher</h1>
                    <button>
                      Shop Now <FaArrowRightLong />
                    </button>
                  </div>
                  <div className="img">
                    <img src="../public/images/iPhone.png" alt="" />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
      <div className="today">
        <div className="container">
          <div className="logo">
            <div className="line"></div>
            <h1>Today’s</h1>
          </div>
          <div className="today-info">
            <div className="left">
              <h1>Flash Sales</h1>
              <div className="times">
                <div className="day">
                  <p>Days</p>
                  <h1>{String(days).padStart(2, "0")}</h1>
                </div>
                <h2>:</h2>
                <div className="day">
                  <p>Hours</p>
                  <h1>{String(hours).padStart(2, "0")}</h1>
                </div>
                <h2>:</h2>
                <div className="day">
                  <p>Minutes</p>
                  <h1>{String(minutes).padStart(2, "0")}</h1>
                </div>
                <h2>:</h2>
                <div className="day">
                  <p>Seconds</p>
                  <h1>{String(seconds).padStart(2, "0")}</h1>
                </div>
              </div>
            </div>
            <div className="btns">
              <button>
                <FaArrowLeft />
              </button>
              <button className="rightBtn">
                <FaArrowLeft />
              </button>
            </div>
          </div>
          <div className="cards">
            {loader && (
              <div className="skeleton">
              <Skeleton variant="rounded" width={270} height={469} />
              <Skeleton variant="rounded" width={270} height={469} />
              <Skeleton variant="rounded" width={270} height={469} />
              <Skeleton variant="rounded" width={270} height={469} />
              <Skeleton variant="rounded" width={270} height={469} />
              <Skeleton variant="rounded" width={270} height={469} />
              <Skeleton variant="rounded" width={270} height={469} />
              <Skeleton variant="rounded" width={270} height={469} />
              </div>
            )}
            {data?.map((item, index) => {
              return (
                <Card
                  key={index}
                  item={item}
                  setModalOpen={setModalOpen}
                  setSelectedProductId={setSelectedProductId}
                  AddWishlist={AddWishlist}
                  getData={getData}
                />
              );
            })}
          </div>
          <div className="button">
            <button>View All Products</button>
          </div>
        </div>
      </div>
      {/* <div className="category">
                <div className="container">
                    <div className="logo">
                        <div className="line"></div>
                        <h1>Categories</h1>
                    </div>
                    <div className="category-info">
                        <h1>Browse By Category</h1>
                        <div className="btns">
                            <button><FaArrowLeft /></button>
                            <button className='rightBtn'><FaArrowLeft /></button>
                        </div>
                    </div>
                    <div className="category-cards">
                        <div className="card">
                            <div className="img">
                                <MdOutlinePhoneIphone />
                            </div>
                            <h1>Phones</h1>
                        </div>
                        <div className="card">
                            <div className="img">
                                <MdOutlinePhoneIphone />
                            </div>
                            <h1>Phones</h1>
                        </div>
                        <div className="card">
                            <div className="img">
                                <MdOutlinePhoneIphone />
                            </div>
                            <h1>Phones</h1>
                        </div>
                        <div className="card">
                            <div className="img">
                                <MdOutlinePhoneIphone />
                            </div>
                            <h1>Phones</h1>
                        </div>
                        <div className="card">
                            <div className="img">
                                <MdOutlinePhoneIphone />
                            </div>
                            <h1>Phones</h1>
                        </div>
                        <div className="card">
                            <div className="img">
                                <MdOutlinePhoneIphone />
                            </div>
                            <h1>Phones</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="selling">
                <div className="container">
                    <div className="logo">
                        <div className="line"></div>
                        <h1>This Month</h1>
                    </div>
                    <div className="selling-info">
                        <h1>Best Selling Products</h1>
                        <button>View All</button>
                    </div>
                    <div className="cards">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
            <div className="hero1">
                <div className="container">
                    <div className="info">
                        <Link>Categories</Link>
                        <h1>Enhance Your Music Experience</h1>
                        <div className="time">
                            <div className="data">
                                <h1>23</h1>
                                <p>Hours</p>
                            </div>
                            <div className="data">
                                <h1>05</h1>
                                <p>Days</p>
                            </div>
                            <div className="data">
                                <h1>59</h1>
                                <p>Minutes</p>
                            </div>
                            <div className="data">
                                <h1>35</h1>
                                <p>Seconds</p>
                            </div>
                        </div>
                        <button>Buy Now!</button>
                    </div>
                    <div className="img">
                        <img src="../public/images/hero1.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="explore">
                <div className="container">
                    <div className="logo">
                        <div className="line"></div>
                        <h1>Our Products</h1>
                    </div>
                    <div className="category-info">
                        <h1>Explore Our Products</h1>
                        <div className="btns">
                            <button><FaArrowLeft /></button>
                            <button className='rightBtn'><FaArrowLeft /></button>
                        </div>
                    </div>
                    <div className="cards">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                    <div className="button">
                        <button>View All Products</button>
                    </div>
                </div>
            </div>
            <div className="featured">
                <div className="container">
                    <div className="logo">
                        <div className="line"></div>
                        <h1>Our Products</h1>
                    </div>
                    <h1>New Arrival</h1>
                    <div className="tips">
                        <div className="one-tip">
                            <img src="../public/images/tip1.png" alt="" />
                            <div className="info">
                                <h1>PlayStation 5</h1>
                                <p>Black and White version of the PS5 coming out on sale.</p>
                                <Link>Shop Now</Link>
                            </div>
                        </div>
                        <div className="other-tips">
                            <div className="two-tip">
                                <img src="../public/images/tip2.png" alt="" />
                                <div className="info">
                                    <h1>Women’s Collections</h1>
                                    <p>Featured woman collections that give you another vibe.</p>
                                    <Link>Shop Now</Link>
                                </div>
                            </div>
                            <div className="each-tips">
                                <div className="tip">
                                    <img src="../public/images/tip3.png" alt="" />
                                    <div className="info">
                                        <h1>Speakers</h1>
                                        <p>Amazon wireless speakers</p>
                                        <Link>Shop Now</Link>
                                    </div>
                                </div>
                                <div className="tip">
                                    <img src="../public/images/tip4.png" alt="" />
                                    <div className="info">
                                        <h1>Perfume</h1>
                                        <p>GUCCI INTENSE OUD EDP</p>
                                        <Link>Shop Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dostavka">
                <div className="container">
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
            </div> */}
    </div>
  );
}

export default Home;
