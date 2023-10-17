import mongoose from "mongoose";


const connectDB = async () => {
    try{
        const conn = await mongoose.connect('{mongo_url}/tp2')
        console.log(`connect to mongodb database ${conn.connection.host}`)
    }catch(error){
        console.log(`error in mongodb database ${error}`)
    }
};

export default connectDB;