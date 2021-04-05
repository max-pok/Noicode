import React from "react"
import { List, Divider, Space, Button } from "antd"

const ProfileInfo = () => {
  const data = [
    {
      title: "Studied at",
      description: "SCE",
    },
    {
      title: "From",
      description: "Melbourne, AU",
    },
    {
      title: "Lives in",
      description: "Los Angeles, CA",
    },
  ]

  return (
    <>
      <Divider orientation='center'>Information</Divider>
      <div className='text-start'>
        <Space>
          <Button>Edit</Button>
        </Space>
      </div>
      <br />
      <List
        itemLayout='horizontal'
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta title={<a href='https://ant.design'>{item.title}</a>} description={item.description} />
          </List.Item>
        )}
      />
    </>
  )
}

export default ProfileInfo
