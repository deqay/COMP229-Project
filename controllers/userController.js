
const User = require('../models/user');
const bcrypt = require('bcrypt');

//create user 

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// GET all users 

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error' });
    }
};

// fetch user by id 

const getUserById = async (req, res) => {
    try {
        const userId = req.params.userid;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// update user 

const updateUser = async (req, res) => {
    try {
        const userId = req.params.userid;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: 'Error updating user' });
    }
};


// delete user 

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userid);

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        return res.json({ message: "User deleted." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


//user sign in 

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Successfully signed in!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    signIn
};
