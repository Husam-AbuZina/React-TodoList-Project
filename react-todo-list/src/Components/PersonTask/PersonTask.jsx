import React, { useState } from 'react';
import IconPerson from '../../assets/Icons/IconPerson.webp';
import IconCircle from '../../assets/Icons/IconCircle.png';
import IconCheck from '../../assets/Icons/IconCheck.png';
import IconEdit from '../../assets/Icons/IconEdit.webp';
import IconDelete from '../../assets/Icons/IconDelete.webp';
import './PersonTask.css';

function PersonTask({ id, name, checked, deleteTodo, updateTodo }) {
    const [isChecked, setIsChecked] = useState(checked);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);

    const toggleCheck = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        updateTodo(id, editedName, newCheckedState);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
    };

    const handleSaveEdit = () => {
        updateTodo(id, editedName, isChecked);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditedName(name);
        setIsEditing(false);
    };

    return (
        <div className='person-task'>
            <div className={`person-name ${isChecked ? 'checked' : ''}`}>
                <img src={IconPerson} alt="Person Icon" className={`${isChecked ? 'checked' : ''}`} />
                {isEditing ? (
                    <input
                        type="text"
                        value={editedName}
                        onChange={handleNameChange}
                    />
                ) : (
                    <span className={`${isChecked ? 'checked' : ''}`}>{name}</span>
                )}
            </div>
            <div>
                {isEditing ? (
                    <>
                        <button className='edit-save-btn' onClick={handleSaveEdit}>Save</button>
                        <button className='edit-cancel-btn' onClick={handleCancelEdit}>Cancel</button>
                    </>
                ) : (
                    <>
                        <img src={IconDelete} alt="Delete Icon" onClick={() => deleteTodo(id)} />
                        <img src={IconEdit} alt="Edit Icon" onClick={handleEdit} />
                        <img
                            src={isChecked ? IconCheck : IconCircle}
                            alt={isChecked ? "Checked Circle" : "Empty Circle"}
                            className={`end ${isChecked ? 'checked' : ''}`}
                            onClick={toggleCheck}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default PersonTask;
