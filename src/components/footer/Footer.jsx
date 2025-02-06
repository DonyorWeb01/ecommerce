import React from 'react'
import { CiTwitter } from 'react-icons/ci'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { GoPaperAirplane } from 'react-icons/go'
import './Footer.scss'

function Footer() {
  return (
    <div>
    <div className='footer'>
        <div className="container">
        <ul className='footerMain'>
      <li className='one'>
            <h1>Exclusive</h1>
            <h2>Subscribe</h2>
            <p>Get 10% off your first order</p>
            <form action="">
                <input type="text" placeholder='Enter your email'/>
                <GoPaperAirplane />
            </form>
        </li>
        <li>
            <h2>Support</h2>
            <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
        </li>
        <li>
            <h2>Account</h2>
            <p>My Account</p>
            <p>Login / Register</p>
            <p>Cart</p>
            <p>Wishlist</p>
            <p>Shop</p>
        </li>
        <li>
            <h2>Quick Link</h2>
            <p>Privacy Policy</p>
            <p>Terms Of Use</p>
            <p>FAQ</p>
            <p>Contact</p>
        </li>
        <li className='five'>
            <h2>Download App</h2>
            <p>Save $3 with App New User Only</p>
            <div className="appQR">
                <img src="../public/images/Qrcode 1.png" alt="" />
                <div className="apps">
                    <button>
                        <img src="../public/images/playMarket.png" alt="" />
                    </button>
                    <button>
                        <img src="../public/images/appstore.png" alt="" />
                    </button>
                </div>
            </div>
            <div className="btns">
                <button>
                <FaFacebookF />
                </button>
                <button>
                <CiTwitter />
                </button>
                <button>
                <FaInstagram />
                </button>
                <button>
                <FaLinkedinIn />
                </button>
            </div>
        </li>
      </ul>
        </div>
    </div>
    <div className="footerEnd">
        <div className="container">
        <p><span>©</span>Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
