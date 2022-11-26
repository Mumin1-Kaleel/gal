import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./check-in.css"
import {useState} from "react";


const columns = [
    { field: 'id', headerName: 'ISBN', width: 150 },
    { field: 'dateout', headerName: 'Date Out', width: 110},
    { field: 'duedate', headerName: 'Due Date', width: 110},
];

export default function DataTable({ setResults }) {

    var rows;
    var res;

    if(setResults.charAt(0) == '[') {

        res = '{"books":' +   setResults   + '}';
    } else {

        res = '{"books":[' +   setResults   + ']}';
    }

    var objInfo
    var obj = [];

    try {

        obj = JSON.parse(res);
    } catch (err) {
         obj = [];
    }
    console.log(typeof obj);

    try {

        objInfo = obj.books.map(function (order) {

            var info = {

                "id": order.isbn10,
                "dateout": order.date_out,
                "duedate": order.due_date
            }
            return info;
        });
        rows = objInfo;

    } catch (err) {

        rows = [];
        console.log(typeof obj);
    }

    const [selectedRows, setSelectedRows] = useState();

    const handleSubmit = async e => {
        console.log(selectedRows);
        console.log(selectedRows.length);
        console.log(selectedRows[0]);
        e.preventDefault();
        fetch('http://localhost:3000/home', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedRows),
        })
        .then(response => {
            console.log("test12");
            return response.text();
        })
        .then(data => {
            console.log("test13");
            console.log(data);
            alert(data);
        }) 
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