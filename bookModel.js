import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            require : true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
        },
        page:{
            type: String,
            required: true,
        }
    }
);

export default mongoose.model("book",bookSchema);