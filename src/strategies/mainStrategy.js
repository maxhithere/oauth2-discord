const strategy = require('passport-discord').Strategy;
const passport = require('passport');
const authenticatedUser = require('../models/user.js');

passport.serializeUser((user, done) => {
    console.log('Serializing user');
    done(null, user.id);
})

passport.deserializeUser(async(id, done) => {
    console.log('Deserializing user');
   const user = await authenticatedUser.findById(id)
   if(user) done(null, user);
})


passport.use(new strategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify', 'email', 'guilds']

}, async (accessToken, refreshToken, profile, done) => {
    try {

   let user = await authenticatedUser.findOne({Id: profile.id});
   if(user) 
         done(null, user);
   else {
         let newUser = await authenticatedUser.create({
              Id: profile.id,
              username: profile.username,
              discriminator: profile.discriminator,
              avatar: profile.avatar,
              email: profile.email,
              guilds: profile.guilds
         });
            const savedUser = await newUser.save();
         done(null, savedUser);
   }
   
} catch(err) {
        console.log(err);
        done(err, null);
    }
}))
