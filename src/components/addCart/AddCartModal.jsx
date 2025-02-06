import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import "./AddCartModal.scss";
import { Link, useNavigate } from "react-router-dom";

function AddCartModal({
  modalOpen,
  setModalOpen,
  selectedProductId,
  AddCart,
  counter,
  setCounter,
  setColor,
  setSize,
}) {
  // Qaysi color tanlanganligini bildirish uchun
  const [activeColor, setActiveColor] = useState(null);

  const navigate = useNavigate()

  const handlColor = (color) => {
    setActiveColor(color);
  };

  // Qaysi size tanlanganligini bildirish uchun
  const [activeSize, setActiveSize] = useState(null);

  const handlSize = (size) => {
    setActiveSize(size);
  };

  // APIdan cartga tanlash uchun bosilganda ochiladigan modal funksiyasi
  const [selectedProductOne, setSelectedProductOne] = useState(null);

  const getSelectedProduct = async () => {
    try {
      const response = await fetch(
        `https://ecommercev01.pythonanywhere.com/product/detail/?product_id=${selectedProductId}`
      );
      if (!response.ok) throw new Error("Failed to fetch product");
      const result = await response.json();
      setSelectedProductOne(result);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (selectedProductId && modalOpen) {
      getSelectedProduct();
    }
  }, [selectedProductId, modalOpen]);

  if (!modalOpen || !selectedProductOne) return null;

  return (
    <div className="cartModal1">
      <div className="cartModal">
        <div className="cartModal-main">
          <button
            onClick={() => {
              setModalOpen(false); // Modalni yopish
              setActiveColor(null); // Rangni dastlabki holatga qaytarish
              setActiveSize(null); // O'lchamni dastlabki holatga qaytarish
              setCounter(1); // Counterni 1 ga qaytarish
            }}
            className="exit"
          >
            <IoMdClose />
          </button>

          <div className="img">
            <img
              src={
                selectedProductOne?.pictures?.[0]?.file
                  ? `https://ecommercev01.pythonanywhere.com/${selectedProductOne?.pictures?.[0]?.file}`
                  : ""
              }
              alt="Product"
            />
            <button onClick={()=>{
                navigate(`/oneCard/${selectedProductOne?.id}`)
                setModalOpen(false)
            }}>Batafsil ma'lumot</button>
          </div>
          <div className="info1">
            <h1>{selectedProductOne?.title}</h1>
            <div className="line"></div>
            <div className="colors">
              <h2>
                Color: <span>{activeColor}</span>
              </h2>
              <div className="colorss">
                {selectedProductOne?.properties?.color?.map((color) => (
                  <div
                    key={color}
                    className={`color ${activeColor === color ? "active" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setColor(color), handlColor(color);
                    }}
                  ></div>
                ))}
              </div>
            </div>
            <div className="line"></div>
            <div className="sizes">
              <h2>
                Size: <span>{activeSize}</span>
              </h2>
              <div className="sizess">
                {selectedProductOne?.properties?.size?.map((size) => (
                  <button
                    key={size}
                    className={`size ${activeSize === size ? "active" : ""}`}
                    onClick={() => {
                      setSize(size), handlSize(size);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="line"></div>
            <div className="counter1">
              <h4>
                Quantity: <span>{counter}</span>
              </h4>
              <div className="count1">
                <button
                  onClick={() =>
                    setCounter((prev) => (prev > 1 ? prev - 1 : 1))
                  }
                  className="plus"
                >
                  -
                </button>
                <h3>{counter}</h3>
                <button
                  onClick={() => setCounter(counter + 1)}
                  className="plus"
                >
                  +
                </button>
              </div>
            </div>
            <div className="line"></div>
            <div className="price">
              <h2>
                Price: {selectedProductOne?.price * counter}
                <span>{selectedProductOne?.discount_price * counter}</span>
              </h2>
            </div>
            <button
              onClick={() => {
                AddCart();
                setActiveColor(null)
                setActiveSize(null)
                setCounter(1)
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCartModal;
