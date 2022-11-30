const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

//replace "mongodb://localhost:27017" if you are not in a local hosting environment
