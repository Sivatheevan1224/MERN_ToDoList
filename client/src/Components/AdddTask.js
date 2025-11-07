import './AddTask.css';
import React,{useState} from 'react';
import axios from 'axios';
function AdddTask(props) {
    const[task, setTask]=useState('');
    const AddTask= ()=>{
        if(task.trim() === '') return; // Prevent adding empty tasks

        else{
            axios.post('http://localhost:8000/api/tasks', { todo: task, isCompleted: false })
            .then(res=>{
                console.log('Task added:', res.data);
                setTask(''); // Clear input field after adding
                props.addTask(res.data); // Update parent component's state
            })
            .catch(err=>{
                console.error('Error adding task:', err);
            });
        }
    }

    return (
        <div className="addtask">
            <input type="text" placeholder="Add new task..."  value={task} 
            onChange= {event=>setTask(event.target.value)}/>
            <button onClick={() => {
                // Handle adding the task
                console.log('Task added:', task);
                AddTask();
            }}>Add Task</button>
        </div>
    );
}
export default AdddTask;