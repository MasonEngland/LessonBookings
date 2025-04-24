import Topbar from "../components/topbar";
import TheSound from "../assets/TheSound.png";
import styles from "../css/home.module.css";
import Footer from "../components/footer";

export default function home() {
    return (
        <div className={styles.home}>
            <Topbar page={1}/>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img src={TheSound} alt="The Sound" className={styles.image}/>
                    <h1 className={styles.label}>Mason England</h1>
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.textContainer}>
                        <h1>Bio</h1>
                        <p className={styles.p}>Mason England is an american trumpet player from south jordan, utah. He started off at south jordan middle school and since then he has had several 
                            teachers. His teachers include: Jerusha Johnson, Darin Graber, Kevin Hillman, and Dr. Max Matzen. He has performed around the country in several ensembles such as 
                            the Utah State Wind Orchestra, The Utah state Jazz orchestra, The Phoenix Jazz and Swing Band, the Aggie Marching band, and the USU Symphony orchestra, Currently He is the
                            Principal trumpet player for the USU symphony orchestra and has performed with guest artists like Chuck Owen, Corey Christiansen, and the US Air Force Band.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}