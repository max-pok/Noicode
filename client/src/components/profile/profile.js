import React, { useState, useEffect } from "react"
import { Avatar, Image } from "antd"
import jwt from "jsonwebtoken"
import Posts from "./posts/posts"
import ProfileInfo from "./profile-info/profile-info"
import "./profile.css"
require("dotenv").config()

const Profile = ({ token }) => {
  const [coverImg, setCoverImg] = useState("https://blog.creatopy.com/wp-content/uploads/2018/10/Twitch-Social-Media-Image-Size.jpg")
  const [profileImg, setProfileImg] = useState("https://max-pok.web.app/assets/images/hero.jpeg")
  const [userName, setUserName] = useState("")
  const [userProfession, setUserProfession] = useState("")

  useEffect(() => {
    // init user information.
    let decoded = jwt.decode(token, process.env.TOKEN_SECRET)
    if (decoded) {
      let user = decoded.user

      setUserName(user.fname + " " + user.lname)
      setUserProfession(user.profession || "")

      // TODO: get posts and additional user information.
    }
  }, [])

  return (
    <div className='container'>
      <div className='row justify-content-md-center'>
        <Image className='cover-pic' src={coverImg} />
        <div className='profile-pic'>
          <Avatar src={profileImg} size={140} className='avatar-pic'></Avatar>
          <h3> {userName} </h3>
          <p> {userProfession} </p>

          <div className='row text-start'>
            <div className='col col-lg-3'>
              <ProfileInfo />
            </div>
            <div className='col'>
              <Posts />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
