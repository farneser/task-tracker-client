import {FC, useEffect} from "react";
import {columnService} from "@/services/column/column.service.ts";

const HomePage: FC = () => {
    useEffect(() => {
        console.log("start loading")
        columnService.get().then(data => console.log(data));
    }, []);

    return <>homepage</>
};

export default HomePage;