import { useState } from "react";

const IncomeForm = () => {
  return (
    <div>
      <style>
        {`
          /* General styling */
          .income-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
          }

          /* Income Form Styling */
          .income-form {
              background: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .form-group {
              margin-bottom: 15px;
          }

          .form-group label {
              display: block;
              margin-bottom: 5px;
              font-weight: bold;
              color: #333;
          }

          .form-group input,
          .form-group select {
              width: 100%;
              padding: 8px;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 16px;
          }

          .form-group input[type="number"] {
              max-width: 200px;
          }

          .form-group select {
              max-width: 200px;
          }

          .submit-btn {
              background: #007bff;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              transition: background 0.3s;
          }

          .submit-btn:hover {
              background: #0056b3;
          }

          /* Income Display Section */
          .income-display {
              margin-top: 20px;
              padding: 15px;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .income-display h2 {
              margin: 0 0 15px 0;
              color: #333;
              font-size: 20px;
          }

          .income-item {
              margin: 10px 0;
          }

          .income-item span {
              font-weight: bold;
              color: #555;
          }

          /* Budget Display Section */
          .budget-display {
              margin-top: 20px;
              padding: 15px;
              background: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .budget-display h2 {
              margin: 0 0 15px 0;
              color: #333;
              font-size: 20px;
          }

          .budget-item {
              margin: 10px 0;
              padding: 10px;
              border-radius: 4px;
          }

          .budget-item.necessities {
              background: #e6f3ff;
          }

          .budget-item.wants {
              background: #fff0e6;
          }

          .budget-item.savings {
              background: #e6ffe6;
          }

          /* Error Messages */
          .error-message {
              color: #dc3545;
              font-size: 14px;
              margin-top: 5px;
              display: none;
          }

          .error .error-message {
              display: block;
          }

          /* Responsive Design */
          @media (max-width: 480px) {
              .income-container {
                  padding: 10px;
              }
              
              .income-form,
              .income-display,
              .budget-display {
                  padding: 10px;
              }
              
              .form-group input,
              .form-group select {
                  max-width: 100%;
              }
          }

          /* Loading State */
          .loading {
              opacity: 0.6;
              pointer-events: none;
          }

          /* Success Message */
          .success-message {
              color: #28a745;
              text-align: center;
              margin: 10px 0;
              display: none;
          }

          .success .success-message {
              display: block;
          }
        `}
      </style>

      <div className="income-container">
        <form className="income-form">
          <div className="form-group">
            <label htmlFor="amount">Income Amount</label>
            <input type="number" id="amount" name="amount" step="0.01" min="0" required />
            <div className="error-message">Please enter a valid positive number</div>
          </div>

          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select id="currency" name="currency">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="frequency">Frequency</label>
            <select id="frequency" name="frequency">
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Update Income</button>
          <div className="success-message">Income updated successfully!</div>
        </form>

        <div className="income-display">
          <h2>Current Income</h2>
          <div className="income-item">Amount: <span>$0.00</span></div>
          <div className="income-item">Currency: <span>USD</span></div>
          <div className="income-item">Frequency: <span>Monthly</span></div>
          <div className="income-item">Last Updated: <span>Not set</span></div>
        </div>

        <div class="Budget Display Section">
            <h2><Frufrog><Freddit>Let's Begin Your Budget Journey</Freddit></Frufrog></h2>
            <div class="1. Create a Pond">Pond Name (Pond Name): <span></span></div>
            <div class="2. What is your Monthly Income?">Amount ($ Amount): <span></span></div>
            <div class=""><Next>Next</Next>: <span></span></div>
        </div> 
      </div>
    </div>
  );
};
export default IncomeForm;