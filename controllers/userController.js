const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password ) return res.status(400).json({ message: "Enter valid details!"});

    // check for duplicate emails in the db
    const duplicate = await User.findOne({ email: email }).exec();

    if (duplicate) return res.status(409).json({ message: `User with email: ${email} already exists!`}); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // create and store the new user
        const result = await User.create({
            "firstname": firstname,
            "lastname": lastname,
            "email": email,
            "password": hashedPwd
        });
        
        console.log(result);

        res.status(201).json({ 'success': `New user ${email} created!` });
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(204).json({ message: "No users found!"})
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) return res.status(400).json({ 'message': 'email and password are required.' });

    try {
        const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.status(401).json({ message: "Email not found!"});

    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    
    if (match) {
        res.status(200).json({ message: "User authenticated", "userId": `${foundUser._id}`});
    } else {
        res.status(401).json({ message: "Enter valid password!"})
    }
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = {
    createUser,
    getAllUsers, 
    handleLogin
}