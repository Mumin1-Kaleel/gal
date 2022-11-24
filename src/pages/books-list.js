import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./books-list.css"
import {useState} from "react";
import Modal from "./askForCard";
const columns = [
    { field: 'id', headerName: 'ISBN', width: 70 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'author', headerName: 'Author', width: 130 },
];


const rows = [
    { id: 1, title: 'Snow', author: 'Jon'},
    { id: 2, title: 'Lannister', author: 'Cersei' },
    { id: 3, title: 'Lannister', author: 'Jaime' },
    { id: 4, title: 'Stark', author: 'Arya' },
    { id: 5, title: 'Targaryen', author: 'Daenerys' },
    { id: 6, title: 'Melisandre', author: null},
    { id: 7, title: 'Clifford', author: 'Ferrara' },
    { id: 8, title: 'Frances', author: 'Rossini'},
    { id: 9, title: 'Roxie', author: 'Harvey' },
];

export default function DataTable() {

    const [selectedRows, setSelectedRows] = useState();
    const [tableData, setTableData] = useState(rows);
    const [modalOpen, setModalOpen] = useState(false);


    const handleSubmit = async e => {

        setModalOpen(true);
        console.log(selectedRows)
        e.preventDefault();
    }

    return (
        <div className = "booksTable"
         style={{ height: 400, width: '100%' }}>
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
            <button className = "checkoutbutton" onClick={handleSubmit} >Check out</button>
            {modalOpen && <Modal setOpenModal={setModalOpen} />}
        </div>
    );
}