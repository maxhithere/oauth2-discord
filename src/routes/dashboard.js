const router = require('express').Router();

function isAuthorized(req, res, next) {
    if (req.user) {
        console.log('User is authorized');
        console.log(req.user);
        next();
    } else {
        console.log('User is not authorized');
        res.redirect('/');
    }
}

router.get('/', isAuthorized, (req, res) => {
    res.sendStatus(200);
})



module.exports = router;