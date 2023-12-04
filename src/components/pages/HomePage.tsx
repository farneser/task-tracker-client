import {FC} from "react";
import useColumnService from "@/hooks/useColumnService.ts";
import Column from "@/components/ui/column/Column.tsx";

const HomePage: FC = () => {
    const columnService = useColumnService()

    return <div>
        <div>
            <h1>controls</h1>

        </div>
        <div>
            <h1>columns</h1>
            {columnService.columns.map(column => <Column column={column} key={column.id}/>)}
        </div>
    </div>

};

export default HomePage;