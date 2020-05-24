const router = require('express').Router();
const User = require('../model/User')
const { registerValidation,loginValidation}= require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/register', async (req,res)  => {

    //lets validate the user before add into database 

    const {error} = registerValidation(req.body);

    if(error)  return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({email:req.body.email});
    //console.log(emailExist);
    if(emailExist) return res.status(400).send("Email already exists")




    //hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name : req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user : user._id});

    }catch(e)
    {
res.status(400).send(e);
    }


} )   


router.post('/login', async (req,res)  => {
    


        
    //lets validate the user before add into database 

    const {error} = loginValidation(req.body);

    if(error)  return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email:req.body.email});
    //console.log(emailExist);
    if(!user) return res.status(400).send("Email dosen't exists")

    //check Password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);

    if (!validPass) return res.status(400).send("Invalid password");


const token = jwt.sign({user : user._id},process.env.SECRET_CODE)

    res.header('AUTH-TOKEN',token).send("LOGGED IN")




});

module.exports = router;