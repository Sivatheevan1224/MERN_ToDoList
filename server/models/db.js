const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/todolist';

// Use promise-based connect API (callbacks are not supported in Mongoose v6+)
// Connect without deprecated/unsupported driver options; the MongoDB driver v4+ ignores
// or rejects some legacy options (useNewUrlParser, useUnifiedTopology, useFindAndModify).
mongoose.connect(mongoURI)
    .then(() => console.log('Successfully connected to the database'))
    .catch(err => console.error('Error connecting to the database', err));

module.exports = mongoose;

