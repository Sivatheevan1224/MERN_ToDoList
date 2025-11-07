import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AdddTask from './Components/AdddTask';
function App() {
  const[todolist, setTodolist]=useState([]);
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

  return (
    <div className="App">
      <AdddTask addTask={addTask}/>
    </div>
  );
}
export default App
