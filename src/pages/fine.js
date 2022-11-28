import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from 'react';
import './fine.css';

const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'fine_amt', headerName: 'Amount Due', width: 200  },
    { field: 'paid', headerName: 'Paid?', width: 200 },
    { field: 'available', headerName: 'Can be Paid?', width: 100 },
];

const rows = [];

export default function FineTable({ setResults }) {

    //[{"date_out":"2022-09-15T05:00:00.000Z","due_date":"2022-09-01T05:00:00.000Z","date_in":"2022-11-27T06:00:00.000Z","loanid":"25","fine_amt":"$18.25","paid":false}]
    var fine = [];
    var rows;
    var res;
    let sum = 0;

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

            let b;
            let x;
            if(order.paid == false) {
                x = 'No';
            } else {
                x = 'Yes';
            }
            if(order.date_in === null) {

                b = 'No';
            } else {

                b = 'Yes';
            }
            var info = {

                "id": order.loanid,
                "fine_amt": order.fine_amt,
                "paid": x,
                "available": b
            }
            if(order.paid == false) {
                var number = Number(order.fine_amt.replace(/[^0-9.-]+/g,""));
                sum = sum + number
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
        console.log(selectedRows)
        e.preventDefault();

        fetch('http://localhost:3000/fine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedRows),
        })
        .then(response => {
            console.log("test120");
            return response.text();
        })
        .then(data => {
            console.log("test130");
            console.log(data);
            alert(data);
        })
    }

    return (
        <div className = "fineTable"
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
                      isRowSelectable={(params) => (params.row.paid === 'No' && params.row.available === 'Yes') }
            />
            <li> Total fine is: ${sum}</li>
            <button className = "checkoutbutton" onClick={handleSubmit} >Pay Fine</button>
        </div>
    );
}