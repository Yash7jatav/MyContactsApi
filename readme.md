# MyContactsBackend

## 📌 Overview

MyContactsBackend is a RESTful API built using Node.js, Express, and Sequelize for contact management. This API provides user authentication, CRUD operations, and JWT security to ensure secure access. 🚀

## 🚀 Features

✅ **User Authentication** (Register, Login, JWT-based authentication)  
✅ **CRUD operations for Contacts** (Create, Read, Update, Delete)  
✅ **Middleware for Secure Routes**  
✅ **Validation for User and Contact Data**  
✅ **Testing with Jest & Supertest**

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite (Sequelize ORM)
- **Authentication:** JWT
- **Testing:** Jest, Supertest
- **Environment Variables:** dotenv

---

## 📢 API Endpoints

### **User Routes**

| Method   | Endpoint              | Description         |
| -------- | --------------------- | ------------------- |
| **POST** | `/api/users/register` | Register a new user |
| **POST** | `/api/users/login`    | Login & get a token |
| **GET**  | `/api/users/current`  | Get current user    |

### **Contact Routes**

| Method     | Endpoint                   | Description        |
| ---------- | -------------------------- | ------------------ |
| **POST**   | `/api/contacts/`           | Create new contact |
| **GET**    | `/api/contacts/`           | Get all contacts   |
| **GET**    | `/api/contacts/:id`        | Get contact by ID  |
| **PUT**    | `/api/contacts/update/:id` | Update contact     |
| **DELETE** | `/api/contacts/delete/:id` | Delete contact     |

---

## 🔧 Installation & Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Yash7jatav/MyContactsApi.git
   cd MyContactsBackend

   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file in the root directory and add:

   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   DB_FILE=sqlite:./database.sqlite
   NODE_ENV=development
   ```

4. **Run the server:**

   ```sh
   npm start
   ```

   The API will be running on `http://localhost:3000`

5. **Run tests:**
   ```sh
   npm test
   ```

---

## 📌 Usage Instructions

- Use tools like **Postman** or **cURL** to test API endpoints.
- Include the JWT token in headers for protected routes:
  ```sh
  Authorization: Bearer YOUR_TOKEN_HERE
  ```

---

## 🌱 Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

✨ **Author**  
👨‍💻 Yash Jatav  
🔗 GitHub: [Yash7jatav](https://github.com/Yash7jatav)
