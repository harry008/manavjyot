import crypto from 'crypto';
import async from 'async';
import nodemailer from 'nodemailer';
import passport from 'passport';
import mg from 'nodemailer-mailgun-transport';

import User from '../models/User';

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
    auth: {
        api_key: process.env.MAILGUN_SKEY,
        domain: process.env.MAILGUN_USER
    }
};

const transporter = nodemailer.createTransport(mg(auth));

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        // req.flash('errors', errors);
        // return res.redirect('/login');
        res.json({
            error: true,
            errors
        });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // req.flash('errors', info);
            // return res.redirect('/login');
            res.json({
                error: true,
                info
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // req.flash('success', { msg: 'Success! You are logged in.' });
            // res.redirect(req.session.returnTo || '/');
            res.json({
                error: false,
                message: 'Success! You are logged in.'
            });
        });
    })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
    req.logout();
    // res.redirect('/');
    res.json({
        error: false
    });
};

/**
 * GET /signup
 * Signup page.
 */
// exports.getSignup = (req, res) => {
//     if (req.user) {
//         return res.redirect('/');
//     }
//     res.redirect('/signup');
//     // res.render('account/signup', {
//     //     title: 'Create Account'
//     // });
// };

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
    req.assert('name', 'Name should not be empty.').notEmpty();
    req.assert('email', 'Email should not be empty.').notEmpty();
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 6 to 20 characters long').len(6, 20);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
    req.sanitize('email').normalizeEmail({ remove_dots: false });
    req.assert('address', 'Address should not be empty.').notEmpty();
    req.assert('city', 'City should not be empty.').notEmpty();
    req.assert('pin', 'Pin should be valid').len(3, 6).isInt();
    req.assert('state', 'State should be specified.').notEmpty();
    req.assert('gender', 'Gender should be specified.');
    req.sanitize('name').escape();
    req.sanitize('address').escape();
    req.sanitize('city').escape();
    req.sanitize('pin').escape();
    req.sanitize('state').escape();

    const isDoctor = req.body.isDoctor && req.body.isDoctor === true;
    const isPatient = req.body.isPatient && req.body.isPatient === true;

    if (isDoctor) {
      req.assert('docSpecialism', 'Speciality must not be empty.').notEmpty();
      req.sanitize('specialism').escape();
    }

    if(isPatient) {
      req.assert('disease', 'Disease should not be empty.').notEmpty();
      req.sanitize('disease').escape();
    }

    const errors = req.validationErrors();
    if (errors) {
        // req.flash('errors', errors);
        // return res.redirect('/signup');
        return res.json({
            error: true,
            errors
        });
    }

    const userModel = {
      email: req.body.email,
      password: req.body.password,
      profile: {
        name: req.body.name,
        gender: req.body.gender,
        address: {
          address: req.body.address,
          city: req.body.city,
          pin: req.body.pin,
          state: req.body.state
        }
      }
    };

    if (isDoctor) {
      const doctorFields = {
        specialism: req.docSpecialism,
      };
      userModel.profile.isDoctor = true;
      userModel.profile.doctorFields = doctorFields;
    } else if (isPatient) {
      const patientFields = {
        disease: req.body.disease
      };
      userModel.profile.isPatient = true;
      userModel.profile.patientFields = patientFields;
    }

    const user = new User(userModel);

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            // req.flash('errors', { msg: 'Account with that email address already exists.' });
            // return res.redirect('/signup');
            return res.json({
                error: true,
                message: 'Account with that email address already exists.'
            });
        }
        user.save((err) => {
            if (err) {
                return next(err);
            }
            req.logIn(user, (err) => {
                if (err) {
                  return next(err);
                }
                return res.json({
                    error: false,
                    message: 'Successfully signed up and logged in'
                });
            });
        });
    });
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
    req.assert('name', 'Name should not be empty.').notEmpty();
    req.assert('email', 'Email should not be empty.').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        // req.flash('errors', errors);
        // return res.redirect('/account');
        res.json({
            error: true,
            errors
        });
    }

    User.findById(req.user.id, (err, user) => {
        if (err) {
            return next(err);
        }

        user.email = req.body.email || '';
        user.profile.name = req.body.name || '';
        user.profile.gender = req.body.gender || '';

        user.profile.address.address = req.body.address || '';
        user.profile.address.city = req.body.city || '';
        user.profile.address.pin = req.body.pin || 0;
        user.profile.address.state = req.body.state || '';

        user.save((err) => {
            if (err) {
                if (err.code === 11000) {
                    // req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
                    // return res.redirect('/account');
                    res.json({
                        error: true,
                        message: 'The email address you have entered is already associated with an account.'
                    });
                }
                return next(err);
            }
            // req.flash('success', { msg: 'Profile information has been updated.' });
            // res.redirect('/account');
            res.json({
                error: false,
                message: 'Profile information has been updated.'
            });
        });
    });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        // req.flash('errors', errors);
        // return res.redirect('/account');
        res.json({
            error: true,
            errors
        });
    }

    User.findById(req.user.id, (err, user) => {
        if (err) {
            return next(err);
        }
        user.password = req.body.password;
        user.save((err) => {
            if (err) {
                return next(err);
            }
            // req.flash('success', { msg: 'Password has been changed.' });
            // res.redirect('/account');
            res.json({
                error: false,
                message: 'Password has been changed.'
            });
        });
    });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
    User.remove({ _id: req.user.id }, (err) => {
        if (err) {
            return next(err);
        }
        req.logout();
        // req.flash('info', { msg: 'Your account has been deleted.' });
        // res.redirect('/');
        return res.json({
            error: false,
            message: 'Your account has been deleted.'
        });
    });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
    User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec((err, user) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                // req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
                // return res.redirect('/forgot');
                res.status(403).json({
                    error: true,
                    message: 'Password reset token is invalid or has expired.'
                });
            }
            res.json({
                error: false,
            });
        });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
    req.assert('password', 'Password must be at least 4 characters long.').len(4);
    req.assert('confirm', 'Passwords must match.').equals(req.body.password);

    const errors = req.validationErrors();

    if (errors) {
        // req.flash('errors', errors);
        // return res.redirect('back');
        res.json({
            error: true,
            errors
        });
    }

    async.waterfall([
        (done) => {
            User
                .findOne({ passwordResetToken: req.params.token })
                .where('passwordResetExpires').gt(Date.now())
                .exec((err, user) => {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        // req.flash('errors', { msg: 'Password reset token is invalid or has expired.' });
                        // return res.redirect('back');
                        res.json({
                            error: true,
                            message: 'Password reset token is invalid or has expired.'
                        });
                    }
                    user.password = req.body.password;
                    user.passwordResetToken = undefined;
                    user.passwordResetExpires = undefined;
                    user.save((err) => {
                        if (err) {
                            return next(err);
                        }
                        req.logIn(user, (err) => {
                            done(err, user);
                        });
                    });
                });
        },
        (user, done) => {
            const mailOptions = {
                to: user.email,
                from: process.env.SITE_EMAIL,
                subject: 'Your manavjyot account\'s password has been changed',
                text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
            };
            transporter.sendMail(mailOptions, (err) => {
                // req.flash('success', { msg: 'Success! Your password has been changed.' });
                done(err);
            });
        }
    ], (err) => {
        if (err) {
            return next(err);
        }
        // res.redirect('/');
        res.json({
            error: false,
            message: 'Success! Your password has been changed.'
        });
    });
};


