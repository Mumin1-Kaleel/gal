import React, {useState} from "react";
import './askForCard.css'

function Modal({ setOpenModal, setSelectedRows }) {


    const [ISBN, setISBN] = useState('');
    const handleSubmit = async e => {}

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
                            value={ISBN}
                            onChange={
                                (e) => setISBN(e.target.value)
                            }
                        />

                        <button className = "close" type = "submit"
                                onClick={() => {
                                setOpenModal(false);
                        }}
                        >
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Modal;