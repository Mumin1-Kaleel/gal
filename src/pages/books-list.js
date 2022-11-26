import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./books-list.css"
import {useState} from "react";
import Modal from "./askForCard";
import {useMemo} from "react";

const columns = [
    { field: 'id', headerName: 'ISBN', width: 150 },
    { field: 'title', headerName: 'Title', width: 200  },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'available', headerName: 'Available?', width: 100 },
];



export default function DataTable({ setResults }) {


    var len = setResults.length;
    var name = '';
    for(let i = 0; i < len; i++) {

        console.log(setResults[i]);
        var x = JSON.stringify(setResults[i]);

        if(name.length === 0) {

            name = name.concat(x);
        } else {
           name = name.concat(',');
           name = name.concat(x)
        }
        console.log(name);
    }
   // setResults = '[{"isbn10":"10","author":"me","title":"non"},{"isbn10":"11","author":"me","title":"non"}]'
   // setResults = '[{"isbn10":"0195153448","isbn13":"9780195153446","author":"Mark P. O. Morford,Robert J. Lenardon","title":"Classical Mythology","cover":"http://www.openisbn.com/cover/0195153448_72.jpg","publisher":"Oxford University Press, USA","pages":"844"},{"isbn10":"2345678901","isbn13":null,"author":"Mark P. O. Morford,Robert J. Lenardon","title":"Classical Mythology","cover":null,"publisher":null,"pages":null}]';
  //  name = '{"isbn10":"0195153448","isbn13":"9780195153446","author":"Mark P. O. Morford,Robert J. Lenardon","title":"Classical Mythology","cover":"http://www.openisbn.com/cover/0195153448_72.jpg","publisher":"Oxford University Press, USA","pages":"844","available":"No"},{"isbn10":"2345678901","isbn13":null,"author":"Mark P. O. Morford,Robert J. Lenardon","title":"Classical Mythology","cover":null,"publisher":null,"pages":null,"available":"Yes"}'
   //setResults = '{"isbn10":"0195153448","isbn13":"9780195153446","author":"Mark P. O. Morford,Robert J. Lenardon","title":"Classical Mythology","cover":"http://www.openisbn.com/cover/0195153448_72.jpg","publisher":"Oxford University Press, USA","pages":"844\\n"},{"isbn10":"2345678901","isbn13":null,"author":"Mark P. O. Morford,Robert J. Lenardon","title":"Classical Mythology","cover":null,"publisher":null,"pages":null}'
    var res;

    res = '{"books":[' +   name   + ']}';

    const obj = JSON.parse(res);

    var objInfo = obj.books.map( function(order) {

        var info = {
            "id": order.isbn10,
            "author": order.author,
            "title": order.title,
            "available": order.available
        }
            return info;
    });

    console.log(objInfo);
    const rows = objInfo;

    const [selectedRows, setSelectedRows] = useState();
    const [modalOpen, setModalOpen] = useState(false);


    const handSub = () => {
        
        setModalOpen(true);
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
            <button className = "checkoutbutton" onClick={handSub} type = "button">Check out</button>
            {modalOpen && <Modal setOpenModal={setModalOpen}  setSelectedRows={selectedRows} />}
        </div>
    );
}