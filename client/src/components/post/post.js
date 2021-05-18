import { Form, Input, Divider, Button } from "antd";
import {
  CameraOutlined,
  LinkOutlined,
  FileGifOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import "./post.css";

import Tab from "./posttabs/tab";
import ImageTab from "./imagetab/imagetabs";
import LinkInput from "./linkinput/linkinput";
import user from "../../assets/images/user.jpg";

const { TextArea } = Input;
const Post = (props) => {
  const [active, setActive] = useState(false);
  const [images, setImages] = useState("");
  const [linkVal, setLinkVal] = useState("");
  const [linkDisplayState, setLinkDisplayState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userId, setUserId] = useState(props.token);

  const postUrl = "http://localhost:8080/api/posts/upload-post/" + userId;
  console.log(userId);
  const onChange = (e) => {
    // console.log('Change:', e.target.value);
  };
  const handleLinkChange = (e) => {
    setLinkVal(e.target.value);
  };

  const onFinish = (values) => {
    setIsLoading(true);
    const data = {
      user_id: userId,
      content: values.contentText,
      link: linkVal,
      image: values.contentImage,
    };
    axios
      .post(postUrl, data, null)
      .then((response) => {
        if (response.status === 200) {
          console.log("Posted", response);
          setIsLoading(false);

          return;
        }
      })
      .catch((error) => {
        console.error("Couldn't post", error);
        setIsLoading(false);
      });
  };

  return (
    <Form className="main-container" onFinish={onFinish}>
      <div className={active ? "close-post cross visible" : " close-post"}>
        <CloseOutlined onClick={() => setActive(false)} />
      </div>
      <div className="post-holder">
        <div className="image-holder">
          <img src={user} alt="user-img" />
        </div>
        <Form.Item
          className="input"
          name="contentText"
          rules={[
            { required: true, message: "Please add something before posting" },
          ]}
        >
          <TextArea
            maxLength={1000}
            onChange={onChange}
            size="large"
            placeholder="Share your knowledge..."
            onClick={() => setActive(true)}
          />
        </Form.Item>
      </div>
      <Divider className="divider-active" />

      <Form.Item
        name="contentImage"
        className={images.preview ? "image-tab active" : "image-tab"}
      >
        <ImageTab preview={images.preview} setImages={setImages} />
      </Form.Item>

      <Form.Item
        name="content-link"
        className={linkDisplayState ? "link-input active" : "link-input"}
      >
        <LinkInput
          link={linkDisplayState}
          setLinkVal={setLinkVal}
          handleLinkChange={handleLinkChange}
        />
      </Form.Item>

      <div className="tabs-holder">
        <Tab
          className="tab-btn"
          type="file"
          setImages={setImages}
          icon={<CameraOutlined />}
          name="Photo"
        />
        <Tab
          className="tab-btn"
          setLinkDisplayState={setLinkDisplayState}
          state={linkDisplayState}
          icon={<LinkOutlined />}
          name="Share link"
        />
        <Tab
          className="tab-btn"
          type="file"
          icon={<FileGifOutlined />}
          name="Post GIF"
        />
      </div>

      <Divider className={active ? "active" : "divider"} />
      <div className={active ? "post-bottom active" : "post-bottom "}>
        <Form.Item>
          <Button
            className="publish-post-btn"
            htmlType="submit"
            type="primary"
            block
            style={{ borderRadius: "5px" }}
            loading={isLoading}
          >
            {"Publish"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};
export default Post;
