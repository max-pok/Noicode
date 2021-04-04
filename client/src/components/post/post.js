import { Form, Input, Divider } from 'antd';

import './post.css';
import user from '../../assets/images/user.jpg';

const Post = () => {
  return (
    <div>
      <div className='post-holder'>
        <div className='image-holder'>
          <img src={user} alt='user-img' />
        </div>
        <Form.Item className='input' name='post' rules={[{ required: true, message: 'Please enter your e-mail address!' }]}>
          <Input type='textarea' size='large' placeholder='Share your knowledge..' />
        </Form.Item>
      </div>
    </div>
  );
};
export default Post;
