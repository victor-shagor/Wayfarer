import express from 'express';
import User from '../controllers/users';


const router = express.Router();

// router.get('/auth/google',passport.authenticate('google',{
//     scope:['profile']
// }))
// router.get('/auth/google/redirect',passport.authenticate('google'),(req, res) =>{
//     user= req.user
//     res.redirect('/profile/')
// })
// router.get('/profile',(req, res) =>{
//     res.status(200).json({data:user})
// })

router.post('/api/v1/auth/google',(req, res)=>{
    User.googleLogin(req, res)

})
router.post('/api/authfacebook', (req, res) =>{
    User.facebookLogin(req, res)
})


export default router;