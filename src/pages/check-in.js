import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./check-in.css"
import {useState} from "react";


const columns = [
    { field: 'id', headerName: 'ISBN', width: 150 },
    { field: 'dateout', headerName: 'Date Out', width: 100 },
    { field: 'duedate', headerName: 'Due Date', width: 100},
];

const rows = [];

export default function DataTable({ setResults }) {



    const [selectedRows, setSelectedRows] = useState();



    const handleSubmit = async e => {


        console.log(selectedRows)
        e.preventDefault();
    }

    return (
        <div className = "inbooksTable"
             style={{ height: 400, width: '65%' }}>
            <DataGrid style={{backgroundColor: "#404040", height: "70%", borderColor: "#000000", color: "white"}}
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection={true}
                      onSelectionModelChange={(newSelectionRow) => {
                          setSelectedRows(newSelectionRow);
                      }}
                      selectionModel={selectedRows}
            />
            <button className = "checkoutbutton" onClick={handleSubmit} >Check in</button>
        </div>
    );
}