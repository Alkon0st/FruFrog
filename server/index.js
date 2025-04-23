// this is the entry point of our program
// require('dotenv').config();
// const express = require('express');
// const admin = require('firebase-admin');
// const connectDB = require('./config/db');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/authRoute');
// const cors = require('cors');

// const request = {
//     user: { client_user_id: 'unique-id' },
//     client_name: 'Your App Name',
//     products: ['auth', 'transactions'],
//     country_codes: ['US'],
//     language: 'en',
//   };
  
//   const response = await plaidClient.linkTokenCreate(request);
//   res.json({ link_token: response.data.link_token });
  
// const app = express();


// app.use(cors());
// app.use(bodyParser.json());

// // connectDB();

// app.use('/api/auth', authRoutes);



// const port = process.env.port || 5000;

// app.listen(port, () => {
//     console.log(`server listending on localhost:${port}`)
// })
// console.log('Routes loaded:', app._router.stack);

const express = require('express');
const bodyParser = require('body-parser');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
const authRoutes = require('./routes/authRoute');
const billRoutes = require('./routes/billRoute');
const cors = require('cors');
=======
const plaid = require('plaid');
>>>>>>> Stashed changes
=======
const plaid = require('plaid');
>>>>>>> Stashed changes

const app = express();
app.use(bodyParser.json());

const PLAID_CLIENT_ID = '6791bf26a9f42800248b633c';
const PLAID_SECRET = 'your-secret';
const PLAID_ENV = 'sandbox'; // Use 'sandbox', 'development', or 'production'

<<<<<<< Updated upstream
<<<<<<< Updated upstream
app.use('/api/auth', authRoutes);
app.use('/api/bills', billRoutes);
=======
=======
>>>>>>> Stashed changes
const plaidClient = new plaid.Client({
    clientID: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    env: PLAID_ENV
});
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

app.post('/create_link_token', async (req, res) => {
    try {
        const response = await plaidClient.createLinkToken({
            user: {
                client_user_id: 'unique-user-id', // Replace with your user ID
            },
            client_name: 'Your App Name',
            products: ['auth', 'transactions'],
            country_codes: ['US'],
            language: 'en',
        });
        res.json({ link_token: response.link_token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating link token');
    }
});

app.post('/exchange_public_token', async (req, res) => {
    const { public_token } = req.body;
    try {
        const response = await plaidClient.exchangePublicToken(public_token);
        const access_token = response.access_token;
        res.json({ access_token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error exchanging public token');
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));