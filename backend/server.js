const express  = require('express');
const db = require("./util/database");
const app = express();

const adminPlateRoutes = require('./routes/plates');
const adminUserRoutes = require('./routes/users');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use("/admin",adminPlateRoutes);
app.use("/admin_user",adminUserRoutes);

app.listen(8081);