import {FC} from "react";
import useColumnService from "@/hooks/useColumnService.ts";
import ColumnElement from "@/components/ui/column/ColumnElement.tsx";
import {columnService} from "@/services/column/column.service.ts";
import {ColumnView, CreateColumnDto} from "@/services/column/column.types.ts";
import usePopup from "@/hooks/usePopup.tsx";
import CreateColumnForm from "@/components/ui/column/create/CreateColumnForm.tsx";

const RootPage: FC = () => {
    const {addColumn, columns, removeColumn, updateColumn} = useColumnService()
    const {reversePopup, closePopup, Popup} = usePopup()

    const onSubmit = (data: CreateColumnDto) => {
        if (data.columnName.trim() !== "") {
            columnService.create(data).then(data =>
                addColumn(data)
            )

            closePopup();
        }
    };

    const updateColumnHandler = async (data: ColumnView) => {
        await updateColumn(data)
    }

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
            {columns.map(column => <ColumnElement column={column} key={column.id} deleteColumn={() => {
                    columnService.delete(column.id).then(() => {
                        removeColumn(column.id).then()
                    })
                }} updateColumn={updateColumnHandler}/>
            )}
        </div>
    </div>

};

export default RootPage;