import React, { useState, useEffect } from "react"
import { Avatar, Image, Upload, message, Button } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import Posts from "./posts/posts"
import ProfileInfo from "./profile-info/profile-info"
import axios from "axios"
import "./profile.css"

const Profile = (props) => {
  const userInfoUrl = "http://localhost:8080/api/users/" + props.match.params.userId
  const userPostsUrl = "http://localhost:8080/api/posts/" + props.match.params.userId

  const [coverImg, setCoverImg] = useState("https://blog.creatopy.com/wp-content/uploads/2018/10/Twitch-Social-Media-Image-Size.jpg")
  // const [profileImg, setProfileImg] = useState("https://max-pok.web.app/assets/images/hero.jpeg")
  const [profileImg, setProfileImg] = useState("https://www.blexar.com/avatar.png")

  const [userInformation, setUserInformation] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const [userId, setUserId] = useState(props.match.params.userId)

  const handleImageChange = async (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  useEffect(() => {
    // get user data based on url param. if data do not exist refer to 404 page.
    axios
      .get(userPostsUrl)
      .then((response) => {
        setUserPosts(response.data.posts)
      })
      .catch((err) => {
        console.log(err)
      })

    axios
      .get(userInfoUrl)
      .then((response) => {
        setUserInformation(response.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.match.params.userId])

  const upload_data = {
    name: "file",
    action: "http://localhost:8080/api/users/upload-avatar/" + props.match.params.userId,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div className='container'>
      <div className='row justify-content-md-center'>
        <Image className='cover-pic' src={coverImg} />
        <div className='profile-pic'>
          <Avatar src={profileImg} size={140} className='avatar-pic'></Avatar>
          {userInformation.fname && userInformation.lname && <h3> {userInformation.fname + " " + userInformation.lname} </h3>}
          {userInformation.user_profession && <p> {userInformation.user_profession} </p>}

          <Upload {...upload_data}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>

          <div className='row text-start'>
            <div className='col col-lg-3'>
              <ProfileInfo userId={userId} userInformation={userInformation} />
            </div>
            <div className='col'>
              <Posts userPosts={userPosts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
