import prisma from "../../db";
import {createJWT,comparePasswords,hashPassword} from "../modules/auth"

export const createNewUser=async(req,res)=>{
    //only username and password is passed coz rest of the 2 param values are coming by default
    const user= await prisma.user.create({
        data:{
            username:req.body.username,
            password:await hashPassword(req.body.password)
        }
    });

    const token= createJWT(user);
    res.json({token});
}

export const signin=async(req,res)=>{
    const user=await prisma.user.findUnique({
        where:{
           username:req.body.username 
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password);

    if(!isValid){
        res.status(401);
        res.json("Invalid username or password");
        return;
    }



}