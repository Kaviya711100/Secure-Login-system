Secure Login & Signup System
Project Overview

This is a secure login and signup system built using Node.js, Express, MongoDB, Mongoose, bcrypt, and zxcvbn.
It enforces strong password policies, hashes passwords before storing, and provides real-time password strength feedback to users.

Features

User signup with password validation:

Minimum 8 characters

At least 1 uppercase letter

At least 1 number

At least 1 special character

Password strength meter using zxcvbn

Secure password hashing using bcrypt

Login authentication

Frontend and backend validation

Responsive and clean UI with CSS

Tech Stack
Technology	Purpose
Node.js	Backend runtime
Express.js	Web framework for routing & middleware
MongoDB	Database to store user data
Mongoose	ODM for MongoDB
bcrypt	Hashing passwords securely
zxcvbn	Password strength estimation
EJS	Templating engine for dynamic HTML
HTML/CSS/JS	Frontend UI & password validation


Project Structure

secure-login/
├── server.js           # Backend server
├── models/
│   └── User.js         # MongoDB user schema
└── views/
    ├── signup.ejs      # Signup page with password strength
    └── login.ejs       # Login page


    
💻 Usage


Navigate to /signup to create a new account.

Enter a strong password following the rules.

Navigate to /login to log in with your credentials.




🔑 Password Rules
Minimum 8 characters

At least 1 uppercase letter

At least 1 number

At least 1 special character

Note: Password strength is checked using zxcvbn and shown as a progress bar.




📚 Important Terms
Hashing: One-way encryption for password security

Salt: Random data added before hashing

Entropy: Measure of password unpredictability

Middleware: Functions in Express that process requests

Session: Tracks user login state

Rate Limiting: Prevents brute-force login attacks



