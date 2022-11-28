require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
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

app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
