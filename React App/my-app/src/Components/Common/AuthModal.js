// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // export default function AuthModal({ isOpen, onClose }) {
// //   const navigate = useNavigate();
// //   const [isSignUp, setIsSignUp] = useState(false);
  
// //   const [firstName, setFirstName] = useState('');
// //   const [lastName, setLastName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isSubscribed, setIsSubscribed] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});

// //   if (!isOpen) return null;

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     const newErrors = {};
// //     if (!email.trim()) newErrors.email = 'Email is required.';
// //     if (!password) newErrors.password = 'Password is required.';
// //     if (isSignUp && !firstName.trim()) newErrors.firstName = 'First name is required.';
    
// //     setErrors(newErrors);
    
// //     if (Object.keys(newErrors).length === 0) {
// //       onClose();
      
// //       // Package user details to pass via route state
// //       const userData = {
// //         firstName: firstName || email.split('@')[0],
// //         fullName: isSignUp ? `${firstName} ${lastName}`.trim() : 'Al-Maidah Nadeem',
// //         email: email,
// //         isSubscribed: isSubscribed
// //       };

// //       // Navigate to the account page and pass user state
// //       navigate('/account', { state: { user: userData } });
// //     }
// //   };

// //   return (
// //     <div className="auth-modal-overlay" style={{
// //       position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
// //       backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
// //     }}>
// //       <div className="auth-modal-content" style={{
// //         background: '#fff', padding: '40px 30px', borderRadius: '12px', width: '460px', position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
// //       }}>
// //         <button onClick={onClose} style={{ 
// //           position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' 
// //         }}>✕</button>
        
// //         <h2 style={{ textAlign: 'center', fontWeight: '600', letterSpacing: '1px', marginBottom: '8px' }}>WELCOME</h2>
// //         <p style={{ textAlign: 'center', color: '#666', fontSize: '14px', marginBottom: '25px' }}>
// //           {isSignUp ? "Create your account" : "Sign in to your account"}
// //         </p>

// //         <form onSubmit={handleSubmit} noValidate>
// //           {isSignUp && (
// //             <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
// //               <div style={{ flex: 1 }}>
// //                 <input
// //                   type="text"
// //                   value={firstName}
// //                   onChange={(e) => setFirstName(e.target.value)}
// //                   placeholder="First Name *"
// //                   style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
// //                 />
// //               </div>
// //               <div style={{ flex: 1 }}>
// //                 <input
// //                   type="text"
// //                   value={lastName}
// //                   onChange={(e) => setLastName(e.target.value)}
// //                   placeholder="Last Name"
// //                   style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           <div style={{ marginBottom: '15px' }}>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Email *"
// //               style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
// //             />
// //             {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
// //           </div>

// //           <div style={{ marginBottom: '20px', position: 'relative' }}>
// //             <input
// //               type={showPassword ? 'text' : 'password'}
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder="Password *"
// //               style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}
// //             />
// //             <button 
// //               type="button" 
// //               onClick={() => setShowPassword(!showPassword)}
// //               style={{ position: 'absolute', right: '12px', top: '14px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px' }}
// //             >
// //               {showPassword ? 'Hide' : 'Show'}
// //             </button>
// //             {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
// //           </div>

// //           {isSignUp && (
// //             <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
// //               <input 
// //                 type="checkbox" 
// //                 id="newsletter" 
// //                 checked={isSubscribed} 
// //                 onChange={(e) => setIsSubscribed(e.target.checked)} 
// //               />
// //               <label htmlFor="newsletter">Subscribe to newsletter</label>
// //             </div>
// //           )}

// //           <button type="submit" style={{ 
// //             width: '100%', padding: '14px', background: '#1c1c1c', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: '600', letterSpacing: '1px', borderRadius: '4px' 
// //           }}>
// //             {isSignUp ? 'SIGN UP' : 'LOGIN'}
// //           </button>

// //           <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#444' }}>
// //             <span>{isSignUp ? "Already have an account? " : "Don't have an account? "}</span>
// //             <button 
// //               type="button" 
// //               onClick={() => setIsSignUp(!isSignUp)} 
// //               style={{ background: 'none', border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }}
// //             >
// //               {isSignUp ? 'Sign In' : 'Sign Up'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AuthModal({ isOpen, onClose }) {
//   const navigate = useNavigate();
//   const [isSignUp, setIsSignUp] = useState(false);
  
