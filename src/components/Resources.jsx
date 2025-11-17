import React, { useState, useMemo, useEffect } from "react";
import { cybersecurityLinks, webdevLinks, importantLinks, readsList } from "./resource.js";

export default function ReadingRoomFullInteractive({ goBackHome }) {
  // Upper half states and handlers
  const [booksRead, setBooksRead] = useState(9);
  const [bookImage, setBookImage] = useState('/images/book-icon.jpg');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBookImage(URL.createObjectURL(file));
    }
  };

  const increase = () => setBooksRead((b) => Math.min(b + 1, 99));
  const decrease = () => setBooksRead((b) => Math.max(b - 1, 0));

  // Editable Favorite Genres (max 3)
  const [favoriteGenres, setFavoriteGenres] = useState([
    "Unlimited Flow",
    "Historical",
    "School Life",
  ]);
  const [newGenre, setNewGenre] = useState("");

  const addGenre = () => {
    const trimmed = newGenre.trim();
    if (trimmed && favoriteGenres.length < 3 && !favoriteGenres.includes(trimmed)) {
      setFavoriteGenres([...favoriteGenres, trimmed]);
      setNewGenre("");
    }
  };
  const removeGenre = (g) =>
    setFavoriteGenres(favoriteGenres.filter((fg) => fg !== g));

  // Live date for the calendar - updates every minute
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const pad2 = (num) => num.toString().padStart(2, "0");
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];



  // Filters and sorting
  const allGenres = Array.from(new Set(readsList.flatMap((r) => r.genres))).sort();
  const allStatuses = ["All", "Read", "Paused", "Dropped"];

  const [filterGenre, setFilterGenre] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const filteredReads = useMemo(() => {
    let filtered = readsList;

    if (filterGenre !== "All") {
      filtered = filtered.filter((r) => r.genres.includes(filterGenre));
    }
    if (filterStatus !== "All") {
      filtered = filtered.filter((r) => r.status === filterStatus);
    }

    if (sortConfig.key) {
      filtered = [...filtered].sort((a, b) => {
        if (sortConfig.key === "rating") {
          return sortConfig.direction === "asc"
            ? a.rating - b.rating
            : b.rating - a.rating;
        }
        if (sortConfig.key === "adName") {
          const cmp = a.adName.localeCompare(b.adName);
          return sortConfig.direction === "asc" ? cmp : -cmp;
        }
        return 0;
      });
    }
    return filtered;
  }, [readsList, filterGenre, filterStatus, sortConfig]);

  const toggleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({
        key,
        direction: "asc",
      });
    }
  };

  // Render stars rating
  const renderRating = (rating) => "★".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <>
      {/* Background Video */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src="/videos/respage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html, body {
          margin: 0;
          background: transparent;
          color: #ffffff;
          font-family: 'General Sans', sans-serif;
          user-select: none;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        /* Upper Banner and Icon */
        .banner {
          width: 100vw;
          height: 140px;
          background-image: url('/images/banner.jpg');
          background-size: cover;
          background-position: center;
          position: relative;
          user-select: none;
        }
        .icon-books {
          position: absolute;
          top: 50px;
          left: 2%;
          width: 36px;
          height: 42px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          user-select: none;
          z-index: 2;
        }
        .icon-book-bar {
          width: 100%;
          height: 9px;
          border-radius: 3px;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        }
        .icon-book1 { background: #cccccc; }
        .icon-book2 { background: #aaaaaa; }
        .icon-book3 { background: #dddddd; }
        /* Container */
        .container {
          max-width: 1050px;
          margin: 0 auto;
          padding: 1rem 24px 48px;
          user-select: none;
        }
        /* Back button */
        .back-button {
          position: absolute;
          top: 110px;
          left: 20px;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 1.2rem;
          font-family: 'General Sans', sans-serif;
          cursor: pointer;
          padding: 8px 12px;
          border-radius: 6px;
          transition: background-color 0.2s ease;
          z-index: 1000;
        }
        .back-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        /* Title */
        h1.title {
          color: #ffffff;
          font-weight: 700;
          font-size: 3.4rem;
          font-family: 'General Sans', sans-serif;
          letter-spacing: 0.17rem;
          user-select: text;
          margin: 12px 0 30px 0;
        }
        /* Color bars */
        .color-bars {
          display: flex;
          gap: 20px;
          margin-bottom: 34px;
          user-select: none;
        }
        .color-bar {
          flex-grow: 1;
          height: 11px;
          border-radius: 3px;
          background-color: #000000;
        }
        .bar1 { background-color: #000000; }
        .bar2 { background-color: #000000; }
        .bar3 { background-color: #000000; }
        .bar4 { background-color: #000000; }
        .bar5 { background-color: #000000; }
        /* Main grid */
        .main-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 100px;
          user-select: none;
        }
        /* Left side */
        .left-side {
          display: flex;
          flex-direction: column;
          gap: 42px;
          color: #ffffff;
        }
        .book-icon {
          width: 154px;
          height: 154px;
          border-radius: 12px;
          box-shadow: 5px 5px 18px #cccccc;
          object-fit: cover;
          user-select: none;
          margin-left: 50px;
        }
        .upload-input {
          margin-top: 12px;
          padding: 8px 12px;
          font-size: 0.9rem;
          font-family: 'General Sans', sans-serif;
          border-radius: 6px;
          border: 1px solid #000000;
          background-color: #f0f0f0;
          color: #000000;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .upload-input:hover {
          background-color: #cccccc;
        }
        .books-read-box {
          background-color: #5a5a7a;
          border-radius: 18px;
          padding: 28px 24px;
          text-align: center;
          user-select: text;
          font-weight: 700;
          color: #ffffff;
          font-size: 1.6rem;
          font-family: 'General Sans', sans-serif;
        }
        .books-read-title {
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 18px;
          letter-spacing: 0.1rem;
          color: #ffffff;
        }
        .books-read-controls {
          display: flex;
          justify-content: center;
          gap: 22px;
          font-weight: 700;
          font-size: 2.5rem;
          user-select: text;
          align-items: center;
        }
        .btn-square {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: #e0e0e0;
          color: #000000;
          border: 1px solid #000000;
          font-weight: 900;
          cursor: pointer;
          line-height: 1;
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2rem;
          font-family: 'General Sans', sans-serif;
          transition: background-color 0.15s ease;
        }
        .btn-square:hover {
          background: #cccccc;
        }
        .books-read-number {
          background-color: #ffffff;
          border-radius: 10px;
          border: 1px solid #000000;
          min-width: 44px;
          height: 36px;
          line-height: 36px;
          font-size: 2.5rem;
          color: #000000;
          font-weight: 900;
          letter-spacing: 0.1rem;
          font-family: 'General Sans', sans-serif;
          user-select: text;
          text-align: center;
          user-select: none;
        }
        /* Editable Favorite Genres */
        .favorite-genres-title {
          font-weight: 700;
          font-size: 1.14rem;
          margin-bottom: 12px;
          color: #ffffff;
          letter-spacing: 0.08rem;
          user-select: text;
          text-decoration: underline;
          cursor: default;
        }
        .favorite-genres-list {
          color: #cccccc;
          font-weight: 600;
          font-size: 1.04rem;
          letter-spacing: 0.015rem;
          list-style-type: disc;
          margin-left: 22px;
          user-select: text;
          cursor: default;
          line-height: 1.5;
        }
        .favorite-genres-list li {
          margin-bottom: 6px;
          display: flex;
          justify-content: space-between;
          max-width: 180px;
          align-items: center;
        }
        .favorite-genres-list button {
          background: transparent;
          border: none;
          color: #666666;
          cursor: pointer;
          font-weight: 700;
          font-size: 1.1rem;
          line-height: 1;
          user-select: none;
          padding: 0 6px;
          transition: color 0.15s ease;
          border-radius: 4px;
        }
        .favorite-genres-list button:hover, .favorite-genres-list button:focus {
          color: #000000;
          outline: none;
        }
        .add-genre-container {
          display: flex;
          gap: 12px;
          margin-top: 10px;
          align-items: center;
        }
        .add-genre-input {
          padding: 6px 10px;
          font-size: 1rem;
          font-family: 'General Sans', sans-serif;
          border-radius: 6px;
          border: 1px solid #000000;
          background-color: #ffffff;
          color: #000000;
          user-select: text;
          width: 140px;
          transition: border-color 0.2s ease;
        }
        .add-genre-input:focus {
          border-color: #333333;
          outline: none;
        }
        .add-genre-btn {
          padding: 8px 14px;
          font-family: 'General Sans', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          border-radius: 8px;
          background-color: #e0e0e0;
          user-select: none;
          color: #000000;
          cursor: pointer;
          border: 1px solid #000000;
          transition: background-color 0.2s ease;
        }
        .add-genre-btn:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .add-genre-btn:not(:disabled):hover, .add-genre-btn:not(:disabled):focus {
          background-color: #aaaaaa;
          outline: none;
        }
        /* Right side */
        .right-side {
          font-family: 'General Sans', sans-serif;
          color: #ffffff;
          font-size: 1.02rem;
          user-select: text;
          display: flex;
          flex-direction: column;
          gap: 30px;
          max-width: 100%;
        }
        .devouring-block {
          background-color: #5a5a7a;
          border-radius: 6px;
          padding: 12px 16px;
          color: #ffffff;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          gap: 6px;
          letter-spacing: 0.04em;
        }
        .devouring-block code {
          font-weight: 700;
          color: #ffffff;
          white-space: nowrap;
          user-select: text;
        }
        /* Links header */
        .links-header {
          padding: 14px 20px;
          background-color: #120909ff;
          border-left: 6px solid #000000;
          font-weight: 700;
          font-size: 1.33rem;
          color: #f1eaeaff;
          user-select: text;
          cursor: default;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .links-header svg {
          fill: #e5e0e0ff;
          width: 20px;
          height: 20px;
        }
        /* Links list item */
        .link-item {
          background-color: #000000;
          border-radius: 8px;
          border: 1px solid #3f2b2bff;
          display: flex;
          gap: 18px;
          padding: 10px 16px;
          color: #ffffff;
          user-select: text;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          align-items: center;
          transition: background-color 0.15s ease;
          word-break: break-word;
          box-shadow: 0 0 10px rgba(48, 37, 48, 0.5);
        }
        .link-item:hover, .link-item:focus {
          background-color: #f0f0f0;
          outline: none;
        }
        .link-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow: hidden;
        }
        .link-title {
          color: #ffffff;
          font-weight: 700;
          font-size: 1.04rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: text;
        }
        .link-url {
          font-family: monospace;
          font-size: 0.82rem;
          color: #cccccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: text;
          max-width: 96%;
        }
        /* Scroll containers for links */
        .links-scroll-container {
        scrollbar-width: thin;
         scrollbar-color: transparent;
          background-color: #161515ff;
          border-radius: 8px;
          border: 1px solid #070707ff;
          max-height: 440px;
          overflow-y: auto;
          padding: 8px 12px;
          margin-bottom: 24px;
          user-select: text;
        }
        /* Lower container grid */
        .lower-container {
          margin: 0 auto 48px;
          padding: 12px 24px;
          display: grid;
          grid-template-columns: 180px 1fr 180px;
          gap: 100px;
          user-select: none;
        }
        /* Left side lower */
        .left-side-lower {
          display: flex;
          flex-direction: column;
          gap: 70px;
          color: #ffffff;
        }
        /* Clock */
        .digital-clock {
          font-weight: 900;
          font-size: 4.1rem;
          color: black;
          text-align: center;
          background-color: #5a5a7a;
          border-radius: 8px;
          border: 1px solid #000000;
          padding: 18px 0;
          user-select: text;
          font-family: 'General Sans', sans-serif;
          line-height: -2S;
        }
        .digital-clock small {
          display: block;
          font-size: 1.05rem;
          color: white;
          opacity: 0.8;
          letter-spacing: 0.1rem;
          margin-top: -14px;
          user-select: text;
        }
        /* Links container title */
        .links-container-title {
          font-weight: 700;
          font-size: 1.22rem;
          margin-bottom: 8px;
          text-decoration: underline;
          user-select: text;
        }
        /* Right side lower */
        .right-side-lower {
          color: #ffffff;
          font-size: 1rem;
          user-select: text;

        }
        /* Scrollable content for filters and table */
        .scrollable-content {
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
          max-height: 1000px; /* Adjust to fit within right-side-lower */
        }
        .scrollable-content::-webkit-scrollbar {
          width: 6px;
        }
        .scrollable-content::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollable-content::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 3px;
        }
        .scrollable-content::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.4);
        }
        /* Table container for horizontal scrolling only */
        .table-container {
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }
        .table-container::-webkit-scrollbar {
          height: 6px;
        }
        .table-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .table-container::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2);
          border-radius: 3px;
        }
        .table-container::-webkit-scrollbar-thumb:hover {
          background: rgba(0,0,0,0.4);
        }
        .reads-header {
          font-weight: 700;
          font-size: 1.3rem;
          margin-bottom: 18px;
          border-bottom: 1px solid #000000;
          padding-bottom: 6px;
          user-select: text;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }
        /* Filters group */
        .filters-group {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
          flex-wrap: wrap;
          user-select: none;
        }
        .filter-btn {
          background-color: #f0f0f0;
          color: #000000;
          border: 1px solid #000000;
          padding: 6px 14px;
          border-radius: 16px;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background-color 0.25s ease, color 0.25s ease;
          font-family: 'General Sans', sans-serif;
          user-select: none;
        }
        .filter-btn:hover, .filter-btn:focus {
          background-color: #cccccc;
          color: #000000;
          outline: none;
        }
        .filter-btn.active {
          background-color: #000000;
          color: #ffffff;
          cursor: default;
          box-shadow: 0 0 7px 2px #666666;
        }
        .clear-filters {
          background-color: transparent;
          border: 1px solid #000000;
          color: #000000;
          padding: 6px 18px;
          border-radius: 20px;
          font-weight: 700;
          cursor: pointer;
          font-family: 'General Sans', sans-serif;
          font-size: 0.95rem;
          user-select: none;
          transition: background-color 0.25s ease, color 0.25s ease;
        }
        .clear-filters:hover, .clear-filters:focus {
          background-color: #000000;
          color: #ffffff;
          outline: none;
        }
        /* Reads table */
        .reads-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'General Sans', sans-serif;
          border: 1px solid #ffffff;
        }
        .reads-table th, .reads-table td {
          padding: 9px 12px;
          border-bottom: 1px solid #0c0808ff;
          user-select: text;
          vertical-align: middle;
        }
        .reads-table th {
          text-align: left;
          font-weight: 700;
          font-size: 1rem;
          color: #f8f0f0ff;
          letter-spacing: 0.04rem;
          padding-bottom: 10px;
        }
        .reads-table td:first-child {
          max-width: 250px;
          overflow-x: auto;
          white-space: nowrap;
        }

        /* Disclaimer container */
        .disclaimer-container {
          max-width: 1050px;
          margin: 0 auto;
          padding: 24px;
          text-align: center;
          background-color: #5a5a7a;
          border-radius: 8px;
          border: 1px solid #0a0909ff;
          font-family: 'General Sans', sans-serif;
          font-size: 1rem;
          color: #fafafaff;
          font-weight: 500;
          user-select: text;
          margin-bottom: 24px;
        }

        /* Background video */
        .bg-video {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -10;
          filter: brightness(0.5) contrast(1.4);
        }

`}</style>

      {/* -------- UPPER HALF -------- */}
      <div className="banner" aria-label="Purple swirl fractal banner background">
        <div className="icon-books" aria-label="Stacked books icon" role="img">
          <div className="icon-book-bar icon-book1" />
          <div className="icon-book-bar icon-book2" />
          <div className="icon-book-bar icon-book3" />
        </div>
      </div>

      <div
        className="container"
        role="main"
        aria-label="Reading Room upper content"
      >
        <button className="back-button" onClick={goBackHome} aria-label="Go back to home">
          ← Back
        </button>
        <h1 className="title" tabIndex={0}>
          Reading Room
        </h1>

        <section className="color-bars" aria-hidden="true">
          <div className="color-bar bar1"></div>
          <div className="color-bar bar2"></div>
          <div className="color-bar bar3"></div>
          <div className="color-bar bar4"></div>
          <div className="color-bar bar5"></div>
         
        </section>

        <section className="main-grid">
          <article
            className="left-side"
            aria-label="Book icon, books read and favorite genres"
          >
            <img src={bookImage} alt="Book Icon" className="book-icon" aria-hidden="true" />
            <input type="file" accept="image/*" onChange={handleImageUpload} className="upload-input" />

            <div
              className="books-read-box"
              role="region"
              aria-label="Books read"
            >
              <div className="books-read-title">Books Read</div>
              <div
                className="books-read-controls"
                role="group"
                aria-live="polite"
                aria-atomic="true"
              >
                <button
                  className="btn-square"
                  onClick={decrease}
                  aria-label="Decrease books read count"
                  type="button"
                >
                  −
                </button>
                <div className="books-read-number">{booksRead}</div>
                <button
                  className="btn-square"
                  onClick={increase}
                  aria-label="Increase books read count"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>

            <div aria-label="Favorite genres" tabIndex={-1}>
              <div className="favorite-genres-title">
                Favorite Genres (Editable, max 3)
              </div>
              <ul className="favorite-genres-list">
                {favoriteGenres.map((g) => (
                  <li key={g}>
                    {g}
                    <button
                      aria-label={`Remove genre ${g}`}
                      onClick={() => removeGenre(g)}
                      title="Remove genre"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              {favoriteGenres.length < 3 && (
                <div className="add-genre-container">
                  <input
                    aria-label="New genre name"
                    className="add-genre-input"
                    placeholder="Add genre"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addGenre();
                    }}
                  />
                  <button
                    className="add-genre-btn"
                    onClick={addGenre}
                    disabled={!newGenre.trim()}
                    aria-disabled={!newGenre.trim()}
                    aria-label="Add new genre"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </article>

          <article
            className="right-side"
            aria-label="Current devouring book and links"
          >
            <div className="devouring-block">
              <code>devouring:</code>
              <span>After being forced to marry the evil star general</span>
            </div>

            <section aria-label="Links section">
              <header className="links-header" tabIndex={0}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                  aria-label="Links icon"
                >
                  <path d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5Zm7 1h6v-2h-6v2Zm6.1-5a5 5 0 0 1 0 10h-3v-2h3a3 3 0 0 0 0-6h-3v-2h3Zm-.733 7.97-1.22 1.224-1.415-1.408 1.245-1.245-1.052-1.065 1.415-1.414 2.46 2.47-1.937 1.938Z" />
                </svg>
                Links
              </header>

              {importantLinks.map(({ title, url }, idx) => (
                <article className="link-item" tabIndex={0} key={idx}>
                  <div className="link-text">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="link-title"
                      title={title}
                      tabIndex={-1}
                    >
                      {title}
                    </a>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="link-url"
                      tabIndex={-1}
                    >
                      {url}
                    </a>
                  </div>
                  <div
                    className="link-image"
                    role="img"
                    aria-label="Book cover image"
                  />
                </article>
              ))}
            </section>
          </article>
        </section>
      </div>

      {/* -------- LOWER HALF -------- */}

      <section
        className="lower-container"
        aria-label="Reading Room lower content"
      >
        {/* Left: Clock + Cybersecurity links */}
        <div className="left-side-lower" aria-label="Clock and cybersecurity links">
          <div
            className="digital-clock"
            role="timer"
            aria-live="off"
            aria-atomic="true"
          >
            {pad2(currentDate.getHours())}
            <br />
            <small>{currentDate.getHours() >= 12 ? "PM" : "AM"}</small>
            <br />
            {pad2(currentDate.getDate())}
            <br />
            <small>{dayNames[currentDate.getDay()]}</small>
            <br />
            <small>{monthNames[currentDate.getMonth()]}</small>
            <br />
            <small>{currentDate.getFullYear()}</small>
          </div>

          <div aria-label="Cybersecurity important links" tabIndex={-1}>
            <div className="links-container-title">Cybersecurity Articles</div>
            <div className="links-scroll-container" tabIndex={0} aria-live="polite" role="list">
              {cybersecurityLinks.map(({ title, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="link-item"
                  tabIndex={0}
                  title={title}
                  aria-label={`Open cybersecurity article: ${title}`}
                  role="listitem"
                >
                  <div className="link-text">
                    <div className="link-title">{title}</div>
                    <div className="link-url">{url}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Reads list */}
        <div className="right-side-lower" aria-label="Reads list and filters">
          <div className="reads-header">
            <div>Reads</div>
            <button
              className="clear-filters"
              onClick={() => {
                setFilterGenre("All");
                setFilterStatus("All");
                setSortConfig({ key: null, direction: "asc" });
              }}
              aria-label="Clear all filters and sorting"
            >
              Clear Filters
            </button>
          </div>

          <div className="scrollable-content">
            {/* Genre Filters */}
            <div className="filters-group" aria-label="Filter reads by genre" role="group">
              <button
                className={`filter-btn ${filterGenre === "All" ? "active" : ""}`}
                onClick={() => setFilterGenre("All")}
                aria-pressed={filterGenre === "All"}
              >
                All Genres
              </button>
              {allGenres.map((g) => (
                <button
                  key={g}
                  className={`filter-btn ${filterGenre === g ? "active" : ""}`}
                  onClick={() => setFilterGenre(g)}
                  aria-pressed={filterGenre === g}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Status Filters */}
            <div className="filters-group" aria-label="Filter reads by status" role="group">
              {allStatuses.map((s) => (
                <button
                  key={s}
                  className={`filter-btn ${filterStatus === s ? "active" : ""}`}
                  onClick={() => setFilterStatus(s)}
                  aria-pressed={filterStatus === s}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Reads Table */}
            <div className="table-container">
              <table className="reads-table" aria-describedby="readsTableDescription">
                <thead>
                  <tr>
                    <th
                      onClick={() => toggleSort("adName")}
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortConfig.key === "adName"
                          ? sortConfig.direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className={`ad-name-header ${
                        sortConfig.key === "adName"
                          ? sortConfig.direction === "asc"
                            ? "sort-asc"
                            : "sort-desc"
                          : ""
                      }`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleSort("adName");
                      }}
                    >
                      Ad Name
                    </th>
                    <th>Genre</th>
                    <th>Status</th>
                    <th
                      onClick={() => toggleSort("rating")}
                      role="button"
                      tabIndex={0}
                      aria-sort={
                        sortConfig.key === "rating"
                          ? sortConfig.direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                      className={
                        sortConfig.key === "rating"
                          ? sortConfig.direction === "asc"
                            ? "sort-asc"
                            : "sort-desc"
                          : ""
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") toggleSort("rating");
                      }}
                    >
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReads.length ? (
                    filteredReads.map(({ adName, genres, status, rating, url }, idx) => (
                      <tr key={idx}>
                        <td>
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="book-link"
                            aria-label={`Open book page: ${adName}`}
                          >
                            {adName}
                          </a>
                        </td>
                        <td>
                          {genres.map((g) => (
                            <span key={g} className={`badge ${g.replace(/\s/g, "")}`}>
                              {g}
                            </span>
                          ))}
                        </td>
                        <td>
                          <span className={`status ${status}`}>{status}</span>
                        </td>
                        <td className="rating">{renderRating(rating)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center", padding: "20px", color: "#a19bbe" }}>
                        No reads found for selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Web Development Links */}
        <div className="left-side-lower" aria-label="Web development important links">
          <div className="links-container-title">Web Development Articles</div>
          <div className="links-scroll-container" tabIndex={0} aria-live="polite" role="list">
            {webdevLinks.map(({ title, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="link-item"
                tabIndex={0}
                title={title}
                aria-label={`Open web development article: ${title}`}
                role="listitem"
              >
                <div className="link-text">
                  <div className="link-title">{title}</div>
                  <div className="link-url">{url}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="disclaimer-container" aria-label="Disclaimer">
        <div>
          All the contents present here belong to rightful owner, learnsphere doesnt own them
        </div>
      </section>
    </>
  );
}
