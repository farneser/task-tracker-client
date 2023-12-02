import {FC} from "react";
import {columnService} from "@/services/column/column.service.ts";

const HomePage: FC = () => {

    columnService.get().then(data => console.log(data));


    return <></>
};

export default HomePage;