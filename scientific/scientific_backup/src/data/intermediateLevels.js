export const INTERMEDIATE_LEVELS = [
  // Level 1
  {
    id: 1,
    title: "Advanced Node.js Concepts",
    sections: [
      {
        title: "Event Loop and Asynchronous Programming",
        content: `Node.js is single-threaded but can handle multiple operations concurrently using the event loop and non-blocking I/O.
The event loop continuously checks the callback queue and executes pending callbacks, making Node.js efficient for I/O-intensive apps.
Asynchronous programming allows functions to run without blocking the code execution.`
      },
      {
        title: "Small Program Example",
        content: `const fs = require('fs');

console.log('Start reading files...');

fs.readFile('file1.txt', 'utf-8', (err, data) => {
  if(err) throw err;
  console.log('File 1 read');
});

fs.readFile('file2.txt', 'utf-8', (err, data) => {
  if(err) throw err;
  console.log('File 2 read');
});

console.log('End of script');`
      },
      {
        title: "Explanation",
        content: `Console logs 'Start reading files...' and 'End of script' first while files are read asynchronously.`
      }
    ],
    questions: [
      { question: "Node.js is:", options: ["Multi-threaded", "Single-threaded", "Only frontend", "Only database"], answer: "Single-threaded" },
      { question: "Event loop handles:", options: ["I/O asynchronously", "CSS", "HTML", "Images"], answer: "I/O asynchronously" },
      { question: "Which logs first?", options: ["File 1 content", "File 2 content", "console.log('Start reading files...')", "None"], answer: "console.log('Start reading files...')" },
      { question: "Blocking code in Node.js slows:", options: ["Server", "Browser", "Database", "HTML"], answer: "Server" },
      { question: "Callback functions run:", options: ["Immediately", "After event", "Never", "Only on frontend"], answer: "After event" }
    ]
  },
  // Level 2
  {
    id: 2,
    title: "RESTful API Design Principles",
    sections: [
      {
        title: "What is REST",
        content: `REST (Representational State Transfer) is an architectural style for designing APIs.
Uses HTTP methods: GET, POST, PUT/PATCH, DELETE.
REST APIs are stateless; each request contains all necessary info.`
      },
      {
        title: "Small Program Example",
        content: `const express = require('express');
const app = express();

app.get('/products', (req, res) => {
  res.json([{id:1, name:'Shoes'}, {id:2, name:'Shirt'}]);
});

app.listen(3000, ()=> console.log('Server running'));`
      },
      {
        title: "Explanation",
        content: `/products endpoint returns a JSON array of products.`
      }
    ],
    questions: [
      { question: "REST APIs are:", options: ["Stateful", "Stateless", "Only GET", "Only POST"], answer: "Stateless" },
      { question: "HTTP method to remove data:", options: ["GET", "POST", "DELETE", "PUT"], answer: "DELETE" },
      { question: "Each REST request is:", options: ["Independent", "Dependent", "Only frontend", "Only CSS"], answer: "Independent" },
      { question: "REST APIs use:", options: ["HTML", "HTTP", "CSS", "Java"], answer: "HTTP" },
      { question: "Example of REST API response format:", options: ["HTML", "JSON", "CSS", "TXT"], answer: "JSON" }
    ]
  },
  // Level 3
  {
    id: 3,
    title: "Database Relationships",
    sections: [
      {
        title: "One-to-One, One-to-Many, Many-to-Many",
        content: `Understanding relationships is critical for backend apps.
One-to-One: User ↔ Profile
One-to-Many: User → Posts
Many-to-Many: Students ↔ Courses
Proper relationships prevent redundancy and improve querying efficiency.`
      },
      {
        title: "Small Program Example (SQL)",
        content: `CREATE TABLE users(
  id INT PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE posts(
  id INT PRIMARY KEY,
  user_id INT,
  title VARCHAR(100),
  FOREIGN KEY(user_id) REFERENCES users(id)
);`
      },
      {
        title: "Explanation",
        content: `user_id in posts table links to users table → One-to-Many relationship.`
      }
    ],
    questions: [
      { question: "One-to-Many example:", options: ["User → Multiple posts", "User → One profile", "Multiple users → One profile", "Post → One category"], answer: "User → Multiple posts" },
      { question: "Many-to-Many example:", options: ["Student ↔ Courses", "User → Profile", "Product → Price", "Post → Category"], answer: "Student ↔ Courses" },
      { question: "Foreign key links:", options: ["Tables", "CSS", "HTML", "Images"], answer: "Tables" },
      { question: "One-to-One example:", options: ["User ↔ Profile", "User → Multiple posts", "Students ↔ Courses", "Product → Orders"], answer: "User ↔ Profile" },
      { question: "Many-to-Many needs:", options: ["Join table", "Single table", "CSS file", "Frontend"], answer: "Join table" }
    ]
  },
  // Level 4
  {
    id: 4,
    title: "Authentication & Authorization",
    sections: [
      {
        title: "Authentication vs Authorization",
        content: `Authentication verifies identity (login/password).
Authorization checks permissions (who can access which resource).`
      },
      {
        title: "Small Program Example",
        content: `function isAdmin(req,res,next){
  if(req.user.role !== 'admin') return res.status(403).send('Access denied');
  next();
}`
      },
      {
        title: "Explanation",
        content: `Middleware checks if user has admin rights before accessing certain routes.`
      }
    ],
    questions: [
      { question: "Authentication verifies:", options: ["Identity", "Role", "CSS", "HTML"], answer: "Identity" },
      { question: "Authorization checks:", options: ["User identity", "Permissions", "Frontend", "Database"], answer: "Permissions" },
      { question: "JWT token is used for:", options: ["Authentication", "CSS", "HTML", "Images"], answer: "Authentication" },
      { question: "Role-based access example:", options: ["Admin only", "Everyone", "CSS file", "HTML file"], answer: "Admin only" },
      { question: "Middleware in auth is used to:", options: ["Validate token", "Run frontend", "Manage CSS", "HTML only"], answer: "Validate token" }
    ]
  },
  // Level 5
  {
    id: 5,
    title: "Error Handling & Logging",
    sections: [
      {
        title: "Error Handling",
        content: `Use try-catch blocks in Node.js/Express to catch runtime errors and respond with meaningful messages.
Always send proper HTTP status codes.`
      },
      {
        title: "Logging",
        content: `Tracks requests, errors, and server activity.
Popular modules: morgan, winston.`
      },
      {
        title: "Small Program Example",
        content: `app.get('/users/:id', (req,res) => {
  try {
    const user = users[req.params.id];
    if(!user) throw new Error('User not found');
    res.send(user);
  } catch(err) {
    res.status(404).send(err.message);
  }
});

const morgan = require('morgan');
app.use(morgan('tiny'));`
      }
    ],
    questions: [
      { question: "Error handling uses:", options: ["try-catch", "HTML", "CSS", "Images"], answer: "try-catch" },
      { question: "404 status code means:", options: ["OK", "Not Found", "Server Error", "Unauthorized"], answer: "Not Found" },
      { question: "Logging helps to:", options: ["Track requests", "Change frontend", "Design UI", "Write CSS"], answer: "Track requests" },
      { question: "Module for logging:", options: ["Morgan", "Express", "Node.js", "MongoDB"], answer: "Morgan" },
      { question: "Errors should return:", options: ["Status code", "Only HTML", "CSS", "Images"], answer: "Status code" }
    ]
  },
  // Level 6
  {
    id: 6,
    title: "Database Indexing & Optimization",
    sections: [
      {
        title: "Indexing",
        content: `Indexing improves query performance by reducing records scanned.
Types: Single-field, Compound, Unique.`
      },
      {
        title: "Query Optimization",
        content: `Select only required columns, limit rows, avoid unnecessary joins.`
      },
      {
        title: "Small Program Example (SQL)",
        content: `CREATE INDEX idx_email ON users(email);`
      }
    ],
    questions: [
      { question: "Indexing improves:", options: ["Query speed", "CSS", "HTML", "Frontend"], answer: "Query speed" },
      { question: "Single-field index example:", options: ["Index on email", "Index on multiple tables", "CSS file", "HTML file"], answer: "Index on email" },
      { question: "Optimized query uses:", options: ["SELECT *", "SELECT specific columns", "DELETE", "PUT"], answer: "SELECT specific columns" },
      { question: "Compound index:", options: ["Multiple columns", "Single column", "CSS", "HTML"], answer: "Multiple columns" },
      { question: "Query optimization reduces:", options: ["Server load", "HTML errors", "CSS issues", "Frontend bugs"], answer: "Server load" }
    ]
  },
  // Level 7
  {
    id: 7,
    title: "Advanced CRUD Operations",
    sections: [
      {
        title: "Bulk Operations",
        content: `Perform CRUD on multiple records at once. Useful for batch updates/deletions.`
      },
      {
        title: "Soft Delete",
        content: `Instead of deleting, mark records as inactive to prevent accidental loss.`
      },
      {
        title: "Small Program Example (MongoDB)",
        content: `// Update multiple users
users.updateMany({active:true}, {$set:{status:'verified'}});
// Soft delete example
users.updateOne({_id:id}, {$set:{deleted:true}});`
      }
    ],
    questions: [
      { question: "Bulk operations are used for:", options: ["Multiple records", "Single record", "CSS", "HTML"], answer: "Multiple records" },
      { question: "Soft delete prevents:", options: ["Accidental deletion", "Fast queries", "HTML errors", "CSS issues"], answer: "Accidental deletion" },
      { question: "MongoDB updateMany affects:", options: ["One record", "Multiple records", "CSS", "HTML"], answer: "Multiple records" },
      { question: "Soft delete uses:", options: ["Flag column", "CSS", "HTML", "Frontend only"], answer: "Flag column" },
      { question: "CRUD operations include:", options: ["Create, Read, Update, Delete", "Copy, Run, Update, Delete", "Connect, Read, Upload, Delete", "CSS, HTML, JS, JSON"], answer: "Create, Read, Update, Delete" }
    ]
  },
  // Level 8
  {
    id: 8,
    title: "Authentication & Security Best Practices",
    sections: [
      {
        title: "Security Measures",
        content: `Protect backend from SQL Injection, XSS, CSRF, Brute Force.
Use HTTPS, sanitize inputs, validate data, hash passwords.`
      },
      {
        title: "JWT & Session Management",
        content: `JWT: Stateless authentication.
Sessions: Temporary server-side storage.
Example:
const jwt = require('jsonwebtoken');
const token = jwt.sign({id:user._id}, 'secret', {expiresIn:'1h'});`
      }
    ],
    questions: [
      { question: "HTTPS ensures:", options: ["Encrypted communication", "Faster server", "CSS styling", "HTML design"], answer: "Encrypted communication" },
      { question: "bcrypt is used for:", options: ["Hashing passwords", "Encrypting CSS", "Editing HTML", "JSON parsing"], answer: "Hashing passwords" },
      { question: "JWT is:", options: ["Token-based authentication", "Database query", "CSS framework", "HTML tool"], answer: "Token-based authentication" },
      { question: "Input validation prevents:", options: ["SQL Injection", "CSS issues", "HTML errors", "JavaScript frontend"], answer: "SQL Injection" },
      { question: "Session stores:", options: ["Temporary auth info", "Permanent data", "HTML", "CSS"], answer: "Temporary auth info" }
    ]
  },
  // Level 9
  {
    id: 9,
    title: "Deployment & Environment Management",
    sections: [
      {
        title: "Deployment",
        content: `Move backend from local to live server (Heroku, AWS, Render).
Steps: Push code → install dependencies → configure env vars → start server.`
      },
      {
        title: "Environment Variables",
        content: `Store secrets in .env file.
Access with process.env.SECRET`
      }
    ],
    questions: [
      { question: "Deployment means:", options: ["Making app live", "Local testing", "CSS styling", "HTML design"], answer: "Making app live" },
      { question: "Environment variables store:", options: ["Secrets", "HTML", "CSS", "Images"], answer: "Secrets" },
      { question: "Popular hosting:", options: ["Heroku", "Photoshop", "Chrome", "VS Code"], answer: "Heroku" },
      { question: "npm start command:", options: ["Runs backend", "Styles CSS", "Opens HTML", "Installs images"], answer: "Runs backend" },
      { question: "Secrets in .env:", options: ["DB credentials", "HTML only", "CSS only", "Images"], answer: "DB credentials" }
    ]
  },
  // Level 10
  {
    id: 10,
    title: "Advanced Monitoring & Optimization",
    sections: [
      {
        title: "Performance Monitoring",
        content: `Track server health, CPU, memory, and response time.
Tools: PM2, New Relic, Datadog.`
      },
      {
        title: "Caching",
        content: `Reduce DB queries with Redis or memory caching.
Example:
const redis = require('redis');
const client = redis.createClient();
client.set('key', 'value');
client.get('key', (err,value)=>console.log(value));`
      },
      {
        title: "Load Balancing",
        content: `Distribute requests across multiple servers for scalability.
Example: Nginx or AWS Elastic Load Balancer.`
      }
    ],
    questions: [
      { question: "PM2 is used for:", options: ["Monitoring Node.js", "CSS", "HTML", "JSON"], answer: "Monitoring Node.js" },
      { question: "Caching reduces:", options: ["Database load", "HTML errors", "CSS issues", "Frontend bugs"], answer: "Database load" },
      { question: "Redis is used for:", options: ["Caching", "CSS", "HTML", "Images"], answer: "Caching" },
      { question: "Load balancing improves:", options: ["Scalability", "HTML", "CSS", "Frontend"], answer: "Scalability" },
      { question: "Monitoring tools track:", options: ["Server health", "CSS", "HTML", "Frontend only"], answer: "Server health" }
    ]
  }
];
