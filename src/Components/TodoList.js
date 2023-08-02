import React, { useState, useEffect } from 'react';
import db from './firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc } from 'firebase/firestore';
import './TodoList.css';

const TodoList = ({ collectionName }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
      console.log(taskList);
    });

    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
    };
  }, [collectionName]);

  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Add a new task to Firestore
    await addDoc(collection(db, collectionName), { task: newTask, completed: false });

     // Set the success message
    setSuccessMessage('Task added successfully!');

    // Reset input field
    setNewTask('');
    
    // Remove the success message after 5 seconds
    setTimeout(() => {
    removeSuccessMessage();
  }, 5000);
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = async (taskId, completed) => {
    const taskRef = doc(db, collectionName, taskId); // Get the reference to the document
    await updateDoc(taskRef, { completed: !completed }); // Update the completed field
  };
  const removeSuccessMessage = () => {
    setSuccessMessage('');
  };

  return (
    <div className="todo-list">
    <h3 className="heading">{collectionName}</h3>
    {successMessage && (
      <div className="success-message" key="success-message">
        {successMessage} 
        </div>
    )}
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className="item">
            <label
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTaskCompletion(task.id, task.completed)}
              >
              {task.task}
            </label>
            <label
            
              className='container'
            >

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id, task.completed)}
              />
            <div class="checkmark"></div>
              </label>
          </li>
        ))}
      </ul>
      <form>
        <div className="form-item">
          <label htmlFor="task" className="label">
          </label>
          <input
            type="text"
            id="task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="input"
          />
        </div>
        <button onClick={handleAddTask} className="button">
          Lägg Till
        </button>
      </form>
    </div>
  );
};

export default TodoList;
