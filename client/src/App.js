import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AdddTask from './Components/AdddTask';
import Todolist from './Components/Todolist';
import Updatetask from './Components/Updatetask';
function App() {
  const[todolist, setTodolist]=useState([]);
  const [taskToUpdate, setTaskToUpdate]=useState({});
  const [showPopup,setShowPopup]=useState(false);

  useEffect(()=>{
    axios.get('http://localhost:8000/api/tasks')
    .then(res=>{
      setTodolist(res.data);
      //console.log(`Fetched ${res.data.length} tasks`);
    })
    .catch(err=>{
      console.error('Error fetching tasks:', err);
    });
  },[])

  const addTask = newTask =>{
    setTodolist([...todolist, newTask]);
  }

  // Update task state from server response
  const taskComplete = task =>{
    const newList = todolist.map(item =>
      item._id === task._id ? { ...item, isCompleted: task.isCompleted } : item
    );
    setTodolist(newList);
  }

  // Optimistically toggle locally (returns the toggled value)
  const toggleLocal = id => {
    const newList = todolist.map(item =>
      item._id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodolist(newList);
  }

  const removeTask = task => {
    const newList = todolist.filter(item => item._id !== task._id);
    setTodolist(newList);
  }

  const updatetask= task =>{
    const newList = [...todolist]
    newList.forEach(item => {
      if(item._id === task._id){
        item.todo= task.todo;
      }
    })
    setTodolist(newList);
  }

  return (
    <div className="App">
      <AdddTask addTask={addTask}/>
      <Todolist todolist={todolist} taskComplete={taskComplete}
       toggleLocal={toggleLocal} removeTask={removeTask} 
       taskToUpdate={task=> setTaskToUpdate(task)} showPopup={() => setShowPopup(!showPopup)} />
      {showPopup && <Updatetask task={taskToUpdate} updatetask={updatetask}  removePopup={() => setShowPopup(!showPopup)} />}
    </div>
  );
}
export default App
