import React from "react"
import { List, Divider, Avatar, Space, Button } from "antd"
import { MessageOutlined, LikeOutlined } from "@ant-design/icons"

const listData = []
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://ant.design",
    title: `Post ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    date: new Date().toUTCString(),
    content: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  })
}

const Posts = () => {
  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )

  return (
    <>
      <Divider orientation='center'>Posts</Divider>
      <div className='text-end'>
        <Space>
          <Button>Recent</Button>
          <Button>Popular</Button>
        </Space>
      </div>
      <br />
      <List
        itemLayout='vertical'
        size='large'
        bordered
        dataSource={listData}
        renderItem={(item) => (
          <List.Item key={item.title} actions={[<IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />, <IconText icon={MessageOutlined} text='2' key='list-vertical-message' />]} extra={<img width={272} alt='logo' src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' />}>
            <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={<a href={item.href}>{item.title}</a>} description={item.date} />
            {item.content}
          </List.Item>
        )}
      />
    </>
  )
}

export default Posts
