import React, { useEffect, useState } from "react";
import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Sign from "./pages/sign/Sign";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import OneCard from "./pages/oneCard/OneCard";
import { getToken } from "./pages/services/Token";
import Cart from "./pages/cart/Cart";

import { ToastContainer, toast } from "react-toastify";
import Wishlist from "./pages/wishlist/Wishlist";
import Contact from "./pages/contact/Contact";

function App() {

  // Bu AddCart bosilganda modalni ochish uchun
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Bu getData APIdagi hamma productlarni olish uchun
  const [data, setData] = useState(null);

  const [loader, setLoader] = useState(true);

  const getData = () => {
    if (getToken()) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${getToken()}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://ecommercev01.pythonanywhere.com/product/list/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          setLoader(false);
        })
        .catch((error) => console.error(error));
    } else {
      // const myHeaders = new Headers();
      // myHeaders.append("Authorization", `Bearer ${getToken()}`);

      const requestOptions = {
        method: "GET",
        // headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://ecommercev01.pythonanywhere.com/product/list/",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          setLoader(false);
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Bu getUser authorizationdan ro'yhatdan o'tganda user icon chiqishi uchun
  const [user, setUser] = useState(null);

  const getUser = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/user/detail/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setUser(result);
        getWishlist()
        getData()
        CartItems()
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, [getToken()]);

  // Bu CartItems Korzinkadagi barcha tanlangan productlarni olish uchun
  const [items, setItems] = useState(null);
  const [Cartloader, setCartLoader] = useState(true);

  const CartItems = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      "https://ecommercev01.pythonanywhere.com/order/cart-items/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setItems(result);
        setCartLoader(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    CartItems();
    getWishlist();
    getCategory()
  }, []);

  // Bu funksiya yurakcha osilganda Wishlistga productni qo'shadi
  const [isLiked, setIsLiked] = useState(false);
  // const navigate = useNavigate()

  const AddWishlist = (id) => {
    if (getToken()) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${getToken()}`);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `https://ecommercev01.pythonanywhere.com/action/add-to-wishlist/?product_id=${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          getWishlist();
          if (result?.message == "Mahsulot istaklar ro'yxatiga muvaffaqqiyatli qo'shildi.") {
            toast.success(result?.message);
            setIsLiked(true)
          } else {
            deleteProductWishlist(id);
            toast("Mahsulot istaklar ro'yhatidan muvaffaqiyatli o'chirildi!");
            setIsLiked(false)
          }
           getData()
        })
        .catch((error) => console.error(error));
    } else {
      // Navigate("/Sign");
      toast.info("Avval ro'yxatdan o'tishingiz kerak!");
    }
  };

  // Bu funksiya productni wishlistdan o'chiradi

  const deleteProductWishlist = (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getToken()}`);

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
      .then((result) => {
      })
      .catch((error) => console.error(error));
  };

  const [wishListNumber, setWishlistNumber] = useState(null);

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
        setWishlistNumber(result);
      })
      .catch((error) => console.error(error));
  };

  // Bu funksiya productlarni categoriya bo'ycha saralab beradi
  const [category, setCategory] = useState(null)
  

  const getCategory = ()=>{
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    
    fetch("https://ecommercev01.pythonanywhere.com/product/categories/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCategory(result)
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        <Navbar
          user={user}
          getUser={getUser}
          wishListNumber={wishListNumber}
          items={items}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                data={data}
                getData={getData}
                loader={loader}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedProductId={selectedProductId}
                setSelectedProductId={setSelectedProductId}
                AddWishlist={AddWishlist}
                CartItems={CartItems}
                category={category}
              />
            }
          />
          <Route path="/Sign" element={<Sign getUser={getUser} />} />
          <Route path="/login" element={<Login getUser={getUser} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/oneCard/:id"
            element={
              <OneCard
                isLiked={isLiked}
                AddWishlist={AddWishlist}
                setModalOpen={setModalOpen}
                CartItems={CartItems}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                Cartloader={Cartloader}
                items={items}
                CartItems={CartItems}
                getData={getData}
              />
            }
          />
          <Route path="/wishlist" element={<Wishlist getData={getData} wishlistNum={getWishlist}/>} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
