
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = (event) => {
    event.preventDefault();
    if (todoInput.trim() === '') return; // Prevent adding empty todos

    const newTodo = {
      text: todoInput,
      completed: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setTodoInput('');
    saveLocalTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveLocalTodos(updatedTodos);
  };

  const toggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveLocalTodos(updatedTodos);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditInput(todos[index].text);
  };

  const handleEditChange = (event) => {
    setEditInput(event.target.value);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map((todo, i) =>
      i === editIndex ? { ...todo, text: editInput } : todo
    );
    setTodos(updatedTodos);
    saveLocalTodos(updatedTodos);
    setEditIndex(null);
    setEditInput('');
  };

  const saveLocalTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return (
    <div className="container">
      <div className="maintitle">
        <h1>To-Do List</h1>
      </div>
      <div className="card">
        <div className="input-btn">
          <input
            type="text"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <button onClick={addTodo}>
            <span className="material-symbols-outlined">add_circle</span>
          </button>
        </div>
        <div className="todo-container">
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <div
                key={index}
                className={`todo ${todo.completed ? 'completed' : ''}`}
                data-index={index}
              >
                {editIndex === index ? (
                  <div>
                    <input
                      type="text"
                      value={editInput}
                      onChange={handleEditChange}
                    />
                    <button className ="save-btn" onClick={saveEdit}>Save</button>
                  </div>
                ) : (
                  <>
                    <li className="todo-item">{todo.text}</li>
                    <button
                      className="complete-btn"
                      onClick={() => toggleComplete(index)}
                    >
                      <i className="fas fa-check-circle"></i>
                    </button>
                    <button
                      className="trash-btn"
                      onClick={() => deleteTodo(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => startEditing(index)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
