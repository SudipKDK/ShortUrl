import { v4 as uuidv4 } from 'uuid';
import User from '../models/user.js';
import {setUser,} from '../service/auth.js'

export const handleSignup =async (req ,res)=>{
    const user =req.body;
    if(!req.body) return res.status(400).json({msg:'all field are required'});
    await User.create(
        {
            username:user.username,
            email:user.email,
            password:user.password
        }
    )
    res.redirect('/');
}

export const handleLogin =async(req,res)=>{
    const {email,password } =req.body;
    const user =await User.findOne({email,password});
    if(!user){
        return res.render('login',{error:'invalid username or password'})
    }
    const sessionId =uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId)
    return res.redirect('/')
}