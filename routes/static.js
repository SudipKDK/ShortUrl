import express from 'express';
import URL from '../models/url.js';
import { restrictTologgedInUserOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', restrictTologgedInUserOnly, async (req,res)=>{
    const allUrl =await URL.find({ createdBy: req.user._id })
     return res.render('home',{urls:allUrl})
});
router.get('/signup',async(req,res)=>{
    return res.render('signup')
})
router.get('/login',async(req,res)=>{
    return res.render('login')
})
export default router;

