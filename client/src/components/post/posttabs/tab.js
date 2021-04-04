import React from 'react';
import './tab.css';
const Tab = (props) => {
  return (
    <div className='tab'>
      <div className='icon'>{props.icon}</div>
      <label>{props.name}</label>
    </div>
  );
};

export default Tab;
