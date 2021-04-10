import React, { useState, useEffect } from "react"
import { List, Divider, Avatar, Space, Button, Typography } from "antd"
import { MessageOutlined, LikeOutlined } from "@ant-design/icons"
import "./posts.css"

const { Text } = Typography

const Posts = ({ userPosts }) => {
  const [isRecent, setIsRecent] = useState(true)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    setPosts(userPosts)
  }, [userPosts])

  const getPosts = () => {
    if (isRecent) {
      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else {
      return posts.sort((a, b) => b.like_count - a.like_count)
    }
  }

  const LikeIcon = ({ icon, text }) => (
    <Space>
      <a className='like-icon'>{React.createElement(icon)}</a>
      <Text keyboard>{text}</Text>
    </Space>
  )

  const CommentIcon = ({ icon, text }) => (
    <Space>
      <a className='comment-icon'>{React.createElement(icon)}</a>
      <Text keyboard>{text}</Text>
    </Space>
  )

  const PostImage = (item) => item.post_img && <img width={272} alt='logo' src={item.post_img} />

  const PostTitle = (item) => <a href={"posts/" + item._id}>{item.title}</a>

  const PostAvatar = (item) => <Avatar src={"https://max-pok.web.app/assets/images/hero.jpeg"} size={55} />

  return (
    <>
      <Divider orientation='center'>Posts</Divider>
      <div className='text-end'>
        <Space>
          <Button type={isRecent ? "primary" : ""} onClick={() => setIsRecent(true)}>
            Recent
          </Button>
          <Button type={!isRecent ? "primary" : ""} onClick={() => setIsRecent(false)}>
            Popular
          </Button>
        </Space>
      </div>
      <br />
      <List
        itemLayout='vertical'
        size='large'
        bordered
        dataSource={getPosts()}
        renderItem={(item) => (
          <List.Item key={item.title} actions={[<LikeIcon icon={LikeOutlined} text={item.noice_ids.length} />, <CommentIcon icon={MessageOutlined} text={item.comment_ids.length} />]} extra={PostImage(item)}>
            <List.Item.Meta avatar={PostAvatar(item)} title={PostTitle(item)} description={new Date(item.date).toDateString()} />
            {item.content}
            <br />
            <br />
            {item.tags.map((tag, index) => {
              return (
                <a key={index} href={"https://google.com/" + tag}>
                  #{tag}{" "}
                </a>
              )
            })}
          </List.Item>
        )}
      />
    </>
  )
}

export default Posts
