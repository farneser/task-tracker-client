import {FC} from "react";
import styles from "./Loader.module.scss";

const Loader: FC = () => {
    return <div className={styles.loader__container}>
        <span className={styles.loader___spinner}></span>
    </div>
}

export default Loader;