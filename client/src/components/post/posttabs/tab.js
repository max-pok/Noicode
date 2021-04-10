import React from 'react';
import './tab.css';
import { Upload, message, Button } from 'antd';

const Tab = (props) => {
  if (props.type === 'file') {
    const config = {
      // route action to upload router
      // action="/upload",
      beforeUpload: (file) => {
        console.log(file);
        return file.type === 'image/png' ? props.setImages(file.response.url) : message.error(`${file.name} is not a png file`);
      },
    };
    return (
      <Upload {...config}>
        <Button className='tab' icon={props.icon}>
          {props.name}
        </Button>
      </Upload>
    );
  } else {
    const linkClick = () => {
      props.setLinkState(true);
    };
    return (
      <Button className='tab' icon={props.icon} onClick={linkClick}>
        {props.name}
      </Button>
    );
  }
};

export default Tab;
