
require('dotenv').config();
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGODB_URI);

function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, function (char) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char];
    });
}

async function startServer() {
    await client.connect();
    console.log('Connected to MongoDB Atlas!');

    const db = client.db('collegeDB');
    const users = db.collection('users');

    const server = http.createServer((req, res) => {

        if (req.url === '/' && req.method === 'GET') {
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            });

            fs.createReadStream(
                path.join(__dirname, 'home.html')
            ).pipe(res);
        }

        else if (req.url === '/server' && req.method === 'POST') {
            let rawData = '';

            req.on('data', (chunk) => {
                rawData += chunk;
            });

            req.on('end', async () => {
                try {
                    const formData = new URLSearchParams(rawData);

                    const user = {
                        name: formData.get('name'),
                        age: Number(formData.get('age')),
                        email: formData.get('email')
                    };

                    if (
                        !user.name ||
                        !Number.isInteger(user.age) ||
                        user.age <= 0 ||
                        !user.email
                    ) {
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        });
                        return res.end('Please enter valid details.');
                    }

                    await users.insertOne(user);

                    res.writeHead(200, {
                        'Content-Type': 'text/html; charset=utf-8'
                    });

                    res.end(`
                        <h1>User Submitted Details</h1>
                        <p>Name: ${escapeHTML(user.name)}</p>
                        <p>Age: ${user.age}</p>
                        <p>Email: ${escapeHTML(user.email)}</p>
                        <h3>Registration saved successfully!</h3>
                        <a href="/">Back to form</a>
                    `);

                    console.log('User saved to MongoDB!');
                } catch (error) {
                    console.error(error);

                    if (!res.headersSent) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                    }

                    res.end('Error saving registration. Check the server terminal.');
                }
            });
        }

        else {
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            res.end('Page not found');
        }
    });

    server.listen(2000, () => {
        console.log('Server running at http://localhost:2000');
    });
}

startServer().catch((error) => {
    console.error('Could not start the application:', error.message);
});