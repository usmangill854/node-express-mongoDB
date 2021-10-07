const {User} = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {sign} = require("jsonwebtoken");
const {isRequired} = require("nodemon/lib/utils");

router.get('/',async(req,res) => {
    const  user = await User.find().select('-passwordHash')
    if(!user){
        res.status(500).json({success: false } )
    }
    res.send(user)
})

router.post('/login',async(req,res) => {
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.secret
    if(!user){
        res.status(400).send('user not found')
    }
    else if(user  && bcrypt.compareSync(req.body.password,user.passwordHash)) {
        const token = jwt.sign (
            {
                userId:user.id,
                isAdmin: user.isAdmin,
                isRevoked: isRevoked
            },
            secret,
            { }
        )
        res.status(200).send({user:user.email,token: token})
    }
    else
        res.status(200).send('pasgit push -u origin mainsword is wong')
})

router.get('/:id',async(req,res) =>{
    const user =await User.findById(req.params.id).select('passwordHash')

    if(!user){
        res.status(404).send('wrong user id')
    }
    else res.send(user)
})

router.post('/',async (req,res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        street: req.body.street,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save()

    if(!user){
        res.status(400).send('the user cannot be created')
    }
    res.send(user)
})




router.post('/',async(req,res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        color: req.body.color,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        street: req.body.street,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    })
    user = await user.save()
    if(!user)
        res.status(400).json({success: false,message:'user cannot created' } )
    res.send(user)
})
module.exports = router