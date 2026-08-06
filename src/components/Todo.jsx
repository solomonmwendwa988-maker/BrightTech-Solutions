
function Todo({task, togglePopup}){

   

    return(
        <>
            <div className="todo-item">
                <h2>{task}</h2>
                
                <button onClick={() => togglePopup()}>Delete</button>
            </div>
        </>
    );
}

export default Todo