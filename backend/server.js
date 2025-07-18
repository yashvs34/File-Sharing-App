const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./configs/mongodbConnections');
const fileUploadRoute = require('./routes/fileUploadRoute');
const sendMailRoute = require('./routes/sendMailRoute');
const signupRoute = require('./routes/signupRoute');
const signinRoute = require('./routes/signinRoute');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    connectDB();
    res.send("Welcome to File-Sharing-App");
});

app.use('/', signupRoute);
app.use('/', signinRoute);
app.use('/', fileUploadRoute);
app.use('/', sendMailRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})