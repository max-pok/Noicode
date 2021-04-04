import React from 'react';
import './tab.css';
const Tab = (props) => {
  // need to center the label. doesn't center for some reason.
  return (
    <div className='tab'>
      <div className='icon'>{props.icon}</div>
      {props.name}
    </div>
  );
};

export default Tab;
