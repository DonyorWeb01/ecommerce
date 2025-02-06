import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { CiSearch, CiHeart, CiUser, CiLogout } from "react-icons/ci";
import { IoBagRemoveOutline, IoCartOutline, IoClose } from "react-icons/io5";
import { FaLocationDot, FaRegPenToSquare } from 'react-icons/fa6';
import { MdOutlineMail } from 'react-icons/md';
import { TbPassword } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
import { getToken } from '../../pages/services/Token';

function Navbar({ user, getUser, wishListNumber, items}) {

  const [openModal, setOpenModal] = useState(false)
  const [openUserModal, setOpenUserModal] = useState(false)  


  return (
    <div>
      <div className="navbarTop">
        <div className="container">
          <div className="text">
            <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
            <a href="">ShopNow</a>
          </div>
          <select name="" id="">
            <option value="English">English</option>
            <option value="Russia">Russia</option>
            <option value="Dutch">Dutch</option>
          </select>
        </div>
      </div>


      <div className="navbarMain">
        <div className="container">
          <Link to={"/"}><h1>Exclusive</h1></Link>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/contact'}>Contact</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              <Link to={'/Sign'}>Sign Up</Link>
            </li>
          </ul>
          <div className="navbarEnd">
            <form action="">
              <input type="text" placeholder='What are you looking for?' />
              <CiSearch className="searchBtn" />
            </form>
            <div className="btns">
              <Link to={'/wishlist'}><button >
                {wishListNumber?.length>0 && <span>{wishListNumber?.length}</span>}
                <CiHeart />
              </button></Link>
              <Link to={`/cart`}><button>
                {items?.cart_items?.length>0 && <span>{
                  items?.cart_items?.length
                }</span>}
                <IoCartOutline />
              </button></Link>
              {
                user?.id && (<button onClick={() => {
                  setOpenModal(!openModal)
                }}>
                  <CiUser />
                </button>)
              }
              {
                openModal && <div className="userModal">
                  <ul>
                    <li>
                      <p onClick={() => {
                        setOpenUserModal(true);
                        setOpenModal(false);
                      }}><CiUser />   Manage My Account</p>
                    </li>
                    <li>
                      <p><IoBagRemoveOutline />   My Order</p>
                    </li>
                    <li>
                      <p><IoBagRemoveOutline />   My Cancellations</p>
                    </li>
                    <li>
                      <p><IoBagRemoveOutline />   My Reviews</p>
                    </li>
                    <li>
                      <p onClick={() => {
                        localStorage.clear();
                        getUser();
                        setOpenModal(false);
                        CartItems()
                      }}><CiLogout />   Logout</p>
                    </li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {
        openUserModal && <div className="modalUserInfo">
          <ul>
            <div className="btn" onClick={() => {
              setOpenUserModal(false)
            }}><IoClose /></div>
            <li><FaRegUser /> Name: <span>{user.first_name}</span></li>
            <li><FaRegPenToSquare /> LastName: <span>{user.last_name}</span></li>
            <li><MdOutlineMail /> Email: <span>{user.email_or_phone}</span></li>
            <li><TbPassword /> Password: <span> Donyorbek</span></li>
            <li><FaLocationDot /> Address: <span>{user.address}</span></li>
          </ul>
        </div>
      }

      {openUserModal && <div className="overlay"></div>}

      {openModal && <div onClick={() => {
        setOpenModal(!openModal)
      }} className="overlay"></div>}
    </div>
  )
}

export default Navbar
