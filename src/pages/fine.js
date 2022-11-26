import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState} from 'react';
import './fine.css';

const columns = [
    { field: 'id', headerName: 'ISBN', width: 150 },
    { field: 'title', headerName: 'Title', width: 200  },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'dateout', headerName: 'Date out', width: 100 },
];

const rows = [];

export default function FineTable({ setResults }) {



    const [selectedRows, setSelectedRows] = useState();



    const handleSubmit = async e => {


        console.log(selectedRows)
        e.preventDefault();
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
            />
            <button className = "checkoutbutton" onClick={handleSubmit} >Pay Fine</button>
        </div>
    );
}