var express = require('express');
var router = express.Router();
var authentification = require('../ctrl/authentification');
var user = require('../db/user');


router.get('/', function(req, res) {
    res.render('auth');
});

/**
 * 
 */
router.post('/', function(req, res) {

    /**
     * User wants to disconnect
     */

    if (req.body.disconnect) {
        req.session.user = undefined;
        res.redirect('/');
        return;
    }

    /**
     * Check for credentials
     */

    user.table.findOne({ raw: true }, {
        email: req.body.email,
        password: req.body.password
    }).then(function(user) {
        console.log(user);
        req.session.user = user;
        res.redirect('/');
    });
});


module.exports = router;