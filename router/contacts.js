const express = require('express')
const route = express.Router()
const { check, validationResult } = require('express-validator');

//Import Authentication middleware
const authCheck = require('../middleware/auth')

//Import modals
const Contact = require('../models/Contact')
const User = require('../models/User')

//@route        GET api/contacts
//@desc         Fetch all the contact that are associated with the user
//@access       Private
route.get('/', authCheck, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }).select('-user')
        res.send(contacts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error!!')
    }
})

//@route        POST api/contacts
//@desc         Add new contact 
//@access       Private
route.post('/', [authCheck, [
    //Define the validation condition
    check('name', 'Name is required/Should have more than 3 characters').not().isEmpty().isLength({ min: 6 }),
    check('phone', 'Phone number is required!!').not().isEmpty(),
    check('phone', 'Should contain only 10 digits').isLength({ min: 10, max: 10 })
]], async (req, res) => {
    //Check the input based on the defined validation
    const errors = validationResult(req)
    //Check if there are errors, if any then send back the response
    if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() })

    const { name, email, phone, type } = req.body;

    const newContact = new Contact({ name, email, phone, type, user: req.user.id })

    try {
        const result = await newContact.save();
        res.json(result)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error!!')
    }
})

//@route        PUT api/contacts/:id
//@desc         Update the contact details of the user 
//@access       Private
route.put('/:id', [authCheck, [

]], (req, res) => {

})


//@route        POST api/contacts
//@desc         Add new contact 
//@access       Private
route.delete('/:id', (req, res) => {
    res.send(`Deleting the user`)
})


module.exports = route