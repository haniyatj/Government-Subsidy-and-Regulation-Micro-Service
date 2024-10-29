
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI, {  //we'll get the conn string from the DB team
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
            useFindAndModify: false, 
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
