import './Updatetask.css';
import React from 'react'
//rfce 
import axios from 'axios';
import { useState } from 'react';
function Updatetask(props) {
    // track the editable todo text (props.task may be an object)
    const [task, setTask] = useState(props.task?.todo || '');
    const updatetask = () => {
        if (task.trim() === '' || props.task.todo === task) props.removePopup();

        axios.put(`http://localhost:8000/api/tasks/${props.task._id}`, {
            _id: props.task._id,
            todo: task,
            isCompleted: props.task.isCompleted
        }).then(res => {
            props.removePopup();
            props.updatetask(res.data);
        }).catch(err => {
            console.error('Error updating task:', err);
        });
    }
  return (
    <div className='popup'>
        <div className='popup-content'>
            <input type="text" placeholder='Update your task...' value={task}
            onChange={event=> setTask(event.target.value)} />
            <button onClick={updatetask}>Update Task</button>
        </div>
    </div>
  )
}

export default Updatetask