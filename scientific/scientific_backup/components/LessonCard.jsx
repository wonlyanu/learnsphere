import React, { useState } from "react";

export default function LessonCard({ pdfUrl, onComplete }) {
  const [read, setRead] = useState(false);

  const handleRead = () => {
    setRead(true);
    onComplete();
  };

  return (
    <div className="lesson-card">
      <h3>Lesson</h3>
      <iframe src={pdfUrl} width="100%" height="300px" />
      {!read ? (
        <button onClick={handleRead}>Mark as Read ✅</button>
      ) : (
        <p>Lesson Completed 🎉</p>
      )}
    </div>
  );
}
