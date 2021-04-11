import React from 'react';
import { Input } from 'antd';

function LinkInput(props) {
  const handleLinkChange = (e) => {
    props.setLinkVal(e.target.value);
  };
  return (
    <div className={props.link ? 'link-input active' : 'link-input'}>
      <Input className='input' size='large' placeholder='Enter the link URL' onChange={handleLinkChange} allowClear />
    </div>
  );
}

export default LinkInput;
