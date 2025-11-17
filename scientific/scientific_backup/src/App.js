import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Beginner Card */}
        <Link
          to="/beginner"
          className="bg-white shadow-lg rounded-2xl p-8 text-center hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-bold">Beginner</h2>
          <p className="text-gray-500 mt-2">Start with basics</p>
        </Link>

        {/* Intermediate Card */}
        <Link
          to="/intermediate"
          className="bg-white shadow-lg rounded-2xl p-8 text-center hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-bold">Intermediate</h2>
          <p className="text-gray-500 mt-2">Level up your skills</p>
        </Link>

        {/* Advanced Card */}
        <Link
          to="/advanced"
          className="bg-white shadow-lg rounded-2xl p-8 text-center hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl font-bold">Advanced</h2>
          <p className="text-gray-500 mt-2">Master the concepts</p>
        </Link>
      </div>
    </div>
  );
}

function Beginner() {
  return <h1 className="text-4xl text-center mt-20">Beginner Page</h1>;
}

function Intermediate() {
  return <h1 className="text-4xl text-center mt-20">Intermediate Page</h1>;
}

function Advanced() {
  return <h1 className="text-4xl text-center mt-20">Advanced Page</h1>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beginner" element={<Beginner />} />
        <Route path="/intermediate" element={<Intermediate />} />
        <Route path="/advanced" element={<Advanced />} />
      </Routes>
    </Router>
  );
}

export default App;
