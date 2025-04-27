import { useState, useEffect } from 'react';
import styles from '../css/lesson.module.css';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';


export default function lesson() {
    const [date, setDate] = useState("Monday");
    const [startTime, setStartTime] = useState("12:00pm");
    const [duration, setDuration] = useState("30");

    const navigate = useNavigate();

    async function bookLesson(event) {
        event.preventDefault();
        
        const data = {
            date: date,
            startTime: startTime,
            duration: duration
        };

        const csrftoken = Cookies.get('csrftoken');

        const options = {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(data)
        };

        const response = await fetch('/api/lessons/book/', options)
        if (response.redirected) {
            location.href = response.url;
        }
        else {
            navigate('/lessons');
        }
    }


    return (
        <div className={styles.formContainer}>
           <form className={styles.form} onSubmit={(event) => bookLesson(event)}>
            <label className={styles.label}>
            Date:
            <select name="date" className={styles.select} onChange={e => setDate(e.target.value)}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            </label>
            <br />
            <label className={styles.label}>
            Time:
            
            <select name="startTime" className={styles.select} onChange={e => setStartTime(e.target.value)}>
                <option value="12:00pm">12:00PM</option>
                <option value="1:00pm">1:00PM</option>
                <option value="2:00pm">2:00PM</option>
                <option value="3:00pm">3:00PM</option>
                <option value="4:00pm">4:00PM</option>
            </select>
            </label>
            <br />
            <label className={styles.label}>
            Duration:
            <select name="duration" className={styles.select} onChange={e => setDuration(e.target.value)}>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
            </select>
            </label>
            <button type="submit" className={styles.button}>Submit</button>
            <span>Didn't wat to book a lesson? <Link to={"/"}>Return</Link></span>
           </form>
        </div>
    );
}