// backend/server.js (For ReWear Project - Simple File Storage - NO JWT/BCRYPT)
require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const fs = require('fs/promises'); // For asynchronous file operations
const path = require('path');     // For resolving file paths
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

const app = express();
const PORT = process.env.PORT || 5000; // Server port

// Path to your users data file
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Middleware
app.use(express.json()); // Body parser for JSON requests
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from your React app
}));

// --- Helper functions for file operations ---
const readUsers = async () => {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') { // File not found, return empty array
            return [];
        }
        console.error('Error reading users file:', error);
        throw error;
    }
};

const writeUsers = async (users) => {
    // Write the users array to the JSON file, formatted nicely
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
};

// --- API Routes ---

// @route   POST /api/register
// @desc    Register a new user (plain text password storage for simplicity - NOT SECURE)
// @access  Public
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    try {
        const users = await readUsers();

        // Check if user or email already exists
        const userExists = users.some(u => u.username === username || u.email === email);
        if (userExists) {
            return res.status(400).json({ message: 'User with this username or email already exists' });
        }

        // Create new user object (PASSWORD STORED IN PLAIN TEXT - VERY INSECURE!)
        const newUser = {
            id: uuidv4(), // Generate a unique ID for the user
            username,
            email,
            password, // !!! WARNING: Storing plain text password !!!
            points: 0, // Default points
            role: 'user', // Default role
            registeredAt: new Date().toISOString()
        };

        users.push(newUser);
        await writeUsers(users); // Save updated users array to file

        console.log('User registered:', newUser.username);
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: newUser.id, username: newUser.username, email: newUser.email, points: newUser.points, role: newUser.role }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// @route   POST /api/login
// @desc    Authenticate user (plain text password comparison - NOT SECURE)
// @access  Public
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter both email and password' });
    }

    try {
        const users = await readUsers();
        // Find user by email and plain text password (!!! INSECURE !!!)
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('User logged in:', user.username);
        res.json({
            message: 'Logged in successfully',
            user: { id: user.id, username: user.username, email: user.email, points: user.points, role: user.role }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Root route for server health check
app.get('/', (req, res) => {
    res.send('ReWear Backend Server is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`ReWear Backend Server running on http://localhost:${PORT}`);
    console.log(`Frontend (React App) should be running on http://localhost:3000`);
});