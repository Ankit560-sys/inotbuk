const express = require('express');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();

const JWT_secret = "ankitkatoken$";



//ROUTE 1 :--- Create a user using :: "/api/auth/createuser" , No Login required
router.post('/createuser' ,[
    body('name','Enter a valid Name').isLength({min:5}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter at atleast 5 characters').isLength({min:5})
], async(req,res)=>{


  let success = false ;
     
// If there are errors ,return bad request and  the errors :   
    const errors  = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });

  }

//It check if  a user with this email exits

   try{

       
       let user =  await User.findOne({email :req.body.email})
   

  if(user){

    
   return  res.status(400).json({success ,error : 'Email is already exists'})
  }

  const salt = await  bcrypt.genSalt(10);

  const secPass =  await bcrypt.hash(req.body.password , salt);

   user = await  User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass
  })

     const data={

        user:{

            id: user.id
        }
     }
          
     const authToken = jwt.sign(data, JWT_secret);
        //  console.log(jwtdata);
        success = true; 
        res.json({ success ,authToken})
        //   .then( user => res.json(user))
       //   catch(err => {console.log(err)
   
       //     res.json({error : "Email is already exists"  , message : err.message})

    //  res.json(user);
    }catch(error){
         console.log(error.message);
         res.status(500).send("Internal server error ")
}



});


//ROUTE 2:--- Authenticate  a user using :: "/api/auth/login"  No login required
router.post('/login' ,[

    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists({min:5})
], async(req,res)=>{

      let success = false ;

    // If there are errors ,return bad request and  the errors :   
    const errors  = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array() });

  }


    const {email , password} = req.body ;


  try{



    let user  = await User.findOne({email})

    if(!user){
       success= false ;
       return  res.status(400).json( { success ,errors : "Login with the correct credentials"});
    }

    const passwordCompare =await bcrypt.compare(password , user.password)

     if(!passwordCompare){
       success= false;
        return res.status(400).json({success ,error : "login with correct credentials"})

    }


    const data={
        user:{
            id: user.id
        }
    }

    const authToken = jwt.sign(data, JWT_secret);
    //  console.log(jwtdata);
        success = true ;
    res.json({success , authToken});

}catch(error){


        console.log(error.message);
        res.status(500).send("Internal server error ")


}

  });


  // ROUTE 3:---Get loggedin user details using :/api/auth/getuser  Login required 

  router.post('/getuser', fetchuser ,  async(req,res)=>{
     

    try{

        userId = req.user.id;
        const user = await User.findById(userId).select('-password')
        res.send(user);



    }
    catch(error){
        
        console.log(error.message);
        res.status(500).send("Internal server error ")

    }
     
 
});


module.exports = router ;