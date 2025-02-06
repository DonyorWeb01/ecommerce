import React, { useState } from "react";
import "./Card.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../../pages/services/Token";
import { toast } from "react-toastify";

function Card({
  item,
  setModalOpen,
  setSelectedProductId,
  AddWishlist,
  getData,
}) {
  const navigate = useNavigate();
  

  return (
    <div className="card">
      <div className="discount">-35%</div>
      <button
        onClick={() => {
          AddWishlist(item?.id)          
        }}
        className="like"
      >
        {item?.is_liked ? <FaHeart /> : <FaRegHeart />}
      </button>
      <Link to={`/oneCard/${item?.id}`}>
        <img
          src={`https://ecommercev01.pythonanywhere.com/${item.pictures[0]}`}
          alt="Product image not found"
          onError={(e) => (e.target.src = "fallback-image-url.jpg")}
        />
      </Link>
      <button
        onClick={() => {
          getData()
          if(getToken()){
            if(item?.in_cart === false){
              setSelectedProductId(item?.id);
              setModalOpen(true);
            }else{
              alert("mahsulot cartda bor!")
            }
          }else{
            toast.info("Siz avval ro'yxatdan o'tishingiz kerak!")
            navigate(`/Sign`)
          }
        }}
        className={`add ${item?.in_cart ? "red" : ""}`}
      >
        <><IoCartOutline />
        <p>Add To Cart</p></>
      </button>
      <p className="name">{item?.title}</p>
      <div className="price">
        <p>
          {" "}
          {item?.price} <span>{item?.discount_price}</span>
        </p>
      </div>
    </div>
  );
}

export default Card;
