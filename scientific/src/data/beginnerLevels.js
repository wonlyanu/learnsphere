export const BEGINNER_LEVELS = [
  // Level 1
  {
    id: 1,
    title: "Introduction to Backend",
    sections: [
      {
        title: "What is Backend?",
        content: `Backend is the server-side of a website or application. It handles data storage, logic, and communication with the frontend. Users don’t see backend directly, but it ensures the website works correctly.

Example:
When you log in to Gmail, the frontend sends credentials to the backend, which verifies them and returns your inbox.`
      },
      {
        title: "Role of Server and Client",
        content: `Client: Browser or app requesting data.
Server: Responds to client requests and processes data.
Interaction = Client-Server Architecture

Example: Typing a URL → browser sends request → server sends webpage.`
      },
      {
        title: "Backend Languages & Frameworks",
        content: `Popular languages: Node.js, Python, Java, PHP, Ruby.
Frameworks: Express.js, Django, Spring.
Example: Node.js + Express handles server-side logic.`
      },
      {
        title: "Summary",
        content: `• Backend = server-side processing
• Handles database, logic, API
• Works behind frontend`
      }
    ],
    codeExample: `const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Backend!');
});
server.listen(3000, () => console.log('Server running at http://localhost:3000'));`,
    questions: [
      { question: "Backend mainly deals with:", options: ["UI", "Server and Database", "Fonts", "HTML"], answer: "Server and Database" },
      { question: "Which part of a website does the user not see?", options: ["Frontend", "Backend", "CSS", "Images"], answer: "Backend" },
      { question: "Example of backend language:", options: ["HTML", "Node.js", "CSS", "Photoshop"], answer: "Node.js" },
      { question: "Backend is also called:", options: ["Client-side", "Server-side", "Frontend", "UI"], answer: "Server-side" },
      { question: "What ensures dynamic functionality like login?", options: ["Backend", "Frontend", "HTML", "CSS"], answer: "Backend" }
    ]
  },
  // Level 2
  {
    id: 2,
    title: "Understanding Servers",
    sections: [
      {
        title: "What is a Server?",
        content: `A server is a computer or software that stores data and serves it to clients on request. Types: Web server, Database server, File server. Handles multiple requests simultaneously.`
      },
      {
        title: "Localhost Concept",
        content: `Localhost = your computer acting as a server during development.
Access via http://localhost:3000`
      },
      {
        title: "Setting Up a Simple Server",
        content: `const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.end('Hello from Localhost!');
});
server.listen(3000, () => console.log('Server running at http://localhost:3000'));`
      },
      {
        title: "Summary",
        content: `• Servers store and send data
• Can be local, remote, or cloud
• Handle client requests
• Localhost is for development`
      }
    ],
    codeExample: `// Example already included in sections`,
    questions: [
      { question: "A server stores and sends:", options: ["Images", "Website data", "CSS", "Fonts"], answer: "Website data" },
      { question: "Localhost refers to:", options: ["Remote database", "Your computer", "Another server", "Cloud only"], answer: "Your computer" },
      { question: "Which handles multiple client requests?", options: ["Frontend", "Server", "Database", "Browser"], answer: "Server" },
      { question: "A cloud server is provided by:", options: ["AWS / Azure", "Node.js", "HTML", "CSS"], answer: "AWS / Azure" },
      { question: "The server responds after:", options: ["Receiving a request", "Writing HTML", "Designing UI", "Changing fonts"], answer: "Receiving a request" }
    ]
  },
  // Level 3
  {
    id: 3,
    title: "Basics of Databases",
    sections: [
      {
        title: "What is a Database?",
        content: `A database is a structured collection of data. Backend uses it to store users, products, posts. Can be SQL (MySQL/PostgreSQL) or NoSQL (MongoDB).`
      },
      {
        title: "CRUD Operations",
        content: `C → Create: Add new data
R → Read: Retrieve data
U → Update: Modify data
D → Delete: Remove data`
      },
      {
        title: "Tables vs Collections",
        content: `Tables (SQL) = structured rows & columns
Collections (NoSQL) = flexible JSON-like documents`
      },
      {
        title: "Summary",
        content: `• Databases store data for backend
• SQL = structured, NoSQL = flexible
• CRUD = core operations`
      }
    ],
    codeExample: `// MongoDB Node.js CRUD example
const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');
async function run() {
  await client.connect();
  const db = client.db('testDB');
  const users = db.collection('users');
  await users.insertOne({name: "Vasantha", age: 20});
  const allUsers = await users.find().toArray();
  console.log(allUsers);
}
run();`,
    questions: [
      { question: "Database stores:", options: ["Code", "Data", "CSS", "Fonts"], answer: "Data" },
      { question: "SQL stands for:", options: ["Structured Query Language", "System Query Language", "Simple Query List", "Server Quick Load"], answer: "Structured Query Language" },
      { question: "Which is a NoSQL database?", options: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"], answer: "MongoDB" },
      { question: "CRUD 'C' stands for:", options: ["Copy", "Create", "Check", "Clean"], answer: "Create" },
      { question: "Tables are used in:", options: ["SQL", "NoSQL", "HTML", "CSS"], answer: "SQL" }
    ]
  },
  // Level 4
  {
    id: 4,
    title: "Node.js Basics",
    sections: [
      {
        title: "What is Node.js?",
        content: `Node.js is a JavaScript runtime for server-side code. Uses event-driven, non-blocking I/O to handle multiple requests efficiently.`
      },
      {
        title: "Running JS on Server",
        content: `Command: node filename.js
Example: console.log("Hello from Node.js!");`
      },
      {
        title: "Modules & npm",
        content: `Modules handle specific tasks (fs, http).
npm installs and manages packages. Example: npm install express`
      },
      {
        title: "Summary",
        content: `• Node.js = JS runtime on server
• Event-driven & non-blocking
• Uses modules & npm for packages`
      }
    ],
    codeExample: `// Using fs module
const fs = require('fs');
fs.writeFileSync('hello.txt', 'Hello Node.js!');
console.log('File created');`,
    questions: [
      { question: "Node.js runs on:", options: ["Browser", "Server", "CSS", "HTML"], answer: "Server" },
      { question: "npm is used to:", options: ["Create websites", "Manage packages", "Design UI", "Edit images"], answer: "Manage packages" },
      { question: "Node.js uses which language?", options: ["Python", "JavaScript", "Java", "Ruby"], answer: "JavaScript" },
      { question: "Node.js is:", options: ["Framework", "Runtime", "Library", "Editor"], answer: "Runtime" },
      { question: "CommonJS is used for:", options: ["Importing modules", "Styling UI", "Writing HTML", "Running Python"], answer: "Importing modules" }
    ]
  },
  // Level 5
  {
    id: 5,
    title: "Express.js Basics",
    sections: [
      {
        title: "What is Express.js?",
        content: `Express.js is a backend framework for Node.js that simplifies building web applications and APIs.
It provides simple methods for routing, middleware, and request handling.`
      },
      {
        title: "Creating a Simple Express App",
        content: `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));`
      },
      {
        title: "Routes and Endpoints",
        content: `Route: Path on the server that listens to a request, e.g., /login or /users.
Endpoint: Function that runs when a request hits the route.
Example:
app.get('/users', (req, res) => res.send('All Users'));`
      },
      {
        title: "Handling HTTP Requests (CRUD)",
        content: `GET → Retrieve data
POST → Add data
PUT → Update data
DELETE → Remove data`
      }
    ],
    codeExample: `const express = require('express');
const app = express();

app.get('/tasks', (req,res) => res.send('Read tasks'));
app.post('/tasks', (req,res) => res.send('Add task'));
app.put('/tasks/:id', (req,res) => res.send('Update task'));
app.delete('/tasks/:id', (req,res) => res.send('Delete task'));

app.listen(3000, ()=>console.log('Server running'));`,
    questions: [
      { question: "Express.js is:", options: ["Database", "Framework", "HTML", "CSS"], answer: "Framework" },
      { question: "Express works with:", options: ["Node.js", "Python", "Java", "Ruby"], answer: "Node.js" },
      { question: "A route in Express handles:", options: ["CSS styling", "HTTP request", "Database only", "Frontend layout"], answer: "HTTP request" },
      { question: "Express helps in:", options: ["Creating server fast", "Designing UI", "Editing images", "Writing CSS"], answer: "Creating server fast" },
      { question: "Method to send data to server is:", options: ["POST", "GET", "PUT", "DELETE"], answer: "POST" }
    ]
  },
  // Level 6
  {
    id: 6,
    title: "Middleware & JSON Handling",
    sections: [
      {
        title: "What is Middleware?",
        content: `Middleware is a function that executes during the request-response cycle in Express.
It can modify request/response objects, perform authentication, logging, or handle errors.`
      },
      {
        title: "Parsing JSON Requests",
        content: `Express doesn’t parse JSON automatically; use express.json() middleware.
Example:
app.use(express.json());
app.post('/users', (req, res) => console.log(req.body));`
      },
      {
        title: "Using Middleware for Validation",
        content: `Middleware can check for valid input.
Example: Ensure username exists in POST request:
app.use('/users', (req,res,next) => {
  if(!req.body.name) return res.status(400).send('Name required');
  next();
});`
      }
    ],
    codeExample: `const express = require('express');
const app = express();

app.use((req, res, next) => {
  console.log(\`\${req.method} request to \${req.url}\`);
  next();
});

app.use(express.json());

app.post('/users', (req,res) => res.send('User data received'));

app.listen(3000, () => console.log('Server running'));`,
    questions: [
      { question: "Middleware executes:", options: ["Before response", "After server shutdown", "Only on GET", "Only for database"], answer: "Before response" },
      { question: "express.json() is used to:", options: ["Parse HTML", "Parse JSON", "Parse CSS", "Parse SQL"], answer: "Parse JSON" },
      { question: "Middleware can:", options: ["Log requests", "Modify data", "Authenticate users", "All of the above"], answer: "All of the above" },
      { question: "To use middleware globally:", options: ["app.use()", "app.get()", "app.post()", "app.listen()"], answer: "app.use()" },
      { question: "Missing input in request can be handled by:", options: ["Middleware", "HTML", "CSS", "Frontend JS"], answer: "Middleware" }
    ]
  },
  // Level 7
  {
    id: 7,
    title: "CRUD APIs",
    sections: [
      {
        title: "What is an API?",
        content: `API (Application Programming Interface) allows two applications to communicate.
Backend APIs respond to client requests with data in JSON or XML format.`
      },
      {
        title: "Creating RESTful CRUD API",
        content: `C → Create → POST /users
R → Read → GET /users
U → Update → PUT /users/:id
D → Delete → DELETE /users/:id`
      },
      {
        title: "Small Program Example",
        content: `const express = require('express');
const app = express();
app.use(express.json());

let users = [];
app.post('/users', (req,res) => { users.push(req.body); res.send('User added'); });
app.get('/users', (req,res) => res.json(users));
app.put('/users/:id', (req,res) => { const id = parseInt(req.params.id); users[id] = req.body; res.send('User updated'); });
app.delete('/users/:id', (req,res) => { const id = parseInt(req.params.id); users.splice(id,1); res.send('User deleted'); });

app.listen(3000, ()=>console.log('Server running'));`
      }
    ],
    codeExample: `// Example already included in sections`,
    questions: [
      { question: "API stands for:", options: ["Application Programming Interface", "Advanced Page Input", "Automated Program Interface", "Application Page Index"], answer: "Application Programming Interface" },
      { question: "HTTP method to add data:", options: ["GET", "POST", "PUT", "DELETE"], answer: "POST" },
      { question: "HTTP method to remove data:", options: ["POST", "DELETE", "GET", "PUT"], answer: "DELETE" },
      { question: "RESTful API returns data in:", options: ["JSON", "CSS", "HTML", "JPEG"], answer: "JSON" },
      { question: "Updating data in REST API uses:", options: ["POST", "GET", "PUT", "DELETE"], answer: "PUT" }
    ]
  },
  // Level 8
  {
    id: 8,
    title: "Authentication Basics",
    sections: [
      {
        title: "Why Authentication is Important",
        content: `Ensures only authorized users access the application.
Example: Login required to view profile or purchase items.`
      },
      {
        title: "Using JWT (JSON Web Token)",
        content: `JWT is a token-based authentication system.
Server generates token after login → client stores it → sends with each request.`
      },
      {
        title: "Protecting Routes",
        content: `function authMiddleware(req,res,next){
  const token = req.headers['authorization'];
  if(!token) return res.status(401).send('Access denied');
  try { req.user = jwt.verify(token, secret); next(); } catch(err){ res.status(400).send('Invalid token'); }
}

app.get('/profile', authMiddleware, (req,res)=>{ res.send(\`Hello \${req.user.username}\`); });`
      }
    ],
    codeExample: `const jwt = require('jsonwebtoken');
const secret = "mysecret";

const token = jwt.sign({username: "Vasantha"}, secret);
console.log(token);

const data = jwt.verify(token, secret);
console.log(data);`,
    questions: [
      { question: "Authentication ensures:", options: ["Security", "Design", "Styling", "Database only"], answer: "Security" },
      { question: "JWT stands for:", options: ["Java Web Token", "JSON Web Token", "JavaScript Web Token", "JSON Wide Token"], answer: "JSON Web Token" },
      { question: "Token is stored:", options: ["On client", "On server only", "In CSS", "In HTML"], answer: "On client" },
      { question: "Protected route is accessed by:", options: ["Anyone", "Authorized users", "CSS", "HTML"], answer: "Authorized users" },
      { question: "Middleware for auth is used to:", options: ["Verify token", "Design UI", "Store images", "Change HTML"], answer: "Verify token" }
    ]
  },
  // Level 9
  {
    id: 9,
    title: "Deployment Basics",
    sections: [
      {
        title: "Why Deployment is Needed",
        content: `Deployment makes your backend app accessible online.
Example: Hosting on Heroku, Render, or AWS.`
      },
      {
        title: "Steps for Deployment",
        content: `Push code to GitHub → Connect repo to hosting → Install dependencies → Start backend app`
      },
      {
        title: "Environment Variables",
        content: `Store secrets like DB credentials or JWT secret in .env file.
Access in Node.js using process.env.SECRET`
      }
    ],
    codeExample: `// Deployment example: Heroku commands
heroku login
git init
git add .
git commit -m "Initial commit"
heroku create
git push heroku main`,
    questions: [
      { question: "Deployment means:", options: ["Making app online", "Running locally", "Designing UI", "Writing CSS"], answer: "Making app online" },
      { question: "Environment variables store:", options: ["Secrets", "HTML", "CSS", "Images"], answer: "Secrets" },
      { question: "Hosting services example:", options: ["Heroku", "Photoshop", "Chrome", "VS Code"], answer: "Heroku" },
      { question: "GitHub is used for:", options: ["Hosting backend", "Writing CSS", "Editing HTML", "Designing UI"], answer: "Hosting backend" },
      { question: "App is started online using:", options: ["git commit", "heroku push", "npm start", "node app.css"], answer: "npm start" }
    ]
  },
  // Level 10
  {
    id: 10,
    title: "Introduction to Security",
    sections: [
      {
        title: "Why Security Matters",
        content: `Protects data from hackers, ensures user privacy, prevents unauthorized access.`
      },
      {
        title: "Common Security Measures",
        content: `• Use HTTPS
• Validate input to prevent injections
• Hash passwords (bcrypt)
• Avoid exposing secrets`
      },
      {
        title: "Example: Password Hashing",
        content: `const bcrypt = require('bcrypt');
const password = "123456";
const hash = bcrypt.hashSync(password, 10);
console.log(hash);

const valid = bcrypt.compareSync("123456", hash);
console.log(valid);`
      }
    ],
    codeExample: `// Example included in sections`,
    questions: [
      { question: "Security in backend prevents:", options: ["Hacking", "Styling errors", "HTML issues", "CSS errors"], answer: "Hacking" },
      { question: "HTTPS ensures:", options: ["Encrypted data", "Fast loading", "CSS styling", "HTML only"], answer: "Encrypted data" },
      { question: "Password hashing uses:", options: ["bcrypt", "JSON", "Node.js", "Express"], answer: "bcrypt" },
      { question: "Validate inputs prevents:", options: ["Injection attacks", "UI design", "Frontend errors", "CSS issues"], answer: "Injection attacks" },
      { question: "Secrets should be stored in:", options: [".env file", "HTML", "CSS", "Frontend JS"], answer: ".env file" }
    ]
  }
];

