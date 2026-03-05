const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { getDb } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'metrimend_super_secret_key';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '')));

// --- Middlewares ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- Authentication Endpoints ---
app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const db = await getDb();
        const existingUser = await db.get('SELECT id FROM users WHERE username = ?', [username]);
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, hashedPassword]);

        const token = jwt.sign({ id: result.lastID, username }, SECRET_KEY, { expiresIn: '24h' });
        res.status(201).json({ token, username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = await getDb();
        const user = await db.get('SELECT * FROM users WHERE username = ?', [username]);

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '24h' });
        res.json({ token, username: user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// --- Health Records Endpoints ---
app.post('/api/records', authenticateToken, async (req, res) => {
    try {
        const { tool_name, result_data } = req.body;
        if (!tool_name || !result_data) {
            return res.status(400).json({ error: 'Tool name and result data required' });
        }

        const db = await getDb();
        const result = await db.run(
            'INSERT INTO records (user_id, tool_name, result_data) VALUES (?, ?, ?)',
            [req.user.id, tool_name, JSON.stringify(result_data)]
        );
        res.status(201).json({ id: result.lastID, message: 'Record saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/records', authenticateToken, async (req, res) => {
    try {
        const db = await getDb();
        const records = await db.all(
            'SELECT id, tool_name, result_data, created_at FROM records WHERE user_id = ? ORDER BY created_at DESC',
            [req.user.id]
        );
        const formattedRecords = records.map(r => ({
            ...r,
            result_data: JSON.parse(r.result_data)
        }));
        res.json(formattedRecords);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve frontend fallback
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'index.htm'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
