const bcrypt = require('bcryptjs')
const User = require('../models/user')
exports.getLogin = (req, res, next) => {
    res.render('login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}

exports.getSignup = (req, res, next) => {
    res.render('register', {
        path: '/register',
        pageTitle: 'Signup',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {

    req.session.isLoggedIn = true
    res.redirect('/');
}


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email })
        .then(user => {

            if (!user) {
                console.log('User not found');
                return res.redirect('/auth/login');
            }

            return bcrypt.compare(password, user.password)
                .then(doMatch => {

                    if (!doMatch) {
                        console.log('Wrong password');
                        return res.redirect('/auth/login');
                    }

                    req.session.isLoggedIn = true;
                    req.session.user = user;

                    req.session.save(err => {
                        console.log('Session save error:', err);
                        res.redirect('/dashboard');
                    });
                });
        })
        .catch(err => {
            console.log(err);
        });
};



exports.postSignup = (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
        return res.redirect('/register');
    }

    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/login');
            }

            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        fullName,
                        email,
                        password: hashedPassword
                    });

                    return user.save();
                });
        })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};
