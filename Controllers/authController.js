
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;


        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const role= 'user';
        const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff`;
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            avatar,
            role
        });

        const saveUser= await newUser.save();
        const generateToken = (payload) => {
            return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        };
        const token = generateToken({
            _id: saveUser._id,
            email: saveUser.email,
            username: saveUser.fullName,
            role: saveUser.role,
          });

        res.status(201).json({ message: 'User registered successfully!',token, role });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
//get user by id
exports.getUserByid = async (req, res) => {
    try {
        const userById = await User.findById(req.params.id);

        if (!User) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json(userById);

    } catch (error) {
        console.error('Error retrieving user:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid User ID' })
        }
        res.status(500).json({ message: 'Internal server error' });

    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleteUserById = await User.findByIdAndDelete(req.params.id);
        if (!deleteUserById) {
            return res.status(404).json({ message: 'Not Found Id' });
        }
        res.status(200).json({ message: 'Delete user Successful', user: this.deleteUser });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid User' })
        }
        res.status(500).json({ message: 'Internal server Error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!updatUser) {
            return res.status(404).json({ message: 'Not found Id' });
        }
        res.status(200).json({ message: 'update user successful', user: this.updateUser });
    }
    catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid user Id' });
        }
        res.status(500).json({ message: 'Internal server Error' });
    }

};

//login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(409).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },  
            process.env.JWT_SECRET, 
            { expiresIn: '2h' }  
          );

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
