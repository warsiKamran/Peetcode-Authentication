import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async(req,res)=>{

    const users = await User.find({});

    res.json({
        success: true,
        users
    })
}

export const register = async(req,res)=>{

    const {name,email,password} = req.body;

    let user = await User.findOne({email});
    if(user){
        return res.status(404).json({
            success: false,
            message: "user already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({
            name,
            email,
            password: hashedPassword
        });
    sendCookie(user, res, "Registered successfully", 201);
};

export const login = async(req,res,next) => {

    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(404).json({
            success: false,
            message: "Invalid email or password"
        });
    }
    sendCookie(user, res, `Welcome back ${user.name}`, 200);
}

export const logout = async(req,res) => {

    res.status(200).cookie("token", "", {expires: new Date(Date.now())})
    .json({
        success: true,
        user: req.user
    })
}

export const getUserDetails = (req,res)=>{

    //we need id in order to access the user details 
    //but how to do that ?
    //for that we will use cookie parser
    //on using that we we can access the cookies
    res.status(200).json({
        success: true,
        user: req.user
    })
}





// export const updateUser = async(req,res)=>{

//     const {id} = req.params;
//     const user = await User.findById(id);

//     res.json({
//         success: true,
//         message: "updated successfully"
//     })
// }

// export const deleteUser = async(req,res)=>{

//     const {id} = req.params;
//     const user = await User.findById(id);

//     await user.deleteOne();

//     res.json({
//         success: true,
//         message: "deleted successfully"
//     })
// }