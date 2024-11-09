const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const admin = require('../models/admin.js')
const crypto=require('crypto')
const nodemailer=require('nodemailer')
const User = require('../models/User')
const meal = require('../models/Meals.js')



const signUp=async(req,res)=>{
    try{
        const {email,password}=req.body
        console.log(email,password)
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required"
            })
        }

        const isExist=await admin.findOne({email})
        if (isExist){
            return res.status(400).json({
                success:false,
                message:'User already exist'
            })
        }
        function validateEmail(email) {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return regex.test(email);
        }
        if(!validateEmail(email)){
            return res.status(400).json({
                success:false,
                message:'Invalid email'
                })
        }
        if (password.length < 8){
            return res.status(400).json({
                success:false,
                message:'Password must be at least 8 characters long'
            })
        }
        const hashedPass=await bcrypt.hash(password,10)
        const newAdmin=new admin({
            email,
            password:hashedPass,
            resetPasswordToken: '',
            resetPasswordExpires: null
        })
        const savedAdmin=await newAdmin.save()
        console.log('Saved admin:', savedAdmin)
        const token= jwt.sign({id:newAdmin._id,email},process.env.JWT_SECRET)

        return res.status(200).json({
            success:true,
            message:'Admin created successfully',
            token
        })
    
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}


const logIn=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user= await admin.findOne({email})

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exist"
            })
        }
            
        const decryptPass= await bcrypt.compare(password,user.password)
     
        if(!decryptPass){
            return res.status(400).json({
                success:false,
                message:"Invalid credintial"
            })
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

        return res.status(200).json({
             success:true,
            message:"Login successful",
            token

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
        
    }
}

const forgotPassword=async(req,res)=>{
    try {
        const {email}  = req.body
        console.log(email)
        const user = await admin.findOne({ email })
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();
        const resetLink = `http://localhost:5173/reset-password/${resetToken}`

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
          });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Link',
            html: `<table cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: none; font-family: Arial, sans-serif; width: 100%; max-width: 600px; margin: 0 auto;">
  <tr>
    <td style="padding: 20px;">
      <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">Password Reset Request</h1>
      <p style="color: #555; font-size: 16px; margin-bottom: 20px;">Click the link below to reset your password:</p>
      <a href="${resetLink}" style="background-color: #007bff; border-radius: 4px; color: #fff; display: inline-block; font-size: 16px; padding: 10px 20px; text-decoration: none;">Reset Password</a>
      <p style="color: #555; font-size: 16px; margin-top: 20px;">This link will expire in 1 hour.</p>
    </td>
  </tr>
</table> `
        }

        await transporter.sendMail(mailOptions)

        res.json({
            success: true,
            message: 'Password reset link sent to email'
        })

    } catch (error) {
        console.error('Forgot password error:', error)
        res.status(500).json({
            success: false,
            message: 'Error in sending reset link'
        })
    }
}
const resetPassword=async(req,res)=>{
    try {
        const token = req.params.token;
        const { newPassword } = req.body;
       
      
        const user = await admin.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }
        });
        console.log(user)
    
        if (!user) {
          return res.status(400).json(
            {
                success:false,
                message:"Invalid token or expired "
            }
        );
        }
   
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();
    
        res.status(200).json(
            {
                success:true,
                message:"Password resetted successfully!"
            }
        );
      } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:"Error occured"
            }
        );
      }
}


const submitMenu=async(req,res)=>{
    console.log("submit menu is called....")
    console.log("Request body:", req.body);

    try {
        const { breakfast, lunch, dinner } = req.body;
        const finalMealData = { breakfast, lunch, dinner };
        console.log("Meal data"+finalMealData)
        const menu= await meal.create(finalMealData)
        
        return res.status(200).json({
            success: true,
            message: "Menu submitted successfully",
            data: menu
        });
    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        }) 
    }
   
}

const updateMenu = async (req, res) => {
    try {
        // const { id } = req.params;  // Get the ID from the URL
        const id = '672f2e498d082c5ebe9a6f5e'; // Replace with the actual ID of the meal you want to update
        const { finalMealData } = req.body;  // Get the updated meal data from the request body
        console.log("Update meal....="+finalMealData)
        // Find the existing meal entry by ID
        const existingMeal = await meal.findById(id);
        if (!existingMeal) {
            return res.status(404).json({
                success: false,
                message: 'Meal not found'
            });
        }

        // Update the meal data
        existingMeal.breakfast = finalMealData.breakfast;
        existingMeal.lunch = finalMealData.lunch;
        existingMeal.dinner = finalMealData.dinner;

        // Save the updated meal
        const updatedMeal = await existingMeal.save();

        return res.status(200).json({
            success: true,
            message: 'Meal updated successfully',
            data: updatedMeal
        });
    } catch (error) {
        console.error('Update menu error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

const getMealData=async(req,res)=>{
    try {
        const showMeal= await meal.find()
        console.log(showMeal)
        return res.status(200).json({
            success:true,
            message:"Data fetched successfully",
            data:showMeal
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }
}

module.exports={signUp,logIn,forgotPassword,resetPassword,submitMenu, updateMenu,getMealData}
