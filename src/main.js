require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('./strategies/config');
const db = require('./db/db_init');

db.then(() => console.log('Connected to database')).catch(err => console.log(err));

//Middleware


app.use(session({
    secret: 'random',
    cookie: { maxAge: 60000 * 60 * 24 },
    name: 'discord.auth',
    saveUninitialized: false,
    resave: true

}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', passport.authenticate('discord', { scope: scopes, prompt: prompt }), function(req, res) {});
app.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/info') } // auth success
);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/info', checkAuth, function(req, res) {
    //console.log(req.user)
    res.json(req.user);
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
