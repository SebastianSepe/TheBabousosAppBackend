const { is } = require('bluebird');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Users retrieved:`, data);
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching users:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    },

    async register(req, res, next) {
        try {

            const user = req.body;
            const data = await User.create(user);
            
            return res.status(200).json({
                success: true,
                message: 'User created successfully',
                data: {
                    id: data.id
                }
            });

        }
        catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        };
    },

    async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const myUser = await User.findByEmail(email);

            if(!myUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            const isPasswodValid = await bcrypt.compare(password, myUser.password);

            if (isPasswodValid) {
                const token = jwt.sign({id: myUser.id, email: myUser.email}, keys.secretOrKey,{
                    //expiresIn: 86400
                })

                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token:  `JWT ${token}`
                };

                return res.status(200).json({
                    success: true,
                    message: 'User logged in successfully',
                    data: data
                });
            }
            else{
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

        }
        catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        }
    }
};
