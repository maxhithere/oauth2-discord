const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Id: String,
    username: String,
    discriminator: String,
    avatar: String,
    email: String,
    guilds: Array
})

const user = module.exports = mongoose.model('authenticatedUser', userSchema);