const express = require('express')
const route = express.Router()
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

//import the middleware auth 
const auth = require('../middleware/auth')

//import the User model
const User = require('../models/User')

//@route        GET api/auth
//@desc         Get logged in user details!!!
//@access       Private

route.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error!!')
    }
})

//@route        POST api/auth
//@desc         Authenticate the user
//@access       Public

route.post('/', [
    check('email', 'Plese provide the valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    const { email, password } = req.body;
    //Check for the incoming validation
    const erros = validationResult(req)
    if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() })

    try {
        //Check if the user exists
        let user = await User.findOne({ email })

        if (!user) return res.status(400).json({ msg: 'User mail or password is incorrect' })

        //Compare the password
        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) return res.status(400).json({ msg: 'User mail or password is incorrect' })

        //Create a payload
        const payload = {
            user: {
                id: user.id
            }
        }

        //Proper user
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err
            res.json({ token })
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error!!')
    }

})

module.exports = route