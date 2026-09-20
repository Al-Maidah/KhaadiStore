import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Check, Pencil } from "lucide-react";
import { useCart } from "../Components/Common/CartContext";
import { useAuth } from "../Components/Common/AuthContext";
import { parsePrice, formatPrice } from "../utils/productUtils";
import { api } from "../api/client";

const SHIPPING_METHODS = [
  { id: "fixed", label: "Fixed", description: "4-8 working days", price: 240 },
  {
    id: "next-day",
    label: "Next Day Delivery",
    description: "Next day delivery for orders received before 11:00 AM",
    price: 570,
  },
];

const PAKISTAN_STATES = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad"];
const CITIES = {
  Punjab: ["Lahore", "Rawalpindi", "Faisalabad", "Multan"],
  Sindh: ["Karachi", "Hyderabad", "Sukkur"],
  "Khyber Pakhtunkhwa": ["Peshawar", "Abbottabad"],
  Balochistan: ["Quetta"],
  Islamabad: ["Islamabad"],
};

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState("email");
  const [emailComplete, setEmailComplete] = useState(false);
  const [shippingComplete, setShippingComplete] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [emailError, setEmailError] = useState("");

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    street: "",
    country: "Pakistan",
    state: "",
    city: "",
    shippingMethod: "fixed",
  });
  const [shippingErrors, setShippingErrors] = useState({});
  const [showShippingErrors, setShowShippingErrors] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [punchMobile, setPunchMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    document.title = "Secure Checkout | Order Details";
    if (user?.email && !email) setEmail(user.email);
    if (user?.firstName && !shipping.firstName) {
      setShipping((prev) => ({
        ...prev,
        firstName: prev.firstName || user.firstName || "",
        lastName: prev.lastName || user.lastName || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      navigate("/readytowear");
    }
  }, [cart, navigate, orderPlaced]);

  const subtotal = cart.reduce(
    (sum, item) => sum + parsePrice(item.price || item.salePrice) * item.qty,
    0
  );
  const shippingCost = emailComplete
    ? SHIPPING_METHODS.find((m) => m.id === shipping.shippingMethod)?.price || 0
    : 0;
  const total = subtotal + shippingCost;

  const handleEmailSubmit = () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setEmailComplete(true);
    setEditingEmail(false);
    setActiveStep("shipping");
  };

  const validateShipping = () => {
    const errors = {};
    if (!shipping.firstName.trim()) errors.firstName = "Please fill out this field.";
    if (!shipping.lastName.trim()) errors.lastName = "Please fill out this field.";
    if (!shipping.mobile.trim()) errors.mobile = "Please fill out this field.";
    if (!shipping.street.trim()) errors.street = "Please fill out this field.";
    if (!shipping.state) errors.state = "Please select an item in the list.";
    if (!shipping.city) errors.city = "Please select an item in the list.";
    return errors;
  };

  const handleShippingSubmit = () => {
    const errors = validateShipping();
    setShippingErrors(errors);
    setShowShippingErrors(true);
    if (Object.keys(errors).length > 0) return;

    setShippingComplete(true);
    setActiveStep("payment");
  };

  const handleStepClick = (step) => {
    if (step === "email") {
      setActiveStep("email");
      if (emailComplete) setEditingEmail(true);
      return;
    }
    if (step === "shipping") {
      if (!emailComplete) return;
      setActiveStep("shipping");
      setEditingEmail(false);
      return;
    }
    if (step === "payment") {
      if (!shippingComplete) return;
      setActiveStep("payment");
    }
  };

  const handleProceed = async () => {
    if (activeStep === "email" && !emailComplete) {
      handleEmailSubmit();
    } else if (activeStep === "shipping" && !shippingComplete) {
      handleShippingSubmit();
    } else if (activeStep === "payment") {
      try {
        setOrderError("");
        await api.createOrder({
          userId: user?.id || null,
          email,
          newsletter,
          shipping,
          paymentMethod,
          items: cart,
          subtotal,
          shippingCost,
          total,
        });
        setOrderPlaced(true);
        clearCart();
        alert("Order placed successfully!");
        navigate("/");
      } catch (err) {
        setOrderError(err.message || "Could not place order. Please try again.");
      }
    }
  };

  const proceedLabel =
    activeStep === "payment"
      ? "PLACE YOUR ORDER"
      : activeStep === "shipping"
        ? "PROCEED TO PAYMENT"
        : "PROCEED TO SHIPPING";

  const cityOptions = shipping.state ? CITIES[shipping.state] || [] : [];

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-form-column">
          {/* EMAIL STEP */}
          <div className={`checkout-section ${activeStep === "email" ? "active" : ""}`}>
            <div
              className="checkout-section-header"
              onClick={() => handleStepClick("email")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleStepClick("email")}
            >
              <div className="checkout-section-title">
                {emailComplete && !editingEmail ? (
                  <span className="checkout-check-icon"><Check size={14} strokeWidth={3} /></span>
                ) : (
                  <span className="checkout-step-num">(1)</span>
                )}
                <span>ENTER EMAIL</span>
              </div>
              {emailComplete && !editingEmail && (
                <span
                  className="checkout-edit-btn"
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingEmail(true);
                    setActiveStep("email");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.stopPropagation();
                      setEditingEmail(true);
                      setActiveStep("email");
                    }
                  }}
                >
                  <Pencil size={14} />
                </span>
              )}
              {activeStep === "email" && (
                <ChevronUp size={18} className="checkout-chevron" />
              )}
              {activeStep !== "email" && !emailComplete && (
                <ChevronDown size={18} className="checkout-chevron" />
              )}
            </div>

            {activeStep === "email" && (
              <div className="checkout-section-body">
                {!emailComplete || editingEmail ? (
                  <>
                    <p className="checkout-signin-text">
                      Already have an account? <a href="/account">SIGN IN</a>
                    </p>
                    <div className="checkout-field">
                      <label>Email <span className="required">*</span></label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                        className="checkout-input"
                      />
                      {emailError && <p className="checkout-error">{emailError}</p>}
                    </div>
                    <label className="checkout-checkbox">
                      <input
                        type="checkbox"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                      />
                      <span>Subscribe to our newsletter for the latest updates and offers.</span>
                    </label>
                  </>
                ) : (
                  <>
                    <p className="checkout-completed-email">{email}</p>
                    <label className="checkout-checkbox">
                      <input type="checkbox" checked={newsletter} readOnly />
                      <span>Subscribe to our newsletter for the latest updates and offers.</span>
                    </label>
                  </>
                )}
              </div>
            )}

            {emailComplete && !editingEmail && activeStep !== "email" && (
              <div className="checkout-section-summary">
                <p className="checkout-completed-email">{email}</p>
                <label className="checkout-checkbox">
                  <input type="checkbox" checked={newsletter} readOnly />
                  <span>Subscribe to our newsletter for the latest updates and offers.</span>
                </label>
              </div>
            )}
          </div>

          {/* SHIPPING STEP */}
          <div
            className={`checkout-section ${activeStep === "shipping" ? "active" : ""} ${
              !emailComplete ? "locked" : ""
            }`}
          >
            <button
              type="button"
              className="checkout-section-header"
              onClick={() => handleStepClick("shipping")}
              disabled={!emailComplete}
            >
              <div className="checkout-section-title">
                {shippingComplete && activeStep !== "shipping" ? (
                  <span className="checkout-check-icon"><Check size={14} strokeWidth={3} /></span>
                ) : (
                  <span className="checkout-step-num">(2)</span>
                )}
                <span>SHIPPING</span>
              </div>
              {activeStep === "shipping" ? (
                <ChevronUp size={18} className="checkout-chevron" />
              ) : (
                <ChevronDown size={18} className="checkout-chevron" />
              )}
            </button>

            {activeStep === "shipping" && (
              <div className="checkout-section-body">
                <h3 className="checkout-subheading">CUSTOMER DETAILS</h3>
                <div className="checkout-form-grid">
                  <div className="checkout-field">
                    <label>First Name <span className="required">*</span></label>
                    <input
                      type="text"
                      value={shipping.firstName}
                      onChange={(e) =>
                        setShipping({ ...shipping, firstName: e.target.value })
                      }
                      className="checkout-input"
                    />
                    {showShippingErrors && shippingErrors.firstName && (
                      <p className="checkout-error">{shippingErrors.firstName}</p>
                    )}
                  </div>
                  <div className="checkout-field">
                    <label>Last Name <span className="required">*</span></label>
                    <input
                      type="text"
                      value={shipping.lastName}
                      onChange={(e) =>
                        setShipping({ ...shipping, lastName: e.target.value })
                      }
                      className="checkout-input"
                    />
                    {showShippingErrors && shippingErrors.lastName && (
                      <p className="checkout-error">{shippingErrors.lastName}</p>
                    )}
                  </div>
                  <div className="checkout-field full-width">
                    <label>Mobile Number <span className="required">*</span></label>
                    <input
                      type="tel"
                      value={shipping.mobile}
                      onChange={(e) =>
                        setShipping({ ...shipping, mobile: e.target.value })
                      }
                      className="checkout-input"
                    />
                    {showShippingErrors && shippingErrors.mobile && (
                      <p className="checkout-error">{shippingErrors.mobile}</p>
                    )}
                  </div>
                  <div className="checkout-field full-width">
                    <label>Street Address <span className="required">*</span></label>
                    <input
                      type="text"
                      value={shipping.street}
                      onChange={(e) =>
                        setShipping({ ...shipping, street: e.target.value })
                      }
                      className="checkout-input"
                    />
                    {showShippingErrors && shippingErrors.street && (
                      <p className="checkout-error">{shippingErrors.street}</p>
                    )}
                  </div>
                  <div className="checkout-field">
                    <label>Country <span className="required">*</span></label>
                    <select
                      value={shipping.country}
                      onChange={(e) =>
                        setShipping({ ...shipping, country: e.target.value })
                      }
                      className="checkout-select"
                    >
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div>
                  <div className="checkout-field">
                    <label>State/Province <span className="required">*</span></label>
                    <select
                      value={shipping.state}
                      onChange={(e) =>
                        setShipping({ ...shipping, state: e.target.value, city: "" })
                      }
                      className="checkout-select"
                    >
                      <option value="">Select</option>
                      {PAKISTAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {showShippingErrors && shippingErrors.state && (
                      <p className="checkout-error">{shippingErrors.state}</p>
                    )}
                  </div>
                  <div className="checkout-field full-width">
                    <label>City <span className="required">*</span></label>
                    <select
                      value={shipping.city}
                      onChange={(e) =>
                        setShipping({ ...shipping, city: e.target.value })
                      }
                      className="checkout-select"
                    >
                      <option value="">Select</option>
                      {cityOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    {showShippingErrors && shippingErrors.city && (
                      <p className="checkout-error">{shippingErrors.city}</p>
                    )}
                  </div>
                </div>

                <h3 className="checkout-subheading">SHIPPING METHOD</h3>
                <div className="shipping-methods">
                  {SHIPPING_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`shipping-method-card ${
                        shipping.shippingMethod === method.id ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={shipping.shippingMethod === method.id}
                        onChange={() =>
                          setShipping({ ...shipping, shippingMethod: method.id })
                        }
                      />
                      <div className="shipping-method-info">
                        <strong>{method.label}</strong>
                        <span>{method.description}</span>
                      </div>
                      <span className="shipping-method-price">
                        {formatPrice(method.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {shippingComplete && activeStep !== "shipping" && (
              <div className="checkout-section-summary">
                <p>{shipping.firstName} {shipping.lastName}</p>
                <p>{shipping.street}</p>
                <p>{shipping.city}, {shipping.state}, {shipping.country}</p>
                <p>{shipping.mobile}</p>
              </div>
            )}
          </div>

          {/* PAYMENT STEP */}
          <div
            className={`checkout-section ${activeStep === "payment" ? "active" : ""} ${
              !shippingComplete ? "locked" : ""
            }`}
          >
            <button
              type="button"
              className="checkout-section-header"
              onClick={() => handleStepClick("payment")}
              disabled={!shippingComplete}
            >
              <div className="checkout-section-title">
                <span className="checkout-step-num">(3)</span>
                <span>PAYMENT</span>
              </div>
              {activeStep === "payment" ? (
                <ChevronUp size={18} className="checkout-chevron" />
              ) : (
                <ChevronDown size={18} className="checkout-chevron" />
              )}
            </button>

            {activeStep === "payment" && (
              <div className="checkout-section-body">
                <p className="checkout-payment-note">
                  Please select one of the point/voucher redemption methods. Points/vouchers are
                  not applicable on shipping or FBR charges as per our privacy policy. For more
                  information please visit our FAQ Page
                </p>

                <div className="punch-points-box">
                  <h4>PUNCH POINTS</h4>
                  <div className="punch-points-row">
                    <div className="checkout-field flex-grow">
                      <label>Mobile number <span className="required">*</span></label>
                      <input
                        type="tel"
                        value={punchMobile}
                        onChange={(e) => setPunchMobile(e.target.value)}
                        className="checkout-input"
                      />
                    </div>
                    <button type="button" className="checkout-secondary-btn">
                      REQUEST OTP
                    </button>
                  </div>
                  <div className="checkout-field">
                    <label>Enter OTP <span className="required">*</span></label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="checkout-input"
                    />
                  </div>
                  <div className="punch-points-actions">
                    <button type="button" className="checkout-secondary-btn dark">
                      VERIFY OTP
                    </button>
                  </div>
                </div>

                <p className="checkout-payment-note">Please select one of the payment methods</p>

                <label
                  className={`payment-method-card ${
                    paymentMethod === "cod" ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="payment-method-info">
                    <strong>COD</strong>
                    <span>PAYMENT WILL BE COLLECTED AT THE TIME OF DELIVERY</span>
                  </div>
                  <span className="payment-cod-icon">💵</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* BAG SUMMARY */}
        <div className="checkout-bag-column">
          <div className="checkout-bag-card">
            <div className="checkout-bag-header">
              <span>Your Bag ({cart.reduce((s, i) => s + i.qty, 0)})</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="checkout-bag-items">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="checkout-bag-item"
                >
                  <img src={item.image} alt={item.title} />
                  <div className="checkout-bag-item-details">
                    <p className="checkout-bag-item-title">{item.title}</p>
                    <p className="checkout-bag-item-price">
                      {item.price || item.salePrice}
                    </p>
                    {item.size && <p>Size {item.size}</p>}
                    <p>Qty {item.qty}</p>
                  </div>
                </div>
              ))}
            </div>

            {orderError && (
              <p className="checkout-error" style={{ marginBottom: 12 }}>{orderError}</p>
            )}
            <button
              type="button"
              className="checkout-proceed-btn"
              onClick={handleProceed}
            >
              {proceedLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}