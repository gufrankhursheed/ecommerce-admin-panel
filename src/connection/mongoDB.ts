import mongoose from "mongoose";

const connect = async () => {
    const mongoUrl =  process.env.MONGODB_URI;
    
    if (!mongoUrl) {
        throw new Error("MONGO_URL environment variable is not defined.");
    }

    try{
        await mongoose.connect(mongoUrl);
        console.log("connected to mongodb");
    }catch(error) {
        console.log("error connecting to mongodb:",error);
    }
};

export default connect;