import Topbar from '../components/topbar';
import styles from '../css/about.module.css'; 
import Footer from '../components/footer';

export default function about() {
    return (
        <div className={styles.about}>
            <Topbar page={2}/>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <h2 className={styles.h2}>USU Symphony Orchestra</h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/80lVna5KOPo?si=SwQZwtdnwizxqGWe" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div className={styles.imgContainer}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/AV_TopiLWXU?si=sqCDH3_HiIgpXSxt" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div className={styles.imgContainer}>
                    <h2 className={styles.h2}>USU Wind Orchestra</h2>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/gEVZEN6mezQ?si=YKbzyXOaZOXJNrCk" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div className={styles.imgContainer}>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/YlLMgtMin-g?si=QYVyJXmy5wUkI1mu" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
            </div>
            <Footer/>
        </div>
    )
}