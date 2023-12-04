import {FC} from "react";
import useColumnService from "@/hooks/useColumnService.ts";
import Column from "@/components/ui/column/Column.tsx";
import {columnService} from "@/services/column/column.service.ts";
import {CreateColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import CreateColumnForm from "@/components/ui/column/createForm/CreateColumnForm.tsx";

const HomePage: FC = () => {
    const {addColumn, columns} = useColumnService()
    const {reversePopup, closePopup, Popup} = usePopup()

    const onSubmit = (data: CreateColumnDto) => {
        if (data.columnName.trim() !== "") {
            columnService.create(data).then(data =>
                addColumn(data)
            )

            closePopup();
        }
    };

    return <div>
        <div>
            <h1>controls</h1>
            <button onClick={reversePopup}>Create New Column</button>

            <Popup>
                <CreateColumnForm onSubmit={onSubmit}/>
            </Popup>
        </div>
        <div>
            <h1>columns</h1>
            {columns.map(column => <Column column={column} key={column.id}/>)}
        </div>
    </div>

};

export default HomePage;