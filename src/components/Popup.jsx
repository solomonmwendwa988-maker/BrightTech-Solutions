

function Popup({title, closePopup}) {
    return (
        <>
            <div onClick={() => closePopup()} className="popup-overlay">
                <div className="popup">
                    <span className="h3">{title}</span>
                    <div className="btn">
                        <button onClick={() => {console.log("confirm button clicked")}} className="delete-btn">Confirm</button>
                        <button onClick={() => closePopup()} className="cancel-btn">Cancel</button>
                    </div>
                    
                </div>
            </div>
            <div onClick={() => closePopup()}></div>
        </>
    );
}

export default Popup;