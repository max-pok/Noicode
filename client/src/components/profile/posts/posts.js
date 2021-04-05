import React, { useState } from "react"
import { List, Divider, Avatar, Space, Button, Typography } from "antd"
import { MessageOutlined, LikeOutlined } from "@ant-design/icons"

const { Text } = Typography

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `Post ${i}`,
    avatar: "https://max-pok.web.app/assets/images/hero.jpeg",
    post_img: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",
    like_count: Math.floor(Math.random() * 50),
    comment_count: Math.floor(Math.random() * 10),
    date: randomDate(new Date(2012, 0, 1), new Date()),
    content: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    tags: ["React", "Node.js", "Express", "OpenToWork", "Jobless", "SoonToBeHomeless"],
  })
}

const Posts = () => {
  const [isRecent, setIsRecent] = useState(true)
  const [posts, setPosts] = useState(listData)

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      <Text keyboard>{text}</Text>
    </Space>
  )

  const PostImage = (item) => <img width={272} alt='logo' src={item.post_img} />

  const PostTitle = (item) => <a href={item.href}>{item.title}</a>

  const PostAvatar = (item) => <Avatar src={item.avatar} size={55} />

  const getPosts = () => {
    if (isRecent) {
      return posts.sort((a, b) => b.date.getTime() - a.date.getTime())
    } else {
      return posts.sort((a, b) => b.like_count - a.like_count)
    }
  }

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
          <List.Item key={item.title} actions={[<IconText icon={LikeOutlined} text={item.like_count} />, <IconText icon={MessageOutlined} text={item.comment_count} />]} extra={PostImage(item)}>
            <List.Item.Meta avatar={PostAvatar(item)} title={PostTitle(item)} description={item.date.toDateString()} />
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
