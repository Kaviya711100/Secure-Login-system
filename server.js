const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const zxcvbn = require('zxcvbn');
const User = require('./models/User');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/secureLogin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.redirect('/signup'));
app.get('/signup', (req, res) => res.render('signup', { message: null }));
app.get('/login', (req, res) => res.render('login', { message: null }));

// Password validation function
function validatePassword(password) {
  const upperCase = /[A-Z]/;
  const number = /[0-9]/;
  const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
  const minLength = 8;

  if (password.length < minLength) return "Password must be at least 8 characters.";
  if (!upperCase.test(password)) return "Password must contain at least 1 uppercase letter.";
  if (!number.test(password)) return "Password must contain at least 1 number.";
  if (!specialChar.test(password)) return "Password must contain at least 1 special character.";

  return null; // valid password
}

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  // Custom validation
  const customError = validatePassword(password);
  if (customError) return res.render('signup', { message: `❌ ${customError}` });

  // zxcvbn check
  const result = zxcvbn(password);
  if (result.score < 3) return res.render('signup', { message: '❌ Password too weak! Follow suggestions.' });

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.send('✅ Signup successful! <a href="/login">Go to Login</a>');
  } catch (err) {
    console.error(err);
    res.render('signup', { message: '⚠️ Username already exists or server error.' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.render('login', { message: '❌ User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.render('login', { message: '❌ Invalid password' });

    res.send(`✅ Welcome, ${username}!`);
  } catch (err) {
    console.error(err);
    res.render('login', { message: '⚠️ Server error. Try again.' });
  }
});

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
