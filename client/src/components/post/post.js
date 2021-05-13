import { Form, Input, Divider, Button } from "antd"
import { CameraOutlined, LinkOutlined, FileGifOutlined, CloseOutlined } from "@ant-design/icons"
import { useState } from "react"
import "./post.css"

import Tab from "./posttabs/tab"
import ImageTab from "./imagetab/imagetabs"
import LinkInput from "./linkinput/linkinput"
import user from "../../assets/images/user.jpg"

const { TextArea } = Input
const Post = () => {
  const [active, setActive] = useState(false)
  const [images, setImages] = useState("")
  const [linkVal, setLinkVal] = useState("")
  const [linkDisplayState, setLinkDisplayState] = useState(false)

  const onChange = (e) => {
    console.log("Change:", e.target.value)
  }
  const handleLinkChange = (e) => {
    setLinkVal(e.target.value)
  }
  return (
    <Form className='main-container'>
      <div className={active ? "close-post cross visible" : " close-post"}>
        <CloseOutlined onClick={() => setActive(false)} />
      </div>
      <div className='post-holder'>
        <div className='image-holder'>
          <img src={user} alt='user-img' />
        </div>
        <Form.Item className='input' name='post' rules={[{ required: true, message: "Please add something before posting" }]}>
          <TextArea maxLength={1000} onChange={onChange} size='large' placeholder='Share your knowledge...' onClick={() => setActive(true)} />
        </Form.Item>
      </div>
      <Divider className='divider-active' />

      <ImageTab preview={images.preview} setImages={setImages} />
      <LinkInput link={linkDisplayState} setLinkVal={setLinkVal} />

      <div className='tabs-holder'>
        <Tab className='tab-btn' type='file' setImages={setImages} icon={<CameraOutlined />} name='Photo' />
        <Tab className='tab-btn' setLinkDisplayState={setLinkDisplayState} state={linkDisplayState} icon={<LinkOutlined />} name='Share link' />
        <Tab className='tab-btn' type='file' icon={<FileGifOutlined />} name='Post GIF' />
      </div>

      <Divider className={active ? "active" : "divider"} />
      <div className={active ? "post-bottom active" : "post-bottom "}>
        <Button className='publish-post-btn' type='primary' block style={{ borderRadius: "5px" }}>
          {"Publish"}
        </Button>
      </div>
    </Form>
  )
}
export default Post
