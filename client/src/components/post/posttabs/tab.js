import React from 'react';
import './tab.css';
import { Upload, message, Button } from 'antd';

const Tab = (props) => {
  if (props.type === 'file') {
    const config = {
      // route action to upload router
      // action="/upload",
      beforeUpload: (file) => {
        console.log(file.type);
        if (file.type === 'image/png' || file.type === 'image/jpeg')
          return props.setImages({
            preview: URL.createObjectURL(file),
          });
        else message.error(`${file.name} error`);
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
      props.setLinkDisplayState(!props.state);
    };
    return (
      <Button className='tab' icon={props.icon} onClick={linkClick}>
        {props.name}
      </Button>
    );
  }
};

export default Tab;
