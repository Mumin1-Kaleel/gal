import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./check-in.css"
import {useState} from "react";


const columns = [

    { field: 'id', headerName: 'ID', width: 150},
    { field: 'isbn', headerName: 'ISBN', width: 150},
    { field: 'dateout', headerName: 'Date Out', width: 110},
    { field: 'duedate', headerName: 'Due Date', width: 110},
];

export default function DataTable({ setResults }) {

    var fine = [];
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
// [{"loanid":"1","isbn10":"0195153448","cardid":"ID001000","date_out":"2022-11-25T06:00:00.000Z","due_date":"2022-12-09T06:00:00.000Z","date_in":null},{"loanid":"2","isbn10":"1234567890","cardid":"ID001000","date_out":"2022-11-25T06:00:00.000Z","due_date":"2022-12-09T06:00:00.000Z","date_in":null}]
    try {

        objInfo = obj.books.map(function (order) {

            if(order.date_in === null) {

                const date1 = new Date(order.date_out);
                const date2 = new Date();
                console.log(date1);
                console.log(date2);
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                console.log(diffDays + " days");
                if (diffDays > 14) {

                    const time = diffDays - 14
                    const cost = .25 * time;
                    fine.push([order.loanid, cost]);
                    console.log(fine[0][0]);
                }
            }
            var info = {

                "id": order.loanid,
                "isbn": order.isbn10,
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
        obj.books.map(function (order) {

            for(var i = 0; i < Object.keys(selectedRows).length; i++) {

                if(order.loanid == selectedRows[0]){

                    const date1 = new Date(order.due_date);
                    const date2 = new Date();
                    const diffTime = Math.abs(date2 - date1);
                    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
                    if(diffDays > 14){

                        const time = diffDays - 14
                        const cost =  .25 * time;
                        fine.push([order.loanid , cost]);
                        console.log(fine);
                    }
                }
            }
        });
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