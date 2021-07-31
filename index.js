const express = require("express");
const app = express();
const product = require("./api/product");
var usersRouter = require('./api/user');

app.use(express.json({ extended: false }));
// ADD THIS
var cors = require('cors');
app.use(cors());

app.use("/api/product", product);

app.use('/users', usersRouter);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
