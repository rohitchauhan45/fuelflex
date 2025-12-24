import mongoose from "mongoose";

const loginmappingSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
export default mongoose.model("Login",loginmappingSchema)