//   // Form fields matching your exact images
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [confirmEmail, setConfirmEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   if (!isOpen) return null;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onClose();
//     navigate('/account', { 
//       state: { 
//         user: { 
//           firstName: firstName || 'AL-MAIDAH',
//           fullName: isSignUp ? `${firstName} ${lastName}`.trim() : 'Al-Maidah Nadeem',
//           email: email || 'almaidahnadeem06@gmail.com',
//           isSubscribed: isSubscribed 
//         } 
//       } 
//     });
//   };

//   return (
//     <div style={{
//       position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', 
//       alignItems: 'center', zIndex: 9999, fontFamily: 'Arial, sans-serif'
//     }}>
//       <div style={{
//         backgroundColor: '#fff', borderRadius: '16px', width: '480px', 
//         maxHeight: '85vh', display: 'flex', flexDirection: 'column',
//         position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
//       }}>
//         {/* Close Button */}
//         <button onClick={onClose} style={{
//           position: 'absolute', top: '20px', right: '20px', background: 'none', 
//           border: 'none', fontSize: '18px', cursor: 'pointer', color: '#666', zIndex: 10
//         }}>✕</button>

//         {/* Fixed Header */}
//         <div style={{ padding: '30px 30px 10px 30px', textAlign: 'center', backgroundColor: '#fff', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
//           <h2 style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '24px', marginBottom: '8px', color: '#1a1a1a' }}>WELCOME</h2>
//           <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>{isSignUp ? "Create your account" : "Sign in to your account"}</p>
//         </div>

//         {/* Scrollable Form Body */}
//         <div style={{ padding: '10px 30px 30px 30px', overflowY: 'auto', flex: 1 }}>
//           <form onSubmit={handleSubmit}>
            
//             {/* SIGN-UP FIELDS */}
//             {isSignUp && (
//               <>
//                 <div style={{ marginBottom: '16px' }}>
//                   <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px' }}>
//                     First Name <span style={{ color: '#d32f2f' }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f3f6fb', border: '1px solid #dce2ed', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
//                     required
//                   />
//                 </div>

//                 <div style={{ marginBottom: '16px' }}>
//                   <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px' }}>
//                     Last Name <span style={{ color: '#d32f2f' }}>*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f3f6fb', border: '1px solid #dce2ed', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
//                     required
//                   />
//                 </div>
//               </>
//             )}

//             {/* EMAIL FIELD */}
//             <div style={{ marginBottom: '16px' }}>
//               <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px' }}>
//                 Email <span style={{ color: '#d32f2f' }}>*</span>
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f3f6fb', border: '1px solid #dce2ed', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
//                 required
//               />
//             </div>

//             {/* CONFIRM EMAIL (Sign up only) */}
//             {isSignUp && (
//               <div style={{ marginBottom: '16px' }}>
//                 <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px' }}>
//                   Confirm Email <span style={{ color: '#d32f2f' }}>*</span>
//                 </label>
//                 <input
//                   type="email"
//                   value={confirmEmail}
//                   onChange={(e) => setConfirmEmail(e.target.value)}
//                   style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f3f6fb', border: '1px solid #dce2ed', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
//                   required
//                 />
//               </div>
//             )}

//             {/* PASSWORD FIELD */}
//             <div style={{ marginBottom: '16px', position: 'relative' }}>
//               <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px' }}>
//                 Password <span style={{ color: '#d32f2f' }}>*</span>
//               </label>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f3f6fb', border: '1px solid #dce2ed', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
//                 required
//               />
//               <span 
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={{ position: 'absolute', right: '14px', top: '36px', cursor: 'pointer', fontSize: '14px' }}
//               >
//                 {showPassword ? '👁️‍🗨️' : '👁️'}
//               </span>
//             </div>

//             {isSignUp && (
//               <div style={{ marginBottom: '16px', position: 'relative' }}>
//                 <label style={{ display: 'block', fontSize: '12px', color: '#555', marginBottom: '6px' }}>
//                   Confirm Password <span style={{ color: '#d32f2f' }}>*</span>
//                 </label>
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f3f6fb', border: '1px solid #dce2ed', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
//                   required
//                 />
//                 <span 
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   style={{ position: 'absolute', right: '14px', top: '36px', cursor: 'pointer', fontSize: '14px' }}
//                 >
//                   {showConfirmPassword ? '👁️‍🗨️' : '👁️'}
//                 </span>
//               </div>
//             )}

//             {/* EXTRA OPTIONS (Remember me for Login / Newsletter for Sign Up) */}
//             {!isSignUp ? (
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
//                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#333' }}>
//                   <input 
//                     type="checkbox" 
//                     checked={rememberMe} 
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     style={{ width: '15px', height: '15px', accentColor: '#1c1c1c' }}
//                   />
//                   Remember me
//                 </label>
//                 <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ color: '#333', textDecoration: 'underline' }}>
//                   Forgot Password?
//                 </a>
//               </div>
//             ) : (
//               <div style={{ marginBottom: '20px', fontSize: '13px' }}>
//                 <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#333' }}>
//                   <input 
//                     type="checkbox" 
//                     checked={isSubscribed} 
//                     onChange={(e) => setIsSubscribed(e.target.checked)}
//                     style={{ width: '15px', height: '15px', accentColor: '#1c1c1c' }}
//                   />
//                   Sign Up for Newsletter
//                 </label>
//                 <p style={{ fontSize: '11px', color: '#777', marginTop: '8px', lineHeight: '1.4' }}>
//                   By clicking "Sign Up" you agree to the Khaadi terms and conditions. To see how we may use your information, take a look at our privacy policy.
//                 </p>
//               </div>
//             )}

//             {/* SUBMIT BUTTON */}
//             <button type="submit" style={{
//               width: '100%', padding: '14px', backgroundColor: '#1c1c1c', color: '#fff', 
//               border: 'none', borderRadius: '4px', fontWeight: '600', letterSpacing: '1px', 
//               cursor: 'pointer', fontSize: '13px'
//             }}>
//               {isSignUp ? 'SIGN UP' : 'LOGIN'}
//             </button>

//             {/* LOGIN EXTRAS (Divider & Socials) */}
//             {!isSignUp && (
//               <>
//                 <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', color: '#ccc', fontSize: '11px' }}>
//                   <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
//                   <span style={{ padding: '0 12px', color: '#777', fontWeight: '600', letterSpacing: '0.5px' }}>OR LOGIN WITH</span>
//                   <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
//                 </div>

//                 <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
//                   <button type="button" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #dcdcdc', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#ea4335' }}>G</button>
//                   <button type="button" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #dcdcdc', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#1877f2' }}>f</button>
//                 </div>
//               </>
//             )}

//             {/* SWITCH MODE LINK */}
//             <div style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '20px' }}>
//               {isSignUp ? "Already have an account? " : "Don't have an account? "}
//               <button 
//                 type="button" 
//                 onClick={() => setIsSignUp(!isSignUp)} 
//                 style={{ background: 'none', border: 'none', color: '#111', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '13px' }}
//               >
//                 {isSignUp ? 'Sign In' : 'Sign Up'}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  // Visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error state for restrictions
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (isSignUp) {
      if (email !== confirmEmail) {
        setErrorMessage('Email addresses do not match.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      if (!firstName.trim()) {
        setErrorMessage('First name is required.');
        return;
      }
    }

    try {
      const payload = {
        firstName: firstName || email.split('@')[0],
        lastName,
        email,
        password,
        isSubscribed,
      };
      const user = isSignUp ? await register(payload) : await login({ email, password });
      onClose();
      navigate('/account', { state: { user } });
    } catch (err) {
      setErrorMessage(err.message || 'Unable to authenticate. Please try again.');
    }
  };

  // Clean SVG Icons for Eye Toggle
  const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', zIndex: 9999, fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '12px', width: '460px', 
        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
        position: 'relative', boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px', background: 'none', 
          border: 'none', fontSize: '18px', cursor: 'pointer', color: '#333', zIndex: 10
        }}>✕</button>

        {/* Modal Header */}
        <div style={{ padding: '30px 30px 10px 30px', textAlign: 'center', backgroundColor: '#fff', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}>
          <h2 style={{ fontWeight: '700', letterSpacing: '1px', fontSize: '22px', marginBottom: '6px', color: '#111' }}>WELCOME</h2>
          <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>{isSignUp ? "Create your account" : "Sign in to your account"}</p>
        </div>

        {/* Error Notification Banner if restriction fails */}
        {errorMessage && (
          <div style={{ margin: '0 30px', padding: '10px', backgroundColor: '#f8d7da', color: '#721c24', fontSize: '12px', borderRadius: '4px', textAlign: 'center' }}>
            {errorMessage}
          </div>
        )}

        {/* Scrollable Body */}
        <div style={{ padding: '20px 30px 30px 30px', overflowY: 'auto', flex: 1 }}>
          <form onSubmit={handleSubmit} noValidate>
            
            {/* SIGN-UP EXTRA FIELDS */}
            {isSignUp && (
              <>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#444', marginBottom: '6px', fontWeight: '500' }}>
                    First Name <span style={{ color: '#d32f2f' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f4f6fc', border: '1px solid #d1d9e6', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#444', marginBottom: '6px', fontWeight: '500' }}>
                    Last Name <span style={{ color: '#d32f2f' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f4f6fc', border: '1px solid #d1d9e6', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                    required
                  />
                </div>
              </>
            )}

            {/* EMAIL */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#444', marginBottom: '6px', fontWeight: '500' }}>
                Email <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f4f6fc', border: '1px solid #d1d9e6', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                required
              />
            </div>

            {/* CONFIRM EMAIL (Sign up only) */}
            {isSignUp && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#444', marginBottom: '6px', fontWeight: '500' }}>
                  Confirm Email <span style={{ color: '#d32f2f' }}>*</span>
                </label>
                <input
                  type="email"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', backgroundColor: '#f4f6fc', border: '1px solid #d1d9e6', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                  required
                />
              </div>
            )}

            {/* PASSWORD */}
            <div style={{ marginBottom: '16px', position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#444', marginBottom: '6px', fontWeight: '500' }}>
                Password <span style={{ color: '#d32f2f' }}>*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 42px 12px 14px', backgroundColor: '#f4f6fc', border: '1px solid #d1d9e6', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '34px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* CONFIRM PASSWORD (Sign up only) */}
            {isSignUp && (
              <div style={{ marginBottom: '16px', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '12px', color: '#444', marginBottom: '6px', fontWeight: '500' }}>
                  Confirm Password <span style={{ color: '#d32f2f' }}>*</span>
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ width: '100%', padding: '12px 42px 12px 14px', backgroundColor: '#f4f6fc', border: '1px solid #d1d9e6', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ position: 'absolute', right: '12px', top: '34px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            )}

            {/* CHECKBOX OPTIONS */}
            {!isSignUp ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '13px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#333' }}>
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ width: '15px', height: '15px', accentColor: '#1c1c1c' }}
                  />
                  Remember me
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} style={{ color: '#333', textDecoration: 'underline' }}>
                  Forgot Password?
                </a>
              </div>
            ) : (
              <div style={{ marginBottom: '20px', fontSize: '13px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#333' }}>
                  <input 
                    type="checkbox" 
                    checked={isSubscribed} 
                    onChange={(e) => setIsSubscribed(e.target.checked)}
                    style={{ width: '15px', height: '15px', accentColor: '#1c1c1c' }}
                  />
                  Sign Up for Newsletter
                </label>
                <p style={{ fontSize: '11px', color: '#666', marginTop: '8px', lineHeight: '1.4' }}>
                  By clicking "Sign Up" you agree to the Khaadi terms and conditions. To see how we may use your information, take a look at our privacy policy.
                </p>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button type="submit" style={{
              width: '100%', padding: '14px', backgroundColor: '#1c1c1c', color: '#fff', 
              border: 'none', borderRadius: '4px', fontWeight: '600', letterSpacing: '1px', 
              cursor: 'pointer', fontSize: '13px'
            }}>
              {isSignUp ? 'SIGN UP' : 'LOGIN'}
            </button>

            {/* SOCIAL LOGIN DIVIDER */}
            {!isSignUp && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', color: '#ccc', fontSize: '11px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
                  <span style={{ padding: '0 12px', color: '#777', fontWeight: '600', letterSpacing: '0.5px' }}>OR LOGIN WITH</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
                  <button type="button" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #dcdcdc', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#ea4335' }}>G</button>
                  <button type="button" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #dcdcdc', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#1877f2' }}>f</button>
                </div>
              </>
            )}

            {/* SWITCH SIGN-IN / SIGN-UP */}
            <div style={{ textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '20px' }}>
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button 
                type="button" 
                onClick={() => { setIsSignUp(!isSignUp); setErrorMessage(''); }} 
                style={{ background: 'none', border: 'none', color: '#111', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '13px' }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}