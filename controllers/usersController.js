const User = require('../models/user');

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
                data: data.id
            });

        }
        catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            });
        };
    }
};
