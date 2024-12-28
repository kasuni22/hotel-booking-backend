import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        
    }
);

const Category = mongoose.model("Categories", categorySchema);

export default Category;