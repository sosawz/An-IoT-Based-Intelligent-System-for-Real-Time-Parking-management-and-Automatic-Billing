const express  = require('express');
const db = require("./util/database");
const app = express();

const adminContactRoutes = require('./routes/contacts');
const adminAttractionRoutes = require('./routes/attractions');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use("/admin",adminContactRoutes,adminAttractionRoutes);

app.listen(8081);