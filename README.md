# Blog App

Simple blog web application for Automation Testing course.

## Features

- User registration
- Login / Logout
- Password reset
- User profile
- Create posts
- Add comments
- Search posts
- Minimalist design

## Technologies

- Node.js
- Express.js
- MongoDB
- EJS
- Express Session
- bcrypt

## Installation

```bash
npm install
```

Create .env file:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/blogapp
SESSION_SECRET=supersecretkey
```

Run:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Project structure

- models/
- routes/
- middleware/
- views/
- public/

## Author

Maksym