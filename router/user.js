//Import all the required modules
const express = require('express')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('config')
const route = express.Router()


//Import the user module
const User = require('../models/User')

//@route        POST api/user
//@desc         Saves the user details into the db!!
//@access       Public 
route.post('/', [
    check('name', 'Please enter the name').not().isEmpty(),
    check('email', 'Please enter the valid email id').isEmail(),
    check('password', 'Please enter the password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req)

    //Check if there are any error in the incoming data
    if (!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() })
    }

    const { name, email, password } = req.body;

    //Check if the user is already registered

    try {
        let user = await User.findOne({ email })
        //If email already exists
        if (user)
            return res.status(400).send('User already exists!!')

        user = new User({ name, email, password })

        //Hash the password
        //Generate the salt
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        //Insert into Mongo Atlas
        await user.save()

        //Create a payload
        const payload = {
            user: {
                id: user.id
            }
        }
        //Create a token using jwt
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error!!')
    }


})

module.exports = route