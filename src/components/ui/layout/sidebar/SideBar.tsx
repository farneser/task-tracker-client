import {FC} from "react";
import useProjects from "@/hooks/useProjects.ts";
import {Link} from "react-router-dom";

const SideBar: FC = () => {
    const {projects} = useProjects();

    return <div>
        <ul>{projects.map(p => (<li><Link to={`p/${p.id}`}>{p.projectName}</Link></li>))}</ul>
    </div>
}

export default SideBar;