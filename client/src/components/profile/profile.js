import React, { useState } from "react"
import { Avatar, Image } from "antd"
import Posts from "./posts/posts"
import ProfileInfo from "./profile-info/profile-info"
import "./profile.css"

const Profile = () => {
  // const [coverImg, setCoverImg] = useState("https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/08/white-texture-cover-photo.jpg")
  const [coverImg, setCoverImg] = useState("https://blog.creatopy.com/wp-content/uploads/2018/10/Twitch-Social-Media-Image-Size.jpg")
  // const [profileImg, setProfileImg] = useState("https://www.w3schools.com/howto/img_avatar.png")
  const [profileImg, setProfileImg] = useState("https://max-pok.web.app/assets/images/hero.jpeg")
  const [userName, setUserName] = useState("Max Pokidaylo")
  const [userProfession, setUserProfession] = useState("Software Engineer")

  return (
    <div className='container'>
      <div className='row justify-content-md-center'>
        <Image className='cover-pic' src={coverImg} />
        <div className='profile-pic'>
          <Avatar src={profileImg} size={120} className='avatar-pic'></Avatar>
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
