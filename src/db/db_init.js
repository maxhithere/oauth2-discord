const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
//mongodb://localhost:27017/discordauth
//mongodb+srv://max9:max119@bot.zneqqq7.mongodb.net/discordauth