/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
    req.assert('email', 'Please enter a valid email address.').isEmail();
    req.sanitize('email').normalizeEmail({ remove_dots: false });

    const errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/forgot');
    }

    async.waterfall([
        (done) => {
            crypto.randomBytes(16, (err, buf) => {
                const token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (!user) {
                    // req.flash('errors', { msg: 'Account with that email address does not exist.' });
                    // return res.redirect('/forgot');
                    res.json({
                        error: true,
                        message: 'Account with that email address does not exist.'
                    });
                }
                user.passwordResetToken = token;
                user.passwordResetExpires = Date.now() + 3600000; // 1 hour
                user.save((err) => {
                    done(err, token, user);
                });
            });
        },
        (token, user, done) => {
            const mailOptions = {
                to: user.email,
                from: process.env.SITE_EMAIL,
                subject: 'Reset your password on Manavjyot Charity Site',
                text: `
You are receiving this email because you (or someone else) have requested the reset of the password for your account.

Please click on the following link, or paste this into your browser to complete the process:
http://${req.headers.host}/reset/${token}

If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
            transporter.sendMail(mailOptions, (err) => {
                console.log('Password reset e-mail sent to', user.email);
                // req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
                done(err);
            });
        }
    ], (err) => {
        if (err) {
            return next(err);
        }
        // res.redirect('/forgot');
        res.json({
            error: false,
            message: `An e-mail has been sent to ${user.email} with further instructions.`
        });
    });
};
