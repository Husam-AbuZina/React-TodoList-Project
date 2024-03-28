import React, { useState } from 'react';
import IconAdd from '../../assets/Icons/IconAdd.webp'
import './AddTask.css';

function AddTask({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') { // Ibraheem     
      onAdd(inputValue);
      setInputValue('');
    }
  };
  
  return (
    <div className='search-box'>
      <img className='search-end' src={IconAdd} alt="Add Icon" onClick={() => setTodos([todo, ...todos])}/>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add member"
      />
    </div>
  );
}

export default AddTask;
