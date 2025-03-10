const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        //To set this part up:
        //create a username and password at mongodb website
        //you can see it at Quickstart under Security (at the left side)

        //need to create your own .env file on server directory
        //write MONGO_URI="mongodb+srv://<db_username>:<db_password>@frufrogappcluster.w1wle.mongodb.net/?retryWrites=true&w=majority&appName=FruFrogAppCluster"
        //change <db_username> and <db_password> to your username and password you just made
        //TIP: you need to remove the '<>' brackets too
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch(error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
    
};

module.exports = connectDB;