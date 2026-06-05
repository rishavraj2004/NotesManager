const User = require('../models/user')


exports.getProfile = (req, res) => {
    console.log(req.session);
    res.render('profile', {
        user: req.session.user
    });
};