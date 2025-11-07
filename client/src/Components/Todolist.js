import './Todolist.css';
import React, { useState } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';

function Todolist(props) {
    const [pendingIds, setPendingIds] = useState([]);

    const taskComplete = (task) => {
        // Prevent multiple rapid toggles for the same task
        if (pendingIds.includes(task._id)) return;

        // Optimistically toggle local state
        props.toggleLocal(task._id);
        setPendingIds(ids => [...ids, task._id]);

        axios.put(`http://localhost:8000/api/tasks/${task._id}`, {
            _id: task._id,
            todo: task.todo,
            isCompleted: !task.isCompleted
        }).then(res => {
            // Sync with authoritative server response
            props.taskComplete(res.data);
        }).catch(err => {
            console.error('Error updating task:', err);
            // Revert optimistic toggle on error
            props.toggleLocal(task._id);
        }).finally(() => {
            setPendingIds(ids => ids.filter(id => id !== task._id));
        });
    }

    const removeTask = (id)=>{
        axios.delete(`http://localhost:8000/api/tasks/${id}`)
        .then(res=> props.removeTask(res.data)) 
        .catch(err=>{
            console.error('Error removing task:', err);
        });
    }

    const todolist = props.todolist.map((task, index) => {
        return <li key={task._id || index} className="task-item">
         <div style={{display:'flex'}}>
            <DoneAllIcon className={task.isCompleted ? 'isComplete' : 'checkicon'} />
            <p className={task.isCompleted ? 'taskComplete' : ''} onClick={() => {
                taskComplete(task)
            }}>{task.todo}</p>
         </div>
         <div>
            <EditIcon className="edit" onClick={() => {
                props.taskToUpdate(task);
                props.showPopup();
            }} />
            <HighlightOffIcon className="close"  onClick={()=>
            {
                removeTask(task._id)
            }}/>
         </div>
    </li>
    })
  return (
    <div className="tasklist">
        <ul>
            {todolist}
        </ul>
    </div>
  )
}

export default Todolist