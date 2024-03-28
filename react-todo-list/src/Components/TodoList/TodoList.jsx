import React, { useState, useEffect } from 'react';
import Search from '../Search/Search';
import PersonTask from '../PersonTask/PersonTask';
import CancelButton from '../CancelButton/CancelButton';
import SaveButton from '../SaveButton/SaveButton';
import AddTask from '../AddTask/AddTask';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      fetch('/api/todos')
      .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        return response.json();
      })
      .then(fetchedTodos => {
        console.log('Fetched todos:', fetchedTodos);
        setTodos(fetchedTodos);
      })
      .catch(error => console.error('Error fetching todos:', error)); // Error 1
    
    }, []);
    

      const handleAddTodo = async (taskName) => {
        const newTask = { id: uuidv4(), name: taskName, checked: false }; // Create a new task object with 'name' and 'checked' properties
        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            });
            if (response.ok) {
                const newTodos = [...todos, newTask];
                setTodos(newTodos);
            } else {
                console.error('Error adding todo:', response.statusText); // Error 2
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };
    
    
      const deleteTodo = async (id) => {
        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
          } else {
            console.error('Error deleting todo:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      };
      
      const updateTodo = async (id, updatedName, updatedChecked) => {
        const updatedTask = { name: updatedName, checked: updatedChecked };
        try {
          const response = await fetch(`/api/todos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
          });
          if (response.ok) {
            const updatedTodos = todos.map(todo =>
              todo.id === id ? { ...todo, ...updatedTask } : todo
            );
            setTodos(updatedTodos);
          } else {
            console.error('Error updating todo:', response.statusText);
          }
        } catch (error) {
          console.error('Error updating todo:', error);
        }
      };

    return (
        <div className='todo-list-container'>
            <AddTask onAdd={handleAddTodo} />
            <Search />
            <div>
                {todos.map((todo) => (
                    <PersonTask
                        id={todo.id}
                        name={todo.name}
                        checked={todo.checked}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                    />
                ))}
            </div>
            <div className='button-container'>
                <CancelButton />
                <SaveButton />
            </div>
        </div>
    );
}

export default TodoList;
