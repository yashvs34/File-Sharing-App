const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./configs/mongodbConnections');
connectDB();
const fileUploadRoute = require('./routes/fileUploadRoute');
const sendMailRoute = require('./routes/sendMailRoute');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to File-Sharing-App");
});

app.use('/', fileUploadRoute);
app.use('/', sendMailRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})