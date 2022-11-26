import React, {useState} from "react";
import './askForCard.css'

function Modal({ setOpenModal, setSelectedRows }) {
    console.log("testy");
    console.log(setSelectedRows.length);
    const [CardID, setCardID] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        console.log("tesst");
        fetch('http://localhost:3000/Search/:' + String(CardID), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(setSelectedRows),
        })
        .then(response => {
            console.log("test");
            //console.log(response.text());
            return response.text();
        })
        .then(data => {
            console.log("brest");
            alert(data);
        }) 
 

    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="body">
                    <form onSubmit = {handleSubmit}>
                        <label className = "cardno" >Card no.</label>

                        <input
                            className = "cardArea"
                            type="text"
                            required
                            value={CardID}
                            onChange={
                                (e) => setCardID(e.target.value)
                            }
                        />

                        <button className = "close" type = "submit">
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Modal;