const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
    user: 'postgres',      // PostgreSQL username
    host: 'localhost',             // Database host (use 'localhost' if running on your machine)
    database: 'nodejwt',      // Name of the PostgreSQL database you are connecting to
    password: 'Sumit@611',  // The password for the PostgreSQL user
    port: 5432                     // The PostgreSQL server port (default is 5432)
  });
const JWT_SECRET = 'your_jwt_secret'; // change it

app.use(cors());
app.use(bodyParser.json());

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided.');
  
  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token.');
    req.userId = decoded.id;
    next();
  });
};

// Register
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  
  try {
    const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id', 
      [username, email, hashedPassword]);
    const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ auth: true, token });
  } catch (err) {
    res.status(500).send('Error creating user.');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ auth: true, token, user });
  } catch (err) {
    res.status(500).send('Error logging in.');
  }
});

// Get user data
app.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [req.userId]);
    res.status(200).send(result.rows[0]);
  } catch (err) {
    res.status(500).send('Error fetching user data.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
