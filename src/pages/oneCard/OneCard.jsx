import React, { useEffect, useState } from "react";
import "./OneCard.scss";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import Stars from "../../components/stars/Stars";
import { getToken } from "../services/Token";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa6";
import { Skeleton } from "@mui/material";

function OneCard({ setcartNumber, AddWishlist, isLiked, CartItems }) {
  // Bu funksiya productning bosilgandagi idsi bo'ycha bitta mahsulotning detailini olib beradi
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [imgNum, setImgNum] = useState(0);

  const getData = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `https://ecommercev01.pythonanywhere.com/product/detail/?product_id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (id) getData();
  }, [id]);

  // Bu funksiya oneCarddagi tanlangan elementlar bo'yich mahsulotni cartga qo'shadi
  const [activeColor, setActiveColor] = useState(null);
  const [activeSize, setActiveSize] = useState(null);
  const [counter, setCounter] = useState(1);

  // const AddCart = () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${getToken()}`);

  //   const raw = JSON.stringify({
  //     product_id: id,
  //     quantity: counter,
  //     properties: {
  //       color: activeColor,
  //       size: activeSize,
  //     },
  //   });

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://ecommercev01.pythonanywhere.com/order/add-to-cart/",
  //     requestOptions
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`Error: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((result) => {
  //       setProductInfo(result);
  //       setcartNumber(false);
  //       if (result.message) {
  //         toast.info("Mahsulot muvaffaqiyatli cartga qo'shildi!");
  //       } else if (result.properties?.length) {
  //         toast.error("Tanlanmagan element bor!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setcartNumber(false);
  //       toast.error("Tanlanmagan element bor!");
  //     });
  // };

  const AddCart = () => {
    if (getToken()) {
      setcartNumber(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getToken()}`);

      const raw = JSON.stringify({
        product_id: id,
        quantity: counter,
        properties: {
          color: activeColor,
          size: activeSize,
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
          if (result.cart_item) {
            setcartNumber(false);
            toast.info("Mahsulot cartga qo'shildi");
            CartItems();
            getData();
          } else {
            toast.error("Tanlanmagan element bor!");
          }
        })
        .catch((error) => console.error(error));
    } else {
      toast.error("Avval ro'yxatdan o'tishingiz kerak!");
      navigate("/Sign");
    }
  };
  return (
    <div
      onLoad={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="OneCard"
    >
      {product ? (
        <div className="container">
          <p>
            {" "}
            Account / Gaming / <span>{product.title}</span>
          </p>
          <div className="oneCard-main">
            <div className="images">
              <div className="imgs">
                {product.pictures?.map((img, index) => {
                  return (
                    <img
                      onClick={() => {
                        setImgNum(index);
                      }}
                      key={index}
                      src={`https://ecommercev01.pythonanywhere.com/${img.file}`}
                      alt=""
                    />
                  );
                })}
              </div>
              <div className="main-img">
                <img
                  src={`https://ecommercev01.pythonanywhere.com/${product.pictures[imgNum].file}`}
                  alt=""
                />
              </div>
            </div>
            <div className="info">
              <h1>{product.title}</h1>
              <div className="stars">
                {<Stars stars={product.stars} />}
                <p>(150 Reviews) |</p>
                <Link>In Stock</Link>
              </div>
              <h2>
                {product.discount_price * counter}
                <span>{product.price * counter}</span>
              </h2>
              <p>{product.description}</p>
              <div className="line"></div>
              <div className="colors">
                <p>Colours:</p>
                {product.properties?.color?.map((color) => {
                  return (
                    <div
                      className={`color ${
                        activeColor === color ? "active" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setActiveColor(color);
                      }}
                    ></div>
                  );
                })}
              </div>
              <div className="size">
                <p className="textSize">Size:</p>
                {product.properties?.size?.map((size) => {
                  return (
                    <button
                      className={`sizeBtn ${
                        activeSize === size ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveSize(size);
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              <div className="btns">
                <div className="counter">
                  <button
                    onClick={() => {
                      if (counter <= 1) {
                        setCounter(1);
                      } else {
                        setCounter(counter - 1);
                      }
                    }}
                    className="btn1"
                  >
                    -
                  </button>
                  <h3>{counter}</h3>
                  <button
                    onClick={() => {
                      setCounter(counter + 1);
                    }}
                    className="btn1"
                  >
                    +
                  </button>
                </div>
                <button
                  className="buy1"
                  onClick={() => {
                    AddCart();
                  }}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    AddWishlist(product?.id);
                  }}
                  className="like"
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <div className="dostavka1">
                <div className="top1">
                  <div className="top">
                    <div className="img">
                      <TbTruckDelivery />
                    </div>
                  </div>
                  <div className="end">
                    <h4>Free Delivery</h4>
                    <Link>
                      Enter your postal code for Delivery Availability
                    </Link>
                  </div>
                </div>
                <div className="line"></div>
                <div className="end1">
                  <div className="top">
                    <div className="img">
                      <TbTruckDelivery />
                    </div>
                  </div>
                  <div className="end">
                    <h4>Free Delivery</h4>
                    <Link>
                      Enter your postal code for Delivery Availability
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="text-skeleton">
            <Skeleton variant="rounded" width={700} height={20} />
          </div>
          <div className="skeleton">
            <div className="skeleton-img">
              <div className="skeleton-imgs">
                <Skeleton variant="rectangular" width={170} height={140} />
                <Skeleton variant="rectangular" width={170} height={140} />
                <Skeleton variant="rectangular" width={170} height={140} />
                <Skeleton variant="rectangular" width={170} height={140} />
              </div>
              <div className="skeleton-image">
                <Skeleton variant="rectangular" width={500} height={600} />
              </div>
            </div>
            <div className="skeleton-info">
              <Skeleton variant="rounded" width={400} height={40} />
              <Skeleton variant="rounded" width={400} height={20} />
              <Skeleton variant="rounded" width={400} height={30} />
              <Skeleton variant="rounded" width={400} height={10} />
              <Skeleton variant="rounded" width={400} height={1} />
              <Skeleton variant="rounded" width={400} height={30} />
              <Skeleton variant="rounded" width={400} height={30} />
              <Skeleton variant="rounded" width={400} height={40} />
              <Skeleton variant="rounded" width={400} height={250} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OneCard;
