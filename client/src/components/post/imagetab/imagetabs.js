import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './imagetabs.css';

const ImageTab = ({ preview, setImages }) => {
  return (
    <div className={preview ? 'image-tab active' : 'image-tab'}>
      <img className='image' src={preview} alt='user image' />
      <div className='close-image cross'>
        <CloseOutlined onClick={() => setImages(false)} />
      </div>
    </div>
  );
};

export default ImageTab;
