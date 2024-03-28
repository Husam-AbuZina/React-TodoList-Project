import React from 'react';
import IconSearch from '../../assets/Icons/IconSearch.png';
import './Search.css';

function Search() {
  return (
    <div className='search-box'>
      <img src={IconSearch} alt="Search Icon" />
      <span>Find members</span>
    </div>
  );
}

export default Search;
