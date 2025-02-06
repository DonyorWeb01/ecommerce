import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { getToken } from "../services/Token";
import { FaPen } from "react-icons/fa6";

function Cart({ Cartloader, items, CartItems, getData}) {
  // Har bir mahsulot uchun counter va subtotal qiymatlarini saqlaymiz
  const [productData, setProductData] = useState({});

  useEffect(() => {
    if (items?.cart_items) {
      const initialData = items.cart_items.reduce((acc, product) => {
        acc[product.id] = {
          quantity: product.quantity,
          subtotal: product.subtotal, // Dastlabki subtotal qiymatini saqlash
        };
        return acc;
      }, {});
      setProductData(initialData);
    }
  }, [items]);  

  // Mahsulotni o‘chirish funksiyasi
  const deleteCartItems = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://ecommercev01.pythonanywhere.com/order/remove-from-cart?cart_item_id=${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        CartItems();
        getData()
      })
      .catch((error) => console.error(error));
  };


  // Counterni va subtotalni yangilash funksiyasi
  const updateCounter = (id, change, price) => {
    setProductData((prev) => {
      const newQuantity = Math.max(1, (prev[id]?.quantity || 1) + change); // Minimal qiymat 1
      return {
        ...prev,
        [id]: {
          quantity: newQuantity,
          subtotal: newQuantity * price, // Yangilangan subtotal
        },
      };
    });
  };

  return (
    <div className="cart">
      <div className="container">
        <p>
          <Link to={"/"}>Home</Link> / Cart
        </p>
        <div className="cart-main">
          <ul>
            <li>
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
              <p>Delete</p>
            </li>
            {Cartloader && (
              <div className="loader">
                <img src="../public/images/loader.gif" alt="" />
              </div>
            )}
            {getToken() && items?.cart_items.length>0 ? (
              items?.cart_items.map((product) => (
                <li key={product.id}>
                  <div className="product">
                    <div className="img">
                      <img
                        src={`https://ecommercev01.pythonanywhere.com/${product?.pictures?.[0]?.file}`}
                        alt=""
                      />
                    </div>
                    <p>{product.title}</p>
                  </div>
                  <p className="price">{product.price}$</p>
                  <div className="count">
                    <div className="counter">
                      <h2>{productData[product.id]?.quantity || 1}</h2>
                      <div className="btns">
                        <button
                          onClick={() => updateCounter(product.id, 1, product.subtotal)}
                          className="top"
                        >
                          <IoIosArrowDown />
                        </button>
                        <button
                          onClick={() => updateCounter(product.id, -1, product.subtotal)}
                          className="end"
                        >
                          <IoIosArrowDown />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="subtotal">
                    <p>{productData[product.id]?.subtotal || product.subtotal}$</p>
                  </div>
                  <div className="buttons">
                    <button className="edit">
                      <FaPen />
                    </button>
                    <button
                      onClick={() => deleteCartItems(product?.id)}
                      className="delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <h1 className="error1">
                <h2>Sizda hali mahsulotlar yo'q!</h2>
              </h1>
            )}
          </ul>
          <div className="btns1">
            <button>Return To Shop</button>
            <button>Update Cart</button>
          </div>
        </div>
        <div className="subtotal-info">
          <form action="">
            <input type="text" placeholder="Coupon Code" />
            <button>Apply Coupon</button>
          </form>
          <div className="cart-total">
            <h1>Cart Total</h1>
            <div className="text">
              <p>Subtotal:</p>
              <p>175$</p>
            </div>
            <div className="line"></div>
            <div className="text">
              <p>Subtotal:</p>
              <p>175$</p>
            </div>
            <div className="line"></div>
            <div style={{ marginBottom: "16px" }} className="text">
              <p>Subtotal:</p>
              <p>{items?.total_price}$</p>
            </div>
            <button>Proceed to checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
