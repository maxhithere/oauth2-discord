const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord', { scope: ['identify', 'email', 'guilds'] }));


router.get('/redirect', passport.authenticate('discord', {
        failureRedirect: '/forbidden',
        successRedirect: '/dashboard',
        session: false
    }), (req, res) => {
        res.send(req.user.username);
    })



    



module.exports = router;