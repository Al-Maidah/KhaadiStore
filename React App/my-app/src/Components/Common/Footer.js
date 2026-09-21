import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container">
      {/* 1. Top Feature Bar */}
      <div className="footer-top-bar">
        <div className="feature-item">
          <div className="feature-icon-circle">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e06d53" strokeWidth="1.8">
              <rect x="1" y="3" width="15" height="13" rx="2" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="feature-text">
            <h4>SHIPPING CHARGES</h4>
            <p>Starting from Rs. 130</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon-circle">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e06d53" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <div className="feature-text">
            <h4>TRACK YOUR ORDER</h4>
            <p>Check status of your order.</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon-circle">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e06d53" strokeWidth="1.8">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="feature-text">
            <h4>FIND STORES</h4>
            <p>Stores countrywide across Pakistan, UK, UAE, US.</p>
          </div>
        </div>
      </div>

      {/* 2. Need Help Bar */}
      <div className="footer-help-bar">
        <h3>NEED HELP?</h3>
        <a href="#faqs" className="help-faq-link">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>FAQS</span>
        </a>
      </div>

      {/* 3. Main Footer Content */}
      <div className="footer-main">
        <div className="footer-col">
          <h4>HELP</h4>
          <ul>
            <li><a href="#faq">Frequently Asked Questions</a></li>
            <li><a href="#terms">Terms & Conditions</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#disclaimer">Disclaimer</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>MORE FROM KHAADI</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#blogs">Blogs</a></li>
            <li><a href="#care">Cloth Care</a></li>
          </ul>
        </div>

        <div className="footer-col socials-newsletter-col">
          <h4>OUR SOCIALS</h4>
          <div className="social-icons">
            {/* TikTok */}
            <a href="#tiktok" aria-label="TikTok" className="social-btn tiktok">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.886 2.886 2.895 2.895 0 0 1-2.886-2.886 2.895 2.895 0 0 1 2.886-2.886c.287 0 .563.04.828.113V9.387a6.31 6.31 0 0 0-.828-.055 6.338 6.338 0 0 0-6.333 6.338 6.338 6.338 0 0 0 6.333 6.338 6.338 6.338 0 0 0 6.333-6.338V8.6a8.214 8.214 0 0 0 4.773 1.517V6.686z"/>
              </svg>
            </a>
            {/* YouTube */}
            <a href="#youtube" aria-label="YouTube" className="social-btn youtube">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#facebook" aria-label="Facebook" className="social-btn facebook">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#instagram" aria-label="Instagram" className="social-btn instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          <div className="newsletter-section">
            <h4>GET THE LATEST NEWS</h4>
            <form className="newsletter-box" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email Address" required />
              <button type="submit">CONFIRM</button>
            </form>
          </div>
        </div>
      </div>

      {/* 4. Bottom Footer */}
      <div className="footer-bottom">
        <div className="bottom-left">
          <span className="sub-label">100% Safe Checkout</span>
          <div className="payment-badges">
            <span className="card-badge mastercard"></span>
            <span className="card-badge visa">VISA</span>
          </div>
        </div>

        <div className="bottom-center">
          <span className="sub-label">Secured by</span>
          <span className="brand-logo">KHAADI</span>
          <span className="copyright-text">
            Copyright © 2026 Weaves Corporation Limited. All Rights Reserved.
          </span>
          <a href="/admin/login" style={{ display: 'block', marginTop: 8, fontSize: 11, color: '#999', letterSpacing: 1 }}>
            Admin
          </a>
        </div>

        <button className="scroll-top-btn" onClick={scrollToTop} aria-label="Scroll to top">
          <svg width="50" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    </footer>
  );
}