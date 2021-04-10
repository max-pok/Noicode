import { Form, Input, Divider, Button } from 'antd';
import { CameraOutlined, LinkOutlined, FileGifOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './post.css';
import Tab from './posttabs/tab';
import user from '../../assets/images/user.jpg';

const { TextArea } = Input;
const Post = () => {
  const [active, setActive] = useState(false);
  const [images, setImages] = useState();

  const [linkState, setLinkState] = useState(false);
  const [linkVal, setLinkVal] = useState('');

  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  const handleLinkChange = (e) => {
    console.log(linkVal);
    setLinkVal(e.target.value);
  };

  return (
    <Form className='main-container'>
      <div className={active ? 'close-post cross visible' : ' close-post'}>
        <CloseOutlined onClick={() => setActive(false)} />
      </div>
      <div className='post-holder'>
        <div className='image-holder'>
          <img src={user} alt='user-img' />
        </div>
        <Form.Item className='input' name='post' rules={[{ required: true, message: 'Please add something before posting' }]}>
          <TextArea maxLength={1000} onChange={onChange} size='large' placeholder='Share your knowledge...' onClick={() => setActive(true)} />
        </Form.Item>
      </div>
      <Divider className='divider-active' />

      <div className={images ? 'image-tab active' : 'image-tab'}>
        <img src={images} alt='user image' />
      </div>

      <div className={linkState ? 'link-tab active' : 'link-tab'}>
        <Input className='input' size='large' placeholder='Enter the link URL' onChange={handleLinkChange} allowClear />
        <CloseOutlined className='close-link cross' onClick={() => setLinkState(false)} />
      </div>

      <div className='tabs-holder'>
        <Tab className='tab-btn' type='file' setImages={setImages} icon={<CameraOutlined />} name='Photo' />
        <Tab className='tab-btn' icon={<LinkOutlined />} name='Share link' setLinkState={setLinkState} />
        <Tab className='tab-btn' type='file' icon={<FileGifOutlined />} name='Post GIF' />
      </div>
      <Divider className={active ? 'active' : 'divider'} />
      <div className={active ? 'post-bottom active' : 'post-bottom '}>
        <Button className='publish-post-btn' type='primary' block style={{ borderRadius: '5px' }}>
          {'Publish'}
        </Button>
      </div>
    </Form>
  );
};
export default Post;
