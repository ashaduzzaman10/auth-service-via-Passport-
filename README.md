# auth-service-via-Passport-
## Table of Contents
- [auth-service-via-Passport-](#auth-service-via-passport-)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Project Setup](#project-setup)
  - [Usage](#usage)

## Introduction
This project demonstrates how to set up an authentication service using Passport.js with MongoDB.

## Project Setup
1. **Clone the repository:**
  ```bash
  https://github.com/ashaduzzaman10/auth-service-via-Passport-.git
  ```
2. **Navigate to the project directory:**
  ```bash
  cd auth-service-via-Passport
  ```
3. **Install dependencies:**
  ```bash
  npm install
  ```
4. **Set up environment variables:**
  Create a `.env` file in the root directory and add the following:
  ```
  MONGO_URI=your_mongodb_connection_string
  SESSION_SECRET=your_session_secret
  ```
5. **Run the application:**
  ```bash
  npm start
  ```

## Usage
1. **Register a new user:**
  Send a POST request to `/register` with the following JSON payload:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
2. **Login with an existing user:**
  Send a POST request to `/login` with the following JSON payload:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
3. **Access a protected route:**
  Send a GET request to `/protected` with the user's session cookie.