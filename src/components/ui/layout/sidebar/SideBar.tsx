import {FC} from "react";
import useProjects from "@/hooks/useProjects.ts";
import {Link} from "react-router-dom";
import styles from "./SideBar.module.scss";
import usePopup from "@/hooks/usePopup.tsx";

const SideBar: FC = () => {
    const {projects} = useProjects();

    const {openPopup, Popup} = usePopup();

    return <div className={styles.sidebar__container}>
        <Popup>
            <div>help</div>
        </Popup>
        <div className={styles.sidebar__container__head}>
            <ul>
                <li><Link to="p">Dashboard</Link></li>
                <li><Link to="#" onClick={openPopup}>Create new Project</Link></li>
            </ul>
        </div>
        <div className={styles.sidebar__container__sepatator}/>
        <div className={styles.sidebar__container__list}>
            <ul>
                {projects.map(p => (
                    <li><Link to={`p/${p.id}`}>{p.projectName}</Link></li>
                ))}
            </ul>
        </div>
    </div>
}

export default SideBar;