import React from 'react';
import IconPerson from '../../assets/Icons/IconPerson.webp';
import IconCheck from '../../assets/Icons/IconCheck.png';
import './PersonTaskChecked.css';

function PersonTask({ name }) {
    return (
      <div className='person-task-checked'>
        <div className='person-name-checked'>
          <img src={IconPerson} alt="Person Icon" />
          <span className='span-checked'>{name}</span>
        </div>
        <img src={IconCheck} alt="Empty Check" className='end-checked' />
      </div>
    );
  }

export default PersonTask;
