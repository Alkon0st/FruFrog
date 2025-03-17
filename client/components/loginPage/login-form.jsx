import React, { useState } from 'react';
import './LoginPage.css'; // You would create this CSS file separately

const LoginPage = () => {
  // State for form display
  const [currentForm, setCurrentForm] = useState('login'); // 'login', 'register', 'forgotPassword'
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Form data states
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [resetData, setResetData] = useState({
    email: ''
  });
  
  // Error states
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: ''
  });
  
  const [registerErrors, setRegisterErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [resetErrors, setResetErrors] = useState({
    email: ''
  });
  
  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  
  // Form toggle handlers
  const showLoginForm = () => {
    setCurrentForm('login');
    setSuccessMessage('');
  };
  
  const showRegisterForm = () => {
    setCurrentForm('register');
    setSuccessMessage('');
  };
  
  const showForgotPasswordForm = () => {
    setCurrentForm('forgotPassword');
    setSuccessMessage('');
  };
  
  // Form input handlers
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when typing
    if (loginErrors[name]) {
      setLoginErrors({
        ...loginErrors,
        [name]: ''
      });
    }
  };
  
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
    
    // Clear error when typing
    if (registerErrors[name]) {
      setRegisterErrors({
        ...registerErrors,
        [name]: ''
      });
    }
  };
  
  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData({
      ...resetData,
      [name]: value
    });
    
    // Clear error when typing
    if (resetErrors[name]) {
      setResetErrors({
        ...resetErrors,
        [name]: ''
      });
    }
  };
  
  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  // Form submission handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { email: '', password: '' };
    
    // Validate email
    if (!validateEmail(loginData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!validatePassword(loginData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setLoginErrors(newErrors);
    
    if (isValid) {
      // Show loading state
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Login successful! Redirecting...');
        
        // Reset form
        setLoginData({
          email: '',
          password: '',
          rememberMe: false
        });
        
        // Simulate redirect
        setTimeout(() => {
          alert('Login successful! In a real app, you would be redirected to the dashboard.');
          setSuccessMessage('');
        }, 2000);
      }, 1500);
    }
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };
    
    // Validate name
    if (registerData.name.trim() === '') {
      newErrors.name = 'Please enter your name';
      isValid = false;
    }
    
    // Validate email
    if (!validateEmail(registerData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    // Validate password
    if (!validatePassword(registerData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    // Validate password confirmation
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setRegisterErrors(newErrors);
    
    if (isValid) {
      // Show loading state
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Account created successfully! You can now log in.');
        
        // Reset form
        setRegisterData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Switch to login form
        setTimeout(() => {
          showLoginForm();
        }, 2000);
      }, 1500);
    }
  };
  
  const handleResetSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { email: '' };
    
    // Validate email
    if (!validateEmail(resetData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    setResetErrors(newErrors);
    
    if (isValid) {
      // Show loading state
      setLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccessMessage('Password reset link sent to your email!');
        
        // Reset form
        setResetData({
          email: ''
        });
        
        // Switch to login form
        setTimeout(() => {
          showLoginForm();
        }, 2000);
      }, 1500);
    }
  };
  
  // Social login handlers
  const handleSocialLogin = (provider) => {
    alert(`${provider} login would be implemented here. This would typically redirect to ${provider} OAuth.`);
  };
  
  return (
    <div className="login-container">
      <div className="logo">
        <img src="/logo-placeholder.png" alt="Company Logo" />
      </div>
      
      {currentForm !== 'forgotPassword' && (
        <div className="auth-toggle">
          <button
            type="button"
            className={`toggle-btn ${currentForm === 'login' ? 'active' : ''}`}
            onClick={showLoginForm}
          >
            Login
          </button>
          <button
            type="button"
            className={`toggle-btn ${currentForm === 'register' ? 'active' : ''}`}
            onClick={showRegisterForm}
          >
            Register
          </button>
        </div>
      )}
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      {/* Login Form */}
      {currentForm === 'login' && (
        <form onSubmit={handleLoginSubmit}>
          <h1>Log in to your account</h1>
          
          <div className="form-group">
            <label htmlFor="loginEmail">Email address</label>
            <input
              type="email"
              id="loginEmail"
              name="email"
              placeholder="Enter your email"
              value={loginData.email}
              onChange={handleLoginChange}
              className={loginErrors.email ? 'input-error' : ''}
              required
            />
            {loginErrors.email && <div className="error-message">{loginErrors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <div className="password-field">
              <input
                type={showLoginPassword ? 'text' : 'password'}
                id="loginPassword"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginChange}
                className={loginErrors.password ? 'input-error' : ''}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? '👁️‍🗨️' : '👁️'}
              </span>
            </div>
            {loginErrors.password && <div className="error-message">{loginErrors.password}</div>}
          </div>
          
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={loginData.rememberMe}
              onChange={handleLoginChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          
          <div className="forgot-password">
            <a href="#" onClick={(e) => { e.preventDefault(); showForgotPasswordForm(); }}>
              Forgot password?
            </a>
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading && <span className="loading"></span>}
            Log In
          </button>
        </form>
      )}
      
      {/* Register Form */}
      {currentForm === 'register' && (
        <form onSubmit={handleRegisterSubmit}>
          <h1>Create an account</h1>
          
          <div className="form-group">
            <label htmlFor="registerName">Full Name</label>
            <input
              type="text"
              id="registerName"
              name="name"
              placeholder="Enter your name"
              value={registerData.name}
              onChange={handleRegisterChange}
              className={registerErrors.name ? 'input-error' : ''}
              required
            />
            {registerErrors.name && <div className="error-message">{registerErrors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="registerEmail">Email address</label>
            <input
              type="email"
              id="registerEmail"
              name="email"
              placeholder="Enter your email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className={registerErrors.email ? 'input-error' : ''}
              required
            />
            {registerErrors.email && <div className="error-message">{registerErrors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="registerPassword">Password</label>
            <div className="password-field">
              <input
                type={showRegisterPassword ? 'text' : 'password'}
                id="registerPassword"
                name="password"
                placeholder="Enter your password"
                value={registerData.password}
                onChange={handleRegisterChange}
                className={registerErrors.password ? 'input-error' : ''}
                required
              />
              <span
                className="password-toggle"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              >
                {showRegisterPassword ? '👁️‍🗨️' : '👁️'}
              </span>
            </div>
            {registerErrors.password && <div className="error-message">{registerErrors.password}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              className={registerErrors.confirmPassword ? 'input-error' : ''}
              required
            />
            {registerErrors.confirmPassword && (
              <div className="error-message">{registerErrors.confirmPassword}</div>
            )}
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading && <span className="loading"></span>}
            Create Account
          </button>
        </form>
      )}
      
      {/* Forgot Password Form */}
      {currentForm === 'forgotPassword' && (
        <form onSubmit={handleResetSubmit}>
          <h1>Reset Password</h1>
          
          <div className="form-group">
            <label htmlFor="resetEmail">Email address</label>
            <input
              type="email"
              id="resetEmail"
              name="email"
              placeholder="Enter your email"
              value={resetData.email}
              onChange={handleResetChange}
              className={resetErrors.email ? 'input-error' : ''}
              required
            />
            {resetErrors.email && <div className="error-message">{resetErrors.email}</div>}
          </div>
          
          <button type="submit" className="btn" disabled={loading}>
            {loading && <span className="loading"></span>}
            Send Reset Link
          </button>
          
          <div className="signup" style={{ marginTop: '20px' }}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                showLoginForm();
              }}
            >
              Back to login
            </a>
          </div>
        </form>
      )}
      
      {/* Social Login Section */}
      {currentForm !== 'forgotPassword' && (
        <div className="social-login-container">
          <div className="separator">
            <span>OR</span>
          </div>
          
          <div className="social-login">
            <button
              type="button"
              className="social-btn"
              onClick={() => handleSocialLogin('Google')}
            >
              Google
            </button>
            <button
              type="button"
              className="social-btn"
              onClick={() => handleSocialLogin('Facebook')}
            >
              Facebook
            </button>
            <button
              type="button"
              className="social-btn"
              onClick={() => handleSocialLogin('Apple')}
            >
              Apple
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default LoginPage;