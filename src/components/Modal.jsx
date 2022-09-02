import "./Modal.css";

export default function Modal ({closeModal, delAll}){

    
    return (
        <div className="modalBackground">
            <div className="modalContainer">
            <div className="titleCloseBtn">
            <button className="x"onClick={() => closeModal(false)}>X</button>
            </div>
<div className="title">
    <h2>Are you sure you want to delete all images </h2>
</div>
<div className="footer">
    <button id="cancelBtn"onClick={() => closeModal(false)}>NO</button>
    <button onClick={delAll}>YES</button>
</div>
            </div>
        </div>
    );
}