# 👨‍💼 Client Manager for Freelancers

A full-stack web application built to help freelancers manage their clients and projects efficiently. This app supports client profiles, project tracking, authentication, file uploads, and more.

---

## 🚀 Features

- 🔐 **Authentication** using Passport.js
- 📂 **Client and Project Management**
- 🖼️ **File Uploads** with Multer
- 🗂️ **Profile Editing & Project Status Control**
- ☁️ **MongoDB Atlas** for cloud-based storage
- 🧩 **Modular Codebase** with MVC architecture
- ✨ **Flash messages** for better UX
- 💡 **Bootstrap & FontAwesome** for styling

---

## 📁 Folder Structure

Client-Manager-for-Freelancers/
│
├── config/ # Database and Multer configurations
│ ├── data.js
│ ├── development.json
│ ├── index.js
│ └── multer-config.js
│
├── controllers/ # Route logic
│ ├── authController.js
│ └── clientController.js
│
├── middlewares/ # Custom middleware
│ └── isLoggedIn.js
│
├── models/ # Mongoose models
│ ├── client.js
│ ├── project.js
│ └── user.js
│
├── public/ # Static files
│ └── css/
│
├── routes/ # Express route definitions
│ ├── client.js
│ ├── index.js
│ └── users.js
│
├── views/ # EJS templates
│ ├── includes/
│ │ ├── footer.ejs
│ │ └── navbar.ejs
│ ├── layouts/
│ │ └── boilerplate.ejs
│ ├── addProject.ejs
│ ├── clientForm.ejs
│ ├── clientProfile.ejs
│ ├── editProfile.ejs
│ ├── index.ejs
│ ├── profile.ejs
│ └── userProfile.ejs
│
├── .env # Environment variables
├── .gitignore
├── app.js # Main Express server
├── ejs-mate.d.ts # EJS-Mate module declaration
├── package.json
└── README.md # You're here!


---

## 🛠️ Tech Stack

| Layer        | Technology                       |
|--------------|----------------------------------|
| Frontend     | EJS, Bootstrap, FontAwesome      |
| Backend      | Express.js, Node.js              |
| Database     | MongoDB Atlas                    |
| Authentication | Passport.js with LocalStrategy |
| File Uploads | Multer                           |
| Templating   | EJS with EJS-Mate for layouts    |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
git clone https://github.com/SachidanandSharma2162/client-manager-for-freelancers.git
cd client-manager-for-freelancers

### 2. Install Dependencies
npm install

### 3. Create a .env file
PORT=8080
DB_USERNAME=your_mongo_atlas_db_username
DB_PASSWORD=your_mongo_atlas_db_password

### 4. Run the app
npm run dev

---

👥 Contributors
A huge thanks to everyone who contributed to this project!
https://github.com/ruchika123yadav

Made with ❤️ by Freelancers, for Freelancers.
