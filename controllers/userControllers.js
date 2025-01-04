import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export function postUsers(req,res){
    const user = req.body;
    const password = req.body.password; 

    if (!password || !user.email || !user.firstName || !user.lastName || !user.whatsApp || !user.phone) {
      return res.status(400).json({
          message: "All fields are required"
      });
  }

    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds); 
    
    user.password = passwordHash;

    const newUser = new User(user);
    newUser.save().then(
        ()=>{  
            res.status(201).json({
                message : "User created successfully"
            })
        }
    ).catch((error) => {
      if (error.code === 11000) { 
          res.status(400).json({
              message: "Email already exists"
          });
        } else {
          res.status(500).json({
              message: "User creation failed",
              error: error.message
          });
      }
  });
}

export function loginUser(req,res){

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
        message: "Email and password are required"
    });
}

// Email format validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    return res.status(400).json({
        message: "Invalid email format"
    });
}
    
User.findOne({ email: email })
.then((user) => {
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    } else{

    if (user.disabled) {
        return res.status(403).json({
            message: "Your account has been disabled. Please contact support."
        });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Incorrect password"
        });
    } else{
        const payload = {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
    };

    // Sign token
    const token = jwt.sign(
        payload, 
        process.env.JWT_KEY,
        { expiresIn: '48h' }
    );

    // Send response
    res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            type: user.type,
            whatsApp: user.whatsApp,
            phone: user.phone,
            emailVerified: user.emailVerified
        },
        token: token
    });
   }
  }
 }
)
.catch((error) => {
    res.status(500).json({
        message: "Login failed",
        error: error.message
    });
});
}

    export function isAdminValid(req){
      if(req.user == null){
          return false;
      }
      
      if(req.user.type != "admin"){
          return false;
      }
      return true;
  }

  export function isCustomerValid(req){
    if(req.user == null){
        return false;
    }
    
    if(req.user.type != "customer"){
        return false;
    }
    return true;
  }

  export function getUser(req,res){
    const user = req.body.user;

    if(user == null){
        res.json({
            message: "not found"
        });
    }else{
        res.json({
            message: "found",
            user: user
        });
    }
  }

  