import LOGINMAPPING from "../models/LOGINMAPPING.js"
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
// adjust as per your path


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await LOGINMAPPING.findOne({username: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
  

        // Create JWT token
        const token = jwt.sign(
          { id: user._id, email: user.username },
          process.env.JWT_SECRET || "yaaaaajjjjj",
          { expiresIn: "30d" }
        );
        


        // Send JWT as HttpOnly cookie
        res.cookie('access_token', token, {
          expires: new Date(Date.now() + 2592000000),
          httpOnly: true,
          domain:
            process.env.NODE_ENV === "production" ,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
       

        return res.status(200).json({ message: "Login successful", user });

    } catch (err) {
        console.error("Login error:", err);
        next(err);
    }
};


export const logout = async (req, res, next) => {
  try {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    });

    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    next(err);
  }
};



 // adjust the path as needed

export const sign = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "Enter all the required fields" });
    }

    // Hash the password before saving
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new LOGINMAPPING({
      username: email,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(200).json({ message: "User has been created" });

  } catch (err) {
    next(err);
  }
};
