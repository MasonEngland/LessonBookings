import React, { useState, useEffect } from "react";
import Topbar from "../components/topbar";
import styles from "../css/lessons.module.css";
import Footer from "../components/footer";
import Cookies from "js-cookie";

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual endpoint URL
    const fetchLessons = async () => {
      try {

        const options = {
            method: 'GET',
            credentials: "same-origin",
            headers: {
              'Content-Type': 'application/json',
            }
        };
        

        const response = await fetch("http://localhost:8000/api/get_lessons", options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLessons(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const cancelLesson = async (lessonId) => {
    const csrfToken = Cookies.get('csrftoken');

    const options = {
        method: 'DELETE',
        credentials: "same-origin",
        headers: {
            'X-CSRFToken': csrfToken,
        },
    }

    const response = await fetch(`http://localhost:8000/api/lessons/cancel/${lessonId}`, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    else {
        location.reload();
    }
  }


  if (loading) {
    return <p>Loading lessons...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

return (
    <div>
        <Topbar page={4} className={styles.topbarAgain} />
        <div className={styles.container}>
            {lessons.length === 0 ? (
                <p className={styles.p} style={{color: "white"}}>No lessons available</p>
            ) : (
            <ul className={styles.ul}>
                {lessons.map((lesson) => (
                    <li key={lesson.id} className={styles.li}>
                    <p className={styles.p}>Day: {lesson.date}</p>
                    <p className={styles.p}>Start Time: {lesson.startTime}</p>
                    <p className={styles.p}>Duration: {lesson.duration} minutes</p>
                    <p className={styles.p}>Price: ${lesson.price}</p>
                    <button className={styles.button} onClick={e => cancelLesson(lesson.id)}>Cancel</button>
                    </li>
                ))}
            </ul>
            )}
        </div>
        <Footer />
    </div>
);
};

export default LessonsPage;