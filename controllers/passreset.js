const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jwt");
const checkAuth = require("../middlewares/check_auth");
const { getLogger } = require("nodemailer/lib/shared");

router.post("/login",async(req,res)=>{
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(422).json({
            message:"Email and password is required"
        });
    }
    const user = await User.find({email});
    if(!user){
        return res.status(401).json({
            message:"Invalid Email or Password"
        });
    }
    try{
        const comparePass = await bcrypt.compare(password,user.password);
        if(comparePass){
            const token = jwt.sign({
                user_id:user._id,
                eamil:user.email,
                role:user.role
            },
            process.env.JWT_SECRET,
           { expiresIn: "7 days" }
            );
            return res.send(token);
        }else{
            res.status(401).json({
                message:"Invalid Email or password"
            });
        }

    }
    catch(err){
        return res.status(401).json({
            message:"Invalid Email or password"
        });
    }
});

router.post("/signup",async(req,role,res)=>{
    const{fullname,email,location,phoneNo,password} = req.body;
    try{

        const hashedPassword = await bcrypt.hash({password},10);
        const newUser = await User({
            fullname,
            email,
            location,
            phoneNo,
            password:hashedPassword,
            role
        });
        newUser.save();
        return res.status(201).json({
            ...newUser,
            message:"user created"
        })
    }catch(err){
        return res.status(400).json({
            message:"Error"
        });

    }

})

router.post("/passwordResetRequest",async(req,res)=>{
    const email = req.body.email;
    const buffer = await crypto.randomBytes(32);
    const passwordResetToken = buffer.toString("hex");
    try{
        await User.update({
            passwordResetToken
        },
        { where:{
            email
        }
    }
    
    )
    const passwordResetURL =`${process.env.FRONTEND_URL}/passwordReset?
    passwordResetToken =${passwordResetToken}`;
    SpeechGrammarList.setApiKey(process.env.SENDgRID_API_KEY);
    const msg ={
        to:email,
        from:process.env.FROM_EMAIL,
        subject:"passwordResetRequest",
        text:`dear user
        you can reset your password by going to ${passwordResetURL}`,
        html:`<p>dear user</p>
        <p> you can reset your password by going to 
        <a href ="$passwordResetUrl">this link </a></p>`
    };
    SpeechGrammarList.send(msg);
    res.status(200).json({
        message:"Successfully sent email"
    });

    }catch(err){
        return res.status(401).json({
            message:"error "
        });

    }

});

router.post("/newPassword",async(req,res)=>{
    const{password,passwordResetToken} = req.body;
    const hashedPassword = await bcrypt.hash({password},12);
    const buffer = await crypto.randomBytes(32);
    const newPasswordResetToken = buffer.toString("hex");
    try{
        await User.update({
            hashedPassword,
            newPasswordResetToken:passwordResetToken
        },
        {
            where:{
                passwordResetToken
            }
        })
        res.send({message:"successfully reset passwore"});

    }
    catch(ex){
        getLogger.error(ex);
        res.send(ex,500);

    }

})


exports.resetPassword = async(req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
      if(err){
        console.log(err);
      }
      const passwordResetToken = buffer.toString("hex");
      
      const user = User.findOne({email:req.body.email});
      if(!user){
        res.status(422).json({message:"Email does not exist"});
      }else{
      user.resetToken = passwordResetToken;
      user.expireToken = Date.now() + 3600000;
      }
      user.save()
      .then(result=>{
        transporter.sendMail({
          from:"misge1898@gmail.com",
          to:user.email,
          subject:"password reset",
          html:`<p> hello from password confirmation</p>`
        });
      })
      

  
    });
  
    
}
exports.forgetController =(req,res)=>{
    const {email} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User with that email does not exist"
            });
        }
        const token = jwt.sign({
            user_id:user._id,

        },process.env.JWT_PASSWORD_RESET,
        {expiresIn:"30m"})
        //send email with this token
        const emailData ={
            from:process.env.EMAIL_FROM,
            to:email,
            subject:"Password reset Link",
            html:`<h1> Please click the link to reset</h1>
            <p>${process.env.CLEINT_URL}/users/password/reset/${token}</p>`
        }
      return User.updateOne({
        passwordResetToken:token
      },(err,success)=>{
          if(err){
              return res.status(400).json({
                  message:"not succeeded"
              });
          }else{
              //send email
          }
      })
    })
}

exports.resetPassword =(req,res)=>{
    const{passwordResetToken,newPassword} = req.body;
    if(passwordResetToken){
        jwt.verify(passwordResetToken.process.env.JWT_PASSWORD_RESET,(err,decod)=>{
            if(err){
                return res.status(400).json({
                    error:"expired link ,try again"
                });
            }
            User.findOne({passwordResetToken},(err,user)=>{
                if(err){
                    return res.status(400).json({
                        error:"Something went wrong,tray again"
                    });
                }
                const updatedFields ={
                    password:newPassword,
                    passwordResetToken:""
                }
                user =_.extend(user,updatedFields);
                user.save((err,result)=>{
                    if(err){
                        return res.status(400).json({
                            error:"Error reseting user password"
                        });
                    }
                    res.json({
                        message:"Greet! now you can login"
                    });

                })
            })
        })
    }

}