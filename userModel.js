import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName : {
            type : String,
            require : true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
);

export default mongoose.model("users",userSchema);