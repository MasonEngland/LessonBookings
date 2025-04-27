import Topbar from "../components/topbar";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "../css/calendar.module.css";
import {useState, useEffect} from "react";


export default function Calendar() {
    const [events , setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/get_studio_events");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchEvents();
    }
    , []);

    // set body with loading screen when no events
    const body = () => {
        if (loading) {
            return <div className={styles.loading}>Loading...</div>;
        }
        else return (<div className={styles.calendar}>
        <Fullcalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            timeZone="MST"
            events={events}
            selectable={true}
        />
    </div>)}

    
    return (
        <div>
            <Topbar page={3} />
            {body()}
        </div>
    )

}