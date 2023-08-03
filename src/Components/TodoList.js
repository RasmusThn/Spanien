import React, { useState, useEffect } from 'react';
import db from './firebase';
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './TodoList.css';

const TodoList = ({ collectionName, isAdminMode }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('Allt');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredTasks = selectedCategory === 'Allt'
    ? tasks
    : tasks.filter((task) => task.category === selectedCategory);

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstItem, indexOfLastItem);



  useEffect(() => {
    setCurrentPage(1); // Reset the current page to 1 when the selected category changes
  
    const unsubscribe = onSnapshot(collection(db, collectionName), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
      console.log(taskList);
    });
  
    return () => {
      unsubscribe(); // Unsubscribe from the snapshot listener when the component unmounts
    };
  }, [collectionName, selectedCategory]);

  const handleAddTask = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!newTask || !selectedCategory) {
      // Check if the new task or selected category is empty, and prevent adding
      return;
    }
    // Add a new task to Firestore
    await addDoc(collection(db, collectionName), {
      task: newTask,
      category: selectedCategory,
      completed: false,
    });
    // Set the success message
    setSuccessMessage('Task added successfully!');

    // Reset input field
    setNewTask('');
    setSelectedCategory('Allt');
    // Remove the success message after 5 seconds
    setTimeout(() => {
      removeSuccessMessage();
    }, 5000);
  };

  const handleEditTask = async (taskId) => {
    const taskRef = doc(db, collectionName, taskId); // Get the reference to the document
    await updateDoc(taskRef, { task: editedTask }); // Update the task field with the new value
    setEditTaskId(null); // Reset editTaskId to exit the editing mode
  };
  const handleEditButtonClick = (taskId, taskContent) => {
    setEditTaskId(taskId);
    setEditedTask(taskContent);
  };
  const handleDeleteTask = async (taskId) => {
    const taskRef = doc(db, collectionName, taskId); // Get the reference to the document
    await deleteDoc(taskRef); // Delete the document from Firestore
  };

  const toggleTaskCompletion = async (taskId, completed) => {
    const taskRef = doc(db, collectionName, taskId); // Get the reference to the document
    await updateDoc(taskRef, { completed: !completed }); // Update the completed field
  };

  const removeSuccessMessage = () => {
    setSuccessMessage('');
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={`todo-list ${isAdminMode ? 'isAdminMode' : ''}`}>
      <h2 style={{ fontFamily: "'Dancing Script', cursive" }} className="heading">{collectionName}</h2>
      <hr/>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Tillbaka
        </button>
        <span>{`${currentPage} / ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Nästa
        </button>
      </div>
      {successMessage && (
        <div className="success-message" key="success-message">
          {successMessage}
        </div>
        
      )}
      <ul className="list">
        {currentTasks.map((task) => (
          <li key={task.id} className={`item ${isAdminMode ? 'admin-mode' : ''}`}>
            {editTaskId === task.id ? (
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                className="input"
              />
            ) : (
              <>
                <label className="container">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id, task.completed)}
                  />
                  <div className="checkmark"></div>
                </label>
                <label
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  onClick={() => toggleTaskCompletion(task.id, task.completed)}
                >
                  {task.task}
                  <div className="category">({task.category})</div>
                </label>
              </>
            )}
            {isAdminMode && (
              <>
              <div className="admin-buttons">
            {editTaskId === task.id ? (
              <button onClick={() => handleEditTask(task.id)} className="button">
                Spara
              </button>
            ) : (
              <button onClick={() => handleEditButtonClick(task.id, task.task)} className="button">
                Edit
              </button>
            )}
            <button onClick={() => handleDeleteTask(task.id)} className="button-delete">
              Delete
            </button>
            </div>
            </>

            )}
            </li>
        ))}
      </ul>
      <hr/>
      <form>
        <div className="form-item">
          <label htmlFor="task" className="label"></label>
          <input
            type="text"
            id="task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
          >
            <option value="Allt">Allt</option>
            <option value="Kök">Kök</option>
            <option value="Badrum">Badrum</option>
            <option value="Vardagsrum">Vardagsrum</option>
            <option value="SovrumUppe">SovrumUppe</option>
            <option value="SovrumNere">SovrumNere</option>
            <option value="Baksidan">Baksidan</option>
            <option value="Framsidan">Framsidan</option>
            <option value="Balkong">Balkong</option>
            <option value="Hall">Hall</option>
            <option value="Källare">Källare</option>
            <option value="Övrigt">Övrigt</option>
          </select>
        </div>
        <button onClick={handleAddTask} className="button">
          Lägg Till
        </button>
      </form>
    </div>
  );
};

export default TodoList;
