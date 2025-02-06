import React, { useEffect, useState } from "react";
import "./Wishlist.scss";
import { getToken } from "../services/Token";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function Wishlist({getData, wishlistNum}) {
  // Bu getWishlist funksiyasi Wishlistga tanlangan barcha productlarni oladi
  const [selectedWishlistProduct, setSelectedWishlistProduct] = useState(null);

  const getWishlist = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/action/my-wishlist/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setSelectedWishlistProduct(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getWishlist();
  }, []);

  // Bu funksiya wishlistdan productni o'chiradi
  const deleteWishlist = (id) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${getToken()}`
    );

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://ecommercev01.pythonanywhere.com/action/remove-from-wishlist/?product_id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <div className="wishlist">
      <div className="container">
        <div className="wishlist-header">
          <h1>
            Wishlist (<span>{selectedWishlistProduct?.length}</span>)
          </h1>
          <button>Move All To Bag</button>
        </div>
        <div className="cards">
          { selectedWishlistProduct?.length>0 ? selectedWishlistProduct?.map((item) => {
            return (
              <div className="card" key={item?.id}>
                <div className="discount">-35%</div>
                <button onClick={()=>{
                  deleteWishlist(item?.id)
                  getWishlist()
                  getData()
                  wishlistNum()
                }} className="like">
                  <FaTrashAlt />
                </button>
                <Link>
                  <img
                    src={`https://ecommercev01.pythonanywhere.com/${item?.pictures[0]}`}
                    alt=""
                  />
                </Link>
                <button
                  onClick={() => {
                  }}
                  className="add"
                >
                  <IoCartOutline />
                  <p>Add To Cart</p>
                </button>
                <p className="name">{item?.title}</p>
                <div className="price">
                  <p>
                    {item?.price}
                    <span>{item?.discount_price}</span>
                  </p>
                </div>
              </div>
            );
          }) : <h1 className="error1"><h2>Sizda hali tanlangan mahsulotlar yo'q!</h2></h1>}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
