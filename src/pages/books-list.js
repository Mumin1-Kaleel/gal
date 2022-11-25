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



export default function DataTable({ setResults }) {

  //  setResults = '{"isbn10":"10","author":"me","title":"non"},{"isbn10":"11","author":"me","title":"non"}'
    let res = '{"books":[' +   setResults   + ']}';
    const obj = JSON.parse(res);

    var objInfo = obj.books.map( function(order) {

        var info = { "id": order.isbn10,
                    "author": order.author,
                    "title": order.title
        }
            return info;
    });

    const rows = objInfo;

    const [selectedRows, setSelectedRows] = useState();
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