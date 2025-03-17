import { useState } from "react";

const CreateAccount = () => {
  return (
    <div>
      <style>
        {`
          /* Container styling */
          .register-container {
              max-width: 400px;
              margin: 50px auto;
              padding: 20px;
              font-family: Arial, sans-serif;
          }

          /* Form styling */
          .register-form {
              background: #f9f9f9;
              padding: 25px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .form-title {
              text-align: center;
              margin-bottom: 20px;
              color: #333;
              font-size: 24px;
          }

          .form-group {
              margin-bottom: 20px;
          }

          .form-group label {
              display: block;
              margin-bottom: 5px;
              font-weight: bold;
              color: #555;
          }

          .form-group input {
              width: 100%;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 16px;
              box-sizing: border-box;
          }

          .form-group input:focus {
              outline: none;
              border-color: #007bff;
              box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
          }

          /* Error messaging */
          .error-message {
              color: #dc3545;
              font-size: 14px;
              margin-top: 5px;
              display: none;
          }

          .error .error-message {
              display: block;
          }

          /* Submit button */
          .submit-btn {
              width: 100%;
              background: #007bff;
              color: white;
              border: none;
              padding: 12px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              transition: background 0.3s;
          }

          .submit-btn:hover {
              background: #0056b3;
          }

          .submit-btn:disabled {
              background: #cccccc;
              cursor: not-allowed;
          }

          /* Success message */
          .success-message {
              text-align: center;
              color: #28a745;
              margin-top: 15px;
              display: none;
          }

          .success .success-message {
              display: block;
          }

          /* Responsive design */
          @media (max-width: 480px) {
              .register-container {
                  margin: 20px;
                  padding: 10px;
              }

              .register-form {
                  padding: 15px;
              }
          }
        `}
      </style>
      <div className="register-container">
        <form className="register-form" id="registerForm">
          <h2 className="form-title">Create Account</h2>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              required 
              minLength="3"
              placeholder="Enter username"
            />
            <div className="error-message" id="username-error">
              Username must be at least 3 characters long
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required 
              placeholder="Enter email"
            />
            <div className="error-message" id="email-error">
              Please enter a valid email address
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              minLength="6"
              placeholder="Enter password"
            />
            <div className="error-message" id="password-error">
              Password must be at least 6 characters long
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
          <div className="success-message" id="success-message">
            Account created successfully!
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateAccount;
