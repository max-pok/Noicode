import React, { useState, useEffect } from "react"
import { List, Divider, Space, Button } from "antd"
import { faMapMarkerAlt, faGraduationCap, faGlobeAmericas, faBuilding } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ProfileInfo = (props) => {
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [information, setInformation] = useState([])

  const data = [
    {
      title: "Studied at",
      description: information.studied_at || "-",
      icon: <FontAwesomeIcon icon={faGraduationCap} />,
    },
    {
      title: "Works at",
      description: information.works_at || "-",
      icon: <FontAwesomeIcon icon={faBuilding} />,
    },
    {
      title: "From",
      description: information.from || "-",
      icon: <FontAwesomeIcon icon={faGlobeAmericas} />,
    },
    {
      title: "Lives in",
      description: information.lives_at || "-",
      icon: <FontAwesomeIcon icon={faMapMarkerAlt} />,
    },
    {
      title: "GitHub",
      description: information.github_link || "-",
      icon: <FontAwesomeIcon icon={faGithub} />,
    },
    {
      title: "LinkedIn",
      description: information.linkedin_link || "-",
      icon: <FontAwesomeIcon icon={faLinkedinIn} />,
    },
  ]

  useEffect(() => {
    // checks if the profile page belongs to the logged in user.
    setIsCurrentUser(props.userId === localStorage.getItem("userId"))

    if (props.userInformation) {
      let result = Object.keys(props.userInformation).map((key, index) => [key, props.userInformation[key]])
      setInformation(result)
    }
  }, [props.userInformation])

  return (
    <>
      <Divider orientation='center'>Information</Divider>
      {isCurrentUser && (
        <div className='text-start'>
          <Space>
            <Button>Edit</Button>
          </Space>
        </div>
      )}
      <br />
      <List
        itemLayout='horizontal'
        bordered
        dataSource={data}
        renderItem={(item) =>
          item.description && (
            <List.Item>
              <List.Item.Meta title={item.title} description={item.description} />
              {item.icon}
            </List.Item>
          )
        }
      />
    </>
  )
}

export default ProfileInfo
