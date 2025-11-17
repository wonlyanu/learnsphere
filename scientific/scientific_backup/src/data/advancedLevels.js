export const ADVANCED_LEVELS = [
  // Level 1
  {
    id: 1,
    title: "Microservices Architecture",
    sections: [
      {
        title: "What are Microservices?",
        content: `Microservices is an architectural style where an application is split into small, independent services, each performing a specific function.
Each microservice has its own database and logic, communicates with other services through APIs (REST/GraphQL) or message queues.
Advantages:
- Scalability: Each service can scale independently
- Maintainability: Easier to update a single service
- Resilience: Failures in one service do not crash the entire system`
      },
      {
        title: "Example Use Case",
        content: `E-commerce system:
Service A → User management
Service B → Product catalog
Service C → Payment processing`
      },
      {
        title: "Small Program Example (Node.js Express Microservice)",
        content: `const express = require('express');
const app = express();
app.get('/users', (req,res) => {
  res.json([{id:1, name:'Vasantha'}]);
});
app.listen(3001, ()=> console.log('User service running'));`
      },
      {
        title: "Explanation",
        content: `This microservice only handles users; other services run on different ports.`
      }
    ],
    questions: [
      { question: "Microservices are:", options: ["Single large app","Independent small services","Frontend frameworks","CSS files"], answer: "Independent small services" },
      { question: "Microservices communicate via:", options: ["APIs","HTML","CSS","Images"], answer: "APIs" },
      { question: "Advantages of microservices include:", options: ["Scalability","Maintainability","Resilience","All of the above"], answer: "All of the above" },
      { question: "Each microservice can have:", options: ["Its own database","Only shared DB","Only CSS","Only frontend"], answer: "Its own database" },
      { question: "Payment service in microservices example:", options: ["Handles users","Processes payments","Handles CSS","Renders HTML"], answer: "Processes payments" }
    ]
  },

  // Level 2
  {
    id: 2,
    title: "Message Queues & Event-Driven Architecture",
    sections: [
      {
        title: "Introduction",
        content: `Services often need to communicate asynchronously.
A Message Queue (MQ) acts as a buffer storing messages until processed by a consumer.
Ensures reliability, decoupling, and scalability.`
      },
      {
        title: "Event-Driven Architecture",
        content: `EDA is a design pattern where services react to events instead of polling.
Producers emit events → Message broker → Consumers process events.
Advantages: Loose coupling, Scalability, Resilience`
      },
      {
        title: "Small Program Example (Node.js + RabbitMQ)",
        content: `const amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', (err, conn) => {
  if(err) throw err;
  conn.createChannel((err, channel) => {
    const queue = 'task_queue';
    const msg = 'Process order 123';
    channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
    console.log(" [x] Sent '%s'", msg);
  });
});`
      },
      {
        title: "Explanation",
        content: `Queue stores tasks until a consumer processes them. Durable queue survives server restarts; persistent messages are not lost on crashes.`
      }
    ],
    questions: [
      { question: "Message queues decouple:", options: ["Frontend and backend","Producer and consumer","CSS and HTML","Database and server"], answer: "Producer and consumer" },
      { question: "In EDA, an event represents:", options: ["A user interface design","A significant state change","CSS animation","HTML tag"], answer: "A significant state change" },
      { question: "RabbitMQ is used for:", options: ["Message queue","Frontend rendering","CSS styling","HTML template"], answer: "Message queue" },
      { question: "What ensures a message is not lost on server crash?", options: ["Persistent message","CSS file","HTML file","JavaScript only"], answer: "Persistent message" },
      { question: "Dead-letter queue is used for:", options: ["Failed messages","Successful messages","CSS","HTML"], answer: "Failed messages" }
    ]
  },

  // Level 3
  {
    id: 3,
    title: "GraphQL APIs",
    sections: [
      {
        title: "Introduction",
        content: `GraphQL is a query language for APIs that allows clients to request exactly the data they need, reducing bandwidth and improving efficiency.`
      },
      {
        title: "Key Features",
        content: `Single Endpoint (/graphql)
Strongly Typed Schema
Queries (fetch data) & Mutations (modify data)
Resolvers fetch/modify data
Supports real-time via Subscriptions`
      },
      {
        title: "Small Program Example (Node.js + Apollo Server)",
        content: `const { ApolloServer, gql } = require('apollo-server');
const typeDefs = gql\`
type User { id: ID!, name: String!, email: String! }
type Query { users: [User], user(id: ID!): User }
type Mutation { addUser(name: String!, email: String!): User }
\`;
let users = [{ id: 1, name: 'Vasantha', email: 'vasantha@example.com' }];
const resolvers = { Query: { users: () => users, user: (_, { id }) => users.find(u => u.id == id) },
Mutation: { addUser: (_, { name, email }) => { const newUser = { id: users.length + 1, name, email }; users.push(newUser); return newUser; } } };
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(\`Server running at \${url}\`));`
      },
      {
        title: "Explanation",
        content: `Query returns users or a specific user. Mutation allows adding a new user. Clients request only required fields.`
      }
    ],
    questions: [
      { question: "GraphQL query does:", options: ["Modifies data","Fetches data","Deletes CSS","Renders HTML"], answer: "Fetches data" },
      { question: "GraphQL mutation is used for:", options: ["Fetching data","Modifying/creating data","Styling frontend","HTML rendering"], answer: "Modifying/creating data" },
      { question: "Resolver purpose:", options: ["Styling pages","Resolving queries and fetching/modifying data","Handling CSS animations","Rendering HTML"], answer: "Resolving queries and fetching/modifying data" },
      { question: "Clients request:", options: ["All fields from endpoint","Only the fields they need","Only GET requests","CSS and HTML"], answer: "Only the fields they need" },
      { question: "Benefit of GraphQL over REST:", options: ["Over-fetching of data","Fetch exactly required data","Requires multiple endpoints","Only works with mobile apps"], answer: "Fetch exactly required data" }
    ]
  },

  // Level 4
  {
    id: 4,
    title: "WebSockets & Real-Time Communication",
    sections: [
      {
        title: "Introduction",
        content: `WebSockets provide full-duplex communication over a single TCP connection, allowing server to push data to clients anytime.`
      },
      {
        title: "Small Program Example (Node.js + ws)",
        content: `const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', ws => {
  console.log('Client connected');
  ws.on('message', message => { console.log('Received:', message); ws.send(\`Echo: \${message}\`); });
  ws.send('Welcome to the WebSocket server!');
});`
      },
      {
        title: "Explanation",
        content: `Server listens on port 8080. Messages from clients are echoed back. Multiple clients can connect simultaneously.`
      }
    ],
    questions: [
      { question: "WebSocket provides:", options: ["One-way communication","Full-duplex real-time","Only GET requests","CSS only"], answer: "Full-duplex real-time" },
      { question: "WebSocket connection is:", options: ["Short-lived","Persistent","Only for CSS","Only for HTML"], answer: "Persistent" },
      { question: "WebSockets commonly used for:", options: ["Chat apps","Static HTML","CSS styling","Images"], answer: "Chat apps" },
      { question: "Server in WebSocket:", options: ["Sends & receives events","Only frontend","Only CSS","HTML only"], answer: "Sends & receives events" },
      { question: "Client in WebSocket:", options: ["Only sends messages","Sends & receives messages","Only frontend","Only HTML"], answer: "Sends & receives messages" }
    ]
  },

  // Level 5
  {
    id: 5,
    title: "Advanced Caching Strategies",
    sections: [
      {
        title: "Introduction",
        content: `Caching stores frequently accessed data in memory instead of querying DB repeatedly, improving response times. Types: In-memory (Redis), HTTP, CDN caching.`
      },
      {
        title: "Small Program Example (Redis)",
        content: `const redis = require('redis');
const client = redis.createClient();
client.on('connect', () => console.log('Connected to Redis'));
client.set('product_101', JSON.stringify({ name: 'Laptop', price: 1200 }));
client.get('product_101', (err, data) => { if(err) console.error(err); console.log('Cached Product:', JSON.parse(data)); });`
      },
      {
        title: "Explanation",
        content: `Cache stores frequently accessed data, reducing database load and improving performance. Expiration and cache-aside patterns prevent stale data.`
      }
    ],
    questions: [
      { question: "Caching reduces:", options: ["Database load","CSS issues","HTML errors","Frontend bugs"], answer: "Database load" },
      { question: "Redis is used as:", options: ["Database only","In-memory cache","CSS tool","HTML template"], answer: "In-memory cache" },
      { question: "CDN caching stores:", options: ["Static assets","Database queries","Backend code","CSS only"], answer: "Static assets" },
      { question: "HTTP caching stores:", options: ["Server responses","Requests only","HTML only","CSS only"], answer: "Server responses" },
      { question: "Benefit of caching:", options: ["Faster response","Slower server","HTML only","CSS only"], answer: "Faster response" }
    ]
  },

  // Level 6
  {
    id: 6,
    title: "DevOps & CI/CD for Backend",
    sections: [
      {
        title: "Introduction",
        content: `DevOps merges development and operations for faster deployment and reliable software. CI/CD automates testing and deployment.`
      },
      {
        title: "Containers & Orchestration",
        content: `Docker packages apps with dependencies. Kubernetes orchestrates containers, handling scaling, load balancing, auto-restart.`
      },
      {
        title: "Small Program Example (GitHub Actions CI)",
        content: `name: Node.js CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm install
    - run: npm test`
      }
    ],
    questions: [
      { question: "CI/CD automates:", options: ["Testing & deployment","CSS compilation","HTML building","Frontend rendering"], answer: "Testing & deployment" },
      { question: "Docker is used for:", options: ["Packaging apps","CSS styling","HTML rendering","Frontend only"], answer: "Packaging apps" },
      { question: "Kubernetes is used for:", options: ["Orchestrating containers","CSS styling","HTML only","Frontend only"], answer: "Orchestrating containers" },
      { question: "CI ensures:", options: ["Code tested automatically","CSS compiled","HTML built","Images optimized"], answer: "Code tested automatically" },
      { question: "CD ensures:", options: ["Auto deployment","CSS only","HTML only","Frontend only"], answer: "Auto deployment" }
    ]
  },

  // Level 7
  {
    id: 7,
    title: "Advanced Security",
    sections: [
      {
        title: "Key Threats",
        content: `SQL Injection, XSS, CSRF, Brute-force attacks are common backend threats.`
      },
      {
        title: "Security Measures",
        content: `Input validation & sanitization
HTTPS/TLS
JWT/OAuth2 authentication
Password hashing with bcrypt`
      },
      {
        title: "Small Program Example (bcrypt)",
        content: `const bcrypt = require('bcrypt');
const password = 'mypassword';
const hash = bcrypt.hashSync(password, 10);
console.log('Hashed Password:', hash);`
      }
    ],
    questions: [
      { question: "bcrypt is used for:", options: ["CSS only","Password hashing","HTML only","Frontend styling"], answer: "Password hashing" },
      { question: "XSS attack targets:", options: ["Client browser","Server only","Database only","CSS only"], answer: "Client browser" },
      { question: "CSRF attack is:", options: ["Unauthorized actions","Password hash","CSS attack","HTML injection"], answer: "Unauthorized actions" },
      { question: "HTTPS ensures:", options: ["Encrypted communication","Faster CSS","HTML rendering","Frontend only"], answer: "Encrypted communication" },
      { question: "Input validation prevents:", options: ["SQL Injection","CSS errors","HTML issues","Frontend bugs"], answer: "SQL Injection" }
    ]
  },

  // Level 8
  {
    id: 8,
    title: "Cloud Integration & Serverless",
    sections: [
      {
        title: "Introduction",
        content: `Cloud services host backend without physical servers. Serverless computing (AWS Lambda, Azure Functions) auto-scales and is pay-per-use.`
      },
      {
        title: "Small Program Example (AWS Lambda Node.js)",
        content: `exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};`
      },
      {
        title: "Explanation",
        content: `Serverless functions scale automatically. Environment variables can store configuration. State should be stored in DB or cache.`
      }
    ],
    questions: [
      { question: "Serverless means:", options: ["No server management","Only frontend","CSS only","HTML only"], answer: "No server management" },
      { question: "AWS Lambda is:", options: ["Serverless compute","Database","CSS tool","HTML renderer"], answer: "Serverless compute" },
      { question: "Cloud backend is:", options: ["On-premise","Remote & scalable","CSS only","HTML only"], answer: "Remote & scalable" },
      { question: "Pay-per-use billing applies to:", options: ["Serverless","Dedicated servers","CSS only","HTML only"], answer: "Serverless" },
      { question: "Serverless benefits include:", options: ["Auto-scaling","Only frontend","CSS","HTML"], answer: "Auto-scaling" }
    ]
  },

  // Level 9
  {
    id: 9,
    title: "Monitoring & Logging",
    sections: [
      {
        title: "Importance",
        content: `Monitoring helps detect performance bottlenecks, errors, and downtime. Logging ensures reliability and availability.`
      },
      {
        title: "Small Program Example (Winston)",
        content: `const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' })
  ]
});
logger.info('Server started successfully');
logger.error('Database connection failed');`
      },
      {
        title: "Explanation",
        content: `Logs help debug errors. Centralized logging and monitoring dashboards track server health in real time.`
      }
    ],
    questions: [
      { question: "Logging helps:", options: ["Debug errors","CSS only","HTML only","Images"], answer: "Debug errors" },
      { question: "PM2 is used for:", options: ["Node.js process management","CSS styling","HTML rendering","Frontend only"], answer: "Node.js process management" },
      { question: "Monitoring tools track:", options: ["Server health","CSS issues","HTML only","Frontend only"], answer: "Server health" },
      { question: "Winston is:", options: ["Logging library","Frontend tool","CSS only","HTML template"], answer: "Logging library" },
      { question: "Monitoring benefits:", options: ["Detect performance issues","CSS only","HTML only","Frontend only"], answer: "Detect performance issues" }
    ]
  },

  // Level 10
  {
    id: 10,
    title: "Scalability & Load Balancing",
    sections: [
      {
        title: "Scalability",
        content: `Vertical Scaling: Upgrade server resources (CPU, RAM).
Horizontal Scaling: Add multiple servers to distribute load.`
      },
      {
        title: "Load Balancing",
        content: `Distributes requests across servers using Nginx, HAProxy, AWS ELB to prevent overload.`
      },
      {
        title: "Small Program Example (Nginx Load Balancer)",
        content: `upstream backend {
  server backend1.example.com;
  server backend2.example.com;
}
server {
  listen 80;
  location / {
    proxy_pass http://backend;
  }
}`
      },
      {
        title: "Explanation",
        content: `Vertical scaling increases server resources; horizontal scaling adds servers. Load balancers distribute requests and reduce latency.`
      }
    ],
    questions: [
      { question: "Vertical scaling means:", options: ["Add more servers","Increase server resources","CSS only","HTML only"], answer: "Increase server resources" },
      { question: "Horizontal scaling means:", options: ["Add more servers","Increase CPU only","CSS only","HTML only"], answer: "Add more servers" },
      { question: "Load balancing helps:", options: ["Distribute requests","CSS only","HTML only","Frontend only"], answer: "Distribute requests" },
      { question: "Nginx can be used for:", options: ["Load balancing","HTML rendering","CSS only","Database only"], answer: "Load balancing" },
      { question: "Scalability ensures:", options: ["Handle high traffic","Only frontend","CSS only","HTML only"], answer: "Handle high traffic" }
    ]
  }
];
