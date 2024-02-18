const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const passport = require("passport");
require("../passport")

// Initialize passport (middleware)
router.use(passport.initialize());
router.use(passport.session());

// Auth
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

// Auth Callback
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  })
);




// Load Auth
router.get("/", userController.loadAuth);

// Success
router.get('/success', userController.successGoogleLogin);

// Failure
router.get('/failure', userController.failureGoogleLogin);

module.exports = router;
