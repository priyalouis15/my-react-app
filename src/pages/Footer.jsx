import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-column">
          <h4>Product Categories</h4>
          <ul>
            <li>Smartphones</li>
            <li>Laptops</li>
            <li>DSLR Cameras</li>
            <li>Televisions</li>
            <li>Air Conditioners</li>
            <li>Refrigerator</li>
            <li>Kitchen Appliances</li>
            <li>Accessories</li>
            <li>Personal Care & Grooming</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Site Info</h4>
          <ul>
            <li>About Reliance Digital</li>
            <li>resQ Services</li>
            <li>Site Map</li>
            <li>Gift Cards</li>
            <li>Corporate Enquiries</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Resource Center</h4>
          <ul>
            <li>Buying Guides</li>
            <li>Manuals</li>
            <li>How To's</li>
            <li>Compare Products</li>
            <li>Nearest Store</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Policies</h4>
          <ul>
            <li>Terms of Use</li>
            <li>FAQs</li>
            <li>Cancellation & Returns</li>
            <li>Pricing & Payments</li>
            <li>Privacy Policy</li>
            <li>E-waste Recycling</li>
            <li>EMI & Cashback</li>
            <li>RelianceOne Loyalty</li>
            <li>Caution Notice</li>
          </ul>
        </div>

      </div>

      <div className="footer-middle">

        <div className="app-download">
          <img
            src="https://cdn-icons-png.flaticon.com/512/732/732208.png"
            alt="mobile"
            className="mobile-icon"
          />

          <p>Experience Reliance digital app on mobile</p>

          <div className="store-buttons">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
            />
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="App Store"
            />
          </div>
        </div>

        <div className="social">
          <h4>Follow us</h4>
          <div className="social-icons">
            <span>📘</span>
            <span>❌</span>
            <span>▶</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          Product prices, offers and availability are subject to change from
          time to time. All prices are inclusive of taxes. Product colours &
          images are only for illustration.
        </p>

        <p>Copyright © 2023 Reliance Digital. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;