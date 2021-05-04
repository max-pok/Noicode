import React, { useState, useEffect } from "react"
import { List, Divider, Avatar, Space, Button, Typography, Image } from "antd"
import { MessageOutlined, LikeOutlined } from "@ant-design/icons"
import "./posts.css"

const { Text } = Typography

const Posts = ({ userPosts, userName }) => {
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

  const PostImage = (item) =>
    item.img[0] &&
    item.img[0].length > 0 &&
    item.img.map((id) => {
      return (
        <div key={id}>
          <Image className='post-pic' width={272} height={150} src={"http://localhost:8081/api/posts/" + id} />
        </div>
      )
    })

  const PostTitle = () => <a>{userName}</a>

  const PostAvatar = (item) => <Avatar src={"http://localhost:8081/api/users/profile-img/" + item.user_id} size={55} />

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
            <List.Item.Meta avatar={PostAvatar(item)} title={PostTitle()} description={new Date(item.date).toDateString()} />
            <p className='content'>{item.content}</p>
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
