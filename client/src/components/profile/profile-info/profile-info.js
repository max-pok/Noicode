import React from "react"
import { List, Divider, Space, Button, Avatar } from "antd"
import { faMapMarkerAlt, faGraduationCap, faGlobeAmericas } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProfileInfo = () => {
  const data = [
    {
      title: "Studied at",
      description: "SCE",
      icon: <FontAwesomeIcon icon={faGraduationCap} />,
    },
    {
      title: "From",
      description: "Melbourne, AU",
      icon: <FontAwesomeIcon icon={faGlobeAmericas} />,
    },
    {
      title: "Lives in",
      description: "Los Angeles, CA",
      icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
    },
    {
      title: "GitHub",
      description: "github.com/max-pok",
      icon: <FontAwesomeIcon icon={faGithub} />,
    },
    {
      title: "LinkedIn",
      description: "github.com/max-pok",
      icon: <FontAwesomeIcon icon={faLinkedinIn} />,
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
            <List.Item.Meta title={item.title} description={item.description} />
            {item.icon}
          </List.Item>
        )}
      />
    </>
  )
}

export default ProfileInfo
