export const LEVEL2 = [
  {
    id: 1,
    title: "Building & Deploying a Frontend Project",
    lessonText: `
      Frontend project development includes project setup, development, testing, and deployment.

      --- 
      Project Setup
      • Start a project using Create React App, Vite, or Next.js.
      • Organize code into components, pages, and assets.
      Example: npx create-react-app my-app
      Example (Vite): npm create vite@latest my-app

      --- 
      Development Phase
      • Create reusable UI components
      • Manage state with Context API or Redux
      • Fetch data from REST APIs or GraphQL
      • Apply styling (CSS Modules, Tailwind, Styled Components)
      Ensure modular and maintainable code

      --- 
      Testing the Project
      • Unit Testing with Jest
      • Component Testing with React Testing Library
      • End-to-End Testing with Cypress
      Example: npm test

      --- 
      Building for Production
      • Build optimized static files for deployment.
      • Example:
        • npm run build
        • Generates build/ folder with minified JS, optimized CSS, and compressed assets.

      --- 
      Deployment Options
      • Netlify → drag & drop or connect GitHub repo
      • Vercel → perfect for React/Next.js
      • GitHub Pages → free hosting for static sites
      • Firebase Hosting → scalable hosting for web apps

      --- 
      Advanced Deployment (CI/CD)
      • Automates build, test, and deploy pipelines
      • GitHub Actions → automated workflows
      • Travis CI / CircleCI → advanced pipelines
      • Environment variables for API keys & configs
    `,
    codeExample: `<project folder structure example>`,
    questions: [
      { question: "Which tool is used to start a React project?", options: ["Create React App", "Angular CLI"], answer: "Create React App" },
      { question: "Which command builds optimized production files?", options: ["npm run build", "npm start"], answer: "npm run build" },
      { question: "Which service provides free static hosting?", options: ["Netlify", "AWS EC2"], answer: "Netlify" },
      { question: "Which testing tool is for unit testing?", options: ["Jest", "Cypress"], answer: "Jest" },
      { question: "CI/CD automates?", options: ["Build, Test, Deploy", "Only Build"], answer: "Build, Test, Deploy" },
    ]
  }
  // Add more Level 2 lessons here
];
