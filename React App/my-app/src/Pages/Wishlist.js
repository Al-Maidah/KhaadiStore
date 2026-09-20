import React, { useState, useEffect } from 'react';
import { useWishlist } from '../Components/Common/WishlistContext';
import { useCart } from '../Components/Common/CartContext';
import { useAuth } from '../Components/Common/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { login, register, user } = useAuth();
  useEffect(() => {
    document.title = "My Wishlist | Saved Items";
  }, []);
  const [isSignUp, setIsSignUp] = useState(false);

  // Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Separate states for Newsletter (Sign Up) and Remember Me (Login)
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});

  const handleSwitchMode = (signUpState) => {
    setIsSignUp(signUpState);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';

    if (isSignUp) {
      if (!firstName.trim()) newErrors.firstName = 'First Name is required.';
      if (!lastName.trim()) newErrors.lastName = 'Last Name is required.';
      if (!confirmEmail.trim()) newErrors.confirmEmail = 'Confirm Email is required.';
      if (!confirmPassword) newErrors.confirmPassword = 'Confirm Password is required.';

      const nameRegex = /^[A-Za-z\s]+$/;
      if (firstName.trim() && !nameRegex.test(firstName.trim())) {
        newErrors.firstName = 'First name cannot contain numbers or special characters.';
      }
      if (lastName.trim() && !nameRegex.test(lastName.trim())) {
        newErrors.lastName = 'Last name cannot contain numbers or special characters.';
      }

      if (email && confirmEmail && email.trim().toLowerCase() !== confirmEmail.trim().toLowerCase()) {
        newErrors.confirmEmail = 'Email addresses do not match.';
      }

      if (password && password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long.';
      }
      if (password && confirmPassword && password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const signedIn = isSignUp
          ? await register({
              firstName,
              lastName,
              email,
              password,
              isSubscribed: subscribeNewsletter,
            })
          : await login({ email, password });
        navigate('/account', { state: { user: signedIn } });
      } catch (err) {
        setErrors({ email: err.message || 'Unable to authenticate. Please try again.' });
      }
    }
  };

  return (
    <div className="wishlist-page-container">
      <div className="guest-wishlist-columns">
        
        {/* LEFT COLUMN */}
        <div className="wishlist-content-left">
          <p className="wishlist-notice-banner">
            If you are not signed in, your wishlist items will get removed at the end of this session
          </p>

          {/* Only render items when wishlist is not empty */}
          {wishlist.length > 0 && (
            <div className="wishlist-items-grid">
              {wishlist.map((product) => (
                <div key={product.id} className="wishlist-card">
                  
                  {/* Image & Overlays Wrapper */}
                  <div className="wishlist-img-wrapper" style={{ position: "relative", width: "100%", height: "350px", background: "#f4f4f4", overflow: "hidden" }}>
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                    />
                    
                    {/* Remove/Heart Button (Top Right) */}
                    <button
                      className="wishlist-remove-btn"
                      onClick={() => toggleWishlist(product)}
                      aria-label="Remove from Wishlist"
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        background: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#222" stroke="#222" strokeWidth="1.8">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </button>

                    {/* Quick ADD Button (Bottom Left) */}
                    <button
                      onClick={() => addToCart(product)}
                      style={{
                        position: "absolute",
                        bottom: "12px",
                        left: "12px",
                        background: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "20px",
                        padding: "8px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                        fontWeight: "600",
                        letterSpacing: "0.5px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                      }}
                    >
                      <ShoppingBag size={14} />
                      ADD
                    </button>
                  </div>
                  
                  {/* Product Details Section */}
                  <div className="wishlist-card-details" style={{ padding: "12px 0 0 0" }}>
                    <p className="product-category" style={{ fontSize: "11px", color: "#666", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                      {product.category || "Embroidered"}
                    </p>
                    <h4 className="product-title" style={{ fontSize: "14px", fontWeight: "400", color: "#111", margin: "0 0 6px 0" }}>
                      {product.title}
                    </h4>
                    <span className="sale-price" style={{ fontSize: "14px", fontWeight: "600", color: "#111" }}>
                      {typeof (product.salePrice || product.price) === 'number'
                        ? `PKR ${(product.salePrice || product.price).toLocaleString()}`
                        : (product.salePrice || product.price || '')}
                    </span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        {user ? (
          <div className="wishlist-login-card">
            <h2>WELCOME BACK</h2>
            <p className="login-subtitle">You are signed in as {user.email}</p>
            <button type="button" className="login-submit-btn" onClick={() => navigate('/account')}>
              GO TO ACCOUNT
            </button>
          </div>
        ) : (
        <div className="wishlist-login-card">
          <h2>WELCOME</h2>
          <p className="login-subtitle">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {isSignUp ? (
              <>
                <div className="form-group-floating">
                  <input
                    type="text"
                    className={errors.firstName ? 'is-invalid' : ''}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder=" "
                  />
                  <label>First Name <span className="required-star">*</span></label>
                  {errors.firstName && <span className="field-error-text">{errors.firstName}</span>}
                </div>

                <div className="form-group-floating">
                  <input
                    type="text"
                    className={errors.lastName ? 'is-invalid' : ''}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder=" "
                  />
                  <label>Last Name <span className="required-star">*</span></label>
                  {errors.lastName && <span className="field-error-text">{errors.lastName}</span>}
                </div>

                <div className="form-group-floating">
                  <input
                    type="email"
                    className={errors.email ? 'is-invalid' : ''}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                  />
                  <label>Email <span className="required-star">*</span></label>
                  {errors.email && <span className="field-error-text">{errors.email}</span>}
                </div>

                <div className="form-group-floating">
                  <input
                    type="email"
                    className={errors.confirmEmail ? 'is-invalid' : ''}
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder=" "
                  />
                  <label>Confirm Email <span className="required-star">*</span></label>
                  {errors.confirmEmail && <span className="field-error-text">{errors.confirmEmail}</span>}
                </div>

                <div className="form-group-floating password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={errors.password ? 'is-invalid' : ''}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                  />
                  <label>Password <span className="required-star">*</span></label>
                  <button type="button" className="eye-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  {errors.password && <span className="field-error-text">{errors.password}</span>}
                </div>

                <div className="form-group-floating password-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={errors.confirmPassword ? 'is-invalid' : ''}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder=" "
                  />
                  <label>Confirm Password <span className="required-star">*</span></label>
                  <button type="button" className="eye-toggle-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  {errors.confirmPassword && <span className="field-error-text">{errors.confirmPassword}</span>}
                </div>

                {/* SIGN UP: Newsletter Checkbox */}
                <div className="login-options-row">
                  <label className="remember-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={subscribeNewsletter} 
                      onChange={(e) => setSubscribeNewsletter(e.target.checked)} 
                    />
                    <span>Sign in for newsletter</span>
                  </label>
                </div>

                <button type="submit" className="login-submit-btn">SIGN UP</button>
                
                <p className="terms-disclaimer-text">
                  By clicking "Sign Up" you agree to the Khaadi terms and conditions. To see how we may use your information, take a look at our privacy policy.
                </p>

                <div className="signup-footer-link">
                  <span>Already have an account? </span>
                  <button type="button" className="switch-auth-btn" onClick={() => handleSwitchMode(false)}>Sign In</button>
                </div>
              </>
            ) : (
              <>
                <div className="form-group-floating">
                  <input
                    type="email"
                    className={errors.email ? 'is-invalid' : ''}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=" "
                  />
                  <label>Email <span className="required-star">*</span></label>
                  {errors.email && <span className="field-error-text">{errors.email}</span>}
                </div>

                <div className="form-group-floating password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={errors.password ? 'is-invalid' : ''}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=" "
                  />
                  <label>Password <span className="required-star">*</span></label>
                  <button type="button" className="eye-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  {errors.password && <span className="field-error-text">{errors.password}</span>}
                </div>

                {/* LOGIN: Remember Me Checkbox */}
                <div className="login-options-row">
                  <label className="remember-checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)} 
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" className="forgot-password-link">Forgot Password?</a>
                </div>

                <button type="submit" className="login-submit-btn">LOGIN</button>

                <div className="social-login-divider">
                  <span>OR LOGIN WITH</span>
                </div>

                <div className="social-buttons-wrapper">
                  <button type="button" className="social-btn google" aria-label="Sign in with Google">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  </button>
                </div>

                <div className="signup-footer-link">
                  <span>Don't have account? </span>
                  <button type="button" className="switch-auth-btn" onClick={() => handleSwitchMode(true)}>Sign Up</button>
                </div>
              </>
            )}
          </form>
        </div>
        )}

      </div>
    </div>
  );
}