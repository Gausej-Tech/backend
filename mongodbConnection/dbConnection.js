const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database is Connected ");
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1);
    }
};

module.exports=connectDB;