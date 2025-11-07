const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
require('./models/db');

app.use(express.json());
// Parse JSON bodies (future-proofing for POST/PUT)
app.use(cors())
// Simple request logger so incoming requests show in the server terminal
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Mount task routes under /api/tasks
app.use('/api/tasks', routes);

app.listen(8000, err => {
    if (err) console.log(err);
    console.log('Server is running on port 8000');
})