import {FC} from "react";
import styles from "./Footer.module.scss"
import {Link} from "react-router-dom";

const Footer: FC = () => {
    return <footer className={styles.footer}>
        <div>
            <p className={styles.footer__text}>&copy; 2023 Made by <Link
                to={"https://github.com/farneser"}>farneser</Link></p>
        </div>

        <div>
            <p className={styles.footer__text}>Explore code on GitHub: <Link
                to="https://github.com/farneser/task-tracker"
                target="_blank"
                className="footer__link">farneser/task-tracker</Link>
            </p>
        </div>

        <div>
            <p className={styles.footer__text}>Icons sourced from: <Link
                to="https://heroicons.com/" target="_blank"
                className={styles.footer__link}>heroicons.com</Link></p>
        </div>
    </footer>
}

export default Footer;