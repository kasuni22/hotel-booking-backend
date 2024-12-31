import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true,
            match: [/.+@.+\..+/, "Invalid email format"]

        },

        password : {
            type : String,
            required : true
        },

        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        type : {
            type : String,
            required : true,
            default : "customer"
        },
        whatsApp : {
            type : String,
            required : true,
            match: [/^\d{10,15}$/, "Invalid phone number"]
        },
        
        phone : {
            type : String,
            required : true,
            match: [/^\d{10,15}$/, "Invalid phone number"]
        },
        disabled : {
            type : Boolean,
            required : true,
            default : false
        },
        emailVerified : {
            type : Boolean,
            required : true,
            default : false
        }
    },
    { timestamps: true }
);

const User = mongoose.model("Users", userSchema)

export default User;