import React, { useState, useEffect } from "react"
import { Avatar, Image } from "antd"
import Posts from "./posts/posts"
import ProfileInfo from "./profile-info/profile-info"
import "./profile.css"
import axios from "axios"

const Profile = (props) => {
  const userInfoUrl = "http://localhost:8080/api/users/" + props.match.params.userId
  const userPostsUrl = "http://localhost:8080/api/posts/" + props.match.params.userId

  const [coverImg, setCoverImg] = useState("https://blog.creatopy.com/wp-content/uploads/2018/10/Twitch-Social-Media-Image-Size.jpg")
  const [profileImg, setProfileImg] = useState("https://max-pok.web.app/assets/images/hero.jpeg")

  const [userInformation, setUserInformation] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const [userId, setUserId] = useState(props.match.params.userId)

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
  }, [])

  return (
    <div className='container'>
      <div className='row justify-content-md-center'>
        <Image className='cover-pic' src={coverImg} />
        <div className='profile-pic'>
          <Avatar src={profileImg} size={140} className='avatar-pic'></Avatar>
          {userInformation.fname && userInformation.lname && <h3> {userInformation.fname + " " + userInformation.lname} </h3>}
          {userInformation.user_profession && <p> {userInformation.user_profession} </p>}

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
