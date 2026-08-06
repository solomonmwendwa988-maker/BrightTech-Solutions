import Todo from './components/Todo.jsx'
import './App.css'
import Popup from './components/Popup.jsx'
import { useState, useEffect } from 'react'


function App() {


  const [popupOpen, setPopupOpen] = useState(false)

  function togglePopup(){
    setPopupOpen(true)
    console.log("parent notified")
  }

  function closePopup(){
    setPopupOpen(false)
  }
  // fetch data as soon as page loads
  useEffect(() => {
    console.log("component mounted")
  }, [])

  return (
  
    <>
      <h1>My Todos</h1>
      <div>
        <input type="text" onChange={(event) => {
          console.log(event.target.value)
        }}/>
        <button onClick={() => setPopupOpen(true)}>Add to do</button>
      </div>
      <Todo togglePopup={togglePopup} task='Learn react'/>
      <Todo togglePopup={togglePopup} task='Finnish ASAP frontend'/>
      <Todo togglePopup={togglePopup} task='Land a job'/>
      <Todo togglePopup={togglePopup} task='Earn 100k+'/>
      { popupOpen && <Popup closePopup={closePopup} title='Are you sure?' /> }
    </>
  )
}

export default App
