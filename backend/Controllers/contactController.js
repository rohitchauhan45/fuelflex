import CONTACT from "../models/CONTACT.js"

export const contact=async(req,res,next)=>{
    try{
        const {name,email,mobileno,message}=req.body
        if(!name || !email ||!mobileno ||!message){
            return res.status(400).json({message:"Entre all required fields"})

        }
        
        const newuser=new CONTACT({
            name,
            email,
            mobileno,
            message
        })
        await newuser.save()
        return res.status(200).json({message:"Added succesfully"})
    }catch(err){
        next(err)
    }
}