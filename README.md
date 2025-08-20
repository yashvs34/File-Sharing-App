## INTRODUCTION
File-Sharing app to manage and share files.


## ✨ FEATURES
* File-Sharing via email
* File-upload on Cloudinary
* Short-Id generation for generating shortened url
* Cron-Job for clearing expired files from DB
* Deployed on Microsoft Azure
* Using NGINX for reverse proxy and Certbot for automatic SSL certificate generation for HTTPS delivery
* Configured on custom .me domain


## 🛠 TECH STACK
**Frontend**
- React.js
- OGL Library
- Recoil
- Axios API

**Backend**
- Node.js
- Express.js
- Nodemon
- Bcrypt
- JWT
- Multer
- Express-rate-limitter
- Express-router
- Node-Cron
- Nodemailer
  

**Database**
- Mongoose
- MongoDB
- Cloudinary

**Deployment**
- Microsoft Azure
- NGINX
- .me Domain from Namecheap

**SSL Certificate**
- Certbot

## 🏗️ ARCHITECTURE OVERVIEW
<img width="1106" height="553" alt="Screenshot 2025-08-20 122851" src="https://github.com/user-attachments/assets/8613f387-1d77-4cb7-88fd-28eea090409e" />

<img width="2446" height="2220" alt="image" src="https://github.com/user-attachments/assets/9451dd9b-963a-49e1-92bd-215cc880c4ee" />



## 🧑‍💻 LOCAL INSTALLATION & SETUP
> ⚠️ Make sure to set up the `.env` file.  
> .env file must contain **MONGODB_URI**, **PORT**, **MAIL_USERNAME**, **MAIL_PASSWORD**, **CLOUD_NAME**, **API_KEY**, **API_SECRET**, **JWT_SECRET**
> Kindly note : If you want to run on your own backend, then you will have to change the api calls in frontend to your custom api
```bash
cd backend        # Move to backend folder
npm install       # Install required dependencies
node server.js     # Start backend server on specified PORT in .env file (https://localhost:PORT)
 
cd ..             # Move back to root folder
cd frontend       # Move to frontend folder
npm install       # Install required dependencies
npm run dev       # Start frontend on port 5173 (https://localhost:5173)
```


## 📝 DESCRIPTION
- You can upload files (please see file types can only be pdf or image)
- During uploading you can also set up a date for file expiry
- After uploading and refreshing you can see your uploaded file name
- You can also share the file to your friends via email and they will get a shortened url for the file you shared
- Node-cron will automatically delete file from database after expiry date has arrived

## 🔮 FUTURE SCOPES
- Using Redis for caching for improving response time in url shortner
- Adding more file handling features like deleting the file, updating expiry date etc.
- Not only deleting record from database but also deleting from cloudinary
- Implementing Google signin and signup
