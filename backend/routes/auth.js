const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const router = express.Router();




//Create a user using :: "/api/auth/createuser" , No Login required
router.post('/createuser' ,[
    body('name','Enter a valid Name').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
], async(req,res)=>{
     
// If there are errors ,return bad request and  the errors :   
    const errors  = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });

  }

//It check if  a user with this email exits

   try{

       
       let user =  await User.findOne({email :req.body.email})
   

  if(user){

   return  res.status(400).json({error : 'Email is already exists'})
  }

   user = await  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  
  
//   .then( user => res.json(user)).
//   catch(err => {console.log(err)
   
//     res.json({error : "Email is already exists"  , message : err.message})

   res.json(user);
}catch(error){
    console.log(error.message);
    res.status(500).send("Some error occurred ")
}



});




    
     
 



module.exports = router ;