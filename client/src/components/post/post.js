import { Form, Input, Divider } from 'antd';
import { CameraOutlined, LinkOutlined, FileGifOutlined } from '@ant-design/icons';

import './post.css';
import Tab from './posttabs/tab';
import user from '../../assets/images/user.jpg';

const { TextArea } = Input;
const Post = () => {
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };
  return (
    <div className='main-container'>
      <div className='post-holder'>
        <div className='image-holder'>
          <img src={user} alt='user-img' />
        </div>
        <Form.Item className='input' name='post' rules={[{ required: true, message: 'Please add something before posting' }]}>
          <TextArea maxLength={1000} onChange={onChange} size='large' placeholder='Share your knowledge...' />
        </Form.Item>
      </div>
      <Divider />
      <div className='tabs-holder'>
        <Tab icon={<CameraOutlined />} name={'Photo'} />
        <Tab icon={<LinkOutlined />} name={'Share link'} />
        <Tab icon={<FileGifOutlined />} name={'Post GIF'} />
      </div>
    </div>
  );
};
export default Post;
