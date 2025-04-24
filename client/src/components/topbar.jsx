import {use, useContext} from 'react';
import { Link, useNavigate } from 'react-router'; // Import Link from react-router-dom
import styles from '../css/topbar.module.css'; // Make sure to create and style this CSS file
import UserContext from '../../context/userContext'; // Import the UserContext


export default function Topbar({page}) {
    let navigate = useNavigate();
    let lastElement = <a href="/registration/sign_in" className={styles.navLink}>Login</a>;
    const user = useContext(UserContext);

    if (user != null) {
        lastElement = <a href="" className={styles.navLink}>Lessons</a>;
    }

    const clickHandler = () => {
        navigate("/book");
    }

    return (
        <div className={styles.topbar}>
            <div>
                <button className={styles.button} onClick={() => clickHandler()}>Book Now</button>
            </div>
            <div className={styles.topbarLinks}>
                <Link to="/" className={styles.navLink + " " + (page == 1 ? styles.selected : "")}>Home</Link>
                <Link to="/about" className={styles.navLink + " " + (page == 2 ? styles.selected : "")}>Listen</Link>
                <Link to="/calendar" className={styles.navLink + " " + (page == 3 ? styles.selected : "")}>Calendar</Link>
                {lastElement}
                {user != null ? <a href="/registration/logout" className={styles.navLink}>Logout</a> : ""}
            </div>
            <div style={{width: "50px"}}></div>
        </div>
    );
};