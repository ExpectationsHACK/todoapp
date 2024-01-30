import React, { useState, useEffect } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";



function App() {

  const [isCompletedScreen, setIsCompletedScreen] = useState(false);

  const [allTodos, setAllTodos] = useState([]);

  const [newTask, setNewTask] = useState('');

  const [newDetails, setNewDetails] = useState('');

  const [completedTodos, setCompletedTodos] = useState([])

  const handleAddTodo = () => {
    let newTodoItem = {
      task:newTask,
      details:newDetails
    }

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo)
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, '0');
    let mm = String(now.getMonth() + 1).padStart(2, '0');
    let yyyy = now.getFullYear();
    let h = String(now.getHours()).padStart(2, '0');
    let m = String(now.getMinutes()).padStart(2, '0');
    let s = String(now.getSeconds()).padStart(2, '0');
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index)
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
  }

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo)
  }

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  },[])

  return (
    <div className='App'>
      <h1>TodoApp</h1>

      <div className='todo-wrapper'>

        <div className='todo-input'>

          <div className='todo-input-item'>
            <label>Task</label>
            <input type='text' value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder='What is the task' />
          </div>

          <div className='todo-input-item'>
            <label>Details</label>
            <input type='text' value={newDetails} onChange={(e) => setNewDetails(e.target.value)} placeholder='What is the task description' />
          </div>

          <div className='todo-input-item'>
            <button type='button' onClick={handleAddTodo} className='primarybtn'>Add</button>
          </div>

         </div>

         <div className='btn-area'>
            <button className={`secondarybtn ${isCompletedScreen === false && `active`}`} 
            onClick={()=> setIsCompletedScreen(false)}>Todo</button>
            <button className={`secondarybtn ${isCompletedScreen === true && `active`}`}
            onClick={()=> setIsCompletedScreen(true)}>Completed</button>
         </div>

         <div className='todo-list'>

            {isCompletedScreen === false && allTodos.map((item, index) =>{
              return(
                  <div className='todo-list-item' key={index}>  
                  <div>
                    <h3>{item.task}</h3>
                    <p>{item.details}</p>
                  </div>
      
                  <div>
                    <MdDelete className='icon' onClick={() => handleDeleteTodo(index)} title='Delete' />
                    <FaCheck className='check-icon' onClick={() => handleComplete(index)} title='Complete' />
                  </div>
                </div>
              )
            })}

             {isCompletedScreen === true && completedTodos.map((item, index) =>{
              return(
                  <div className='todo-list-item' key={index}>  
                  <div>
                    <h3>{item.task}</h3>
                    <p>{item.details}</p>
                    <p><small>Completed on: {item.completedOn}</small></p>
                  </div>
      
                  <div>
                    <MdDelete className='icon' onClick={() => handleDeleteCompletedTodo(index)} title='Delete' />
                  </div>
                </div>
              )
            })}

         </div>

      </div>
    </div>
  )

}

export default App;
