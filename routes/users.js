const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const verifyToken = require('../auth/verifyToken');

// Load User input validation
const validateRegister = require('../auth/validateRegister');
const validateLogin = require('../auth/validateLogin');

// Load User model
const User = require('../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'User works' }));

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegister(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exist';
      return res.status(400).json(errors);
    } else {
      //   const newUser = new User({
      //     email: req.body.email,
      //     name: req.body.name,
      //     password: req.body.password
      //   });
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      User.create(
        {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword
        },
        (err, user) => {
          if (err) {
            return res
              .status(500)
              .json({ msg: 'There was a problem registering the user.' });
          }

          res.status(200).json(user);
        }
      );

      //   bcrypt.genSalt(10, (err, salt) => {
      //     bcrypt.hash(newUser.password, salt, (err, hash) => {
      //       if (err) throw err;
      //       newUser.password = hash;
      //       newUser
      //         .save()
      //         .then(user => res.json(user))
      //         .catch(err => console.log(err));
      //     });
      //   });
    }
  });
});

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // check if user exist
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // if exist check valid password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user._id, name: user.name, email: user.email };
        const token = jwt.sign(payload, keys.secretOrKey, {
          expiresIn: 86400
        });
        res.status(200).json({ isAuth: true, token: token });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', verifyToken, (req, res, next) => {
  User.findById(req.userId, { password: 0 }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .json({ msg: 'There was a problem finding a user' });
    }
    if (!user) {
      return res.status(404).json({ msg: 'No user found' });
    }
    res.status(200).json(user);
  });
});

// @route   GET api/users/logout
// @desc    Logout current user
// @access  Private
router.get('/logout', (req, res) => {
  res.status(200).json({ isAuth: false, token: null });
});

module.exports = router;
