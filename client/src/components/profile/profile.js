import React from "react"
import { Avatar, Image, Divider } from "antd"
import Posts from "./posts/posts"
import ProfileInfo from "./profile-info/profile-info"
import "./profile.css"

const Profile = () => {
  return (
    <div className='container'>
      <div className='row justify-content-md-center'>
        <Image src='https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2017/08/white-texture-cover-photo.jpg' />
        <div className='profile-pic'>
          <Avatar src='https://www.w3schools.com/howto/img_avatar.png' size={120} className='avatar-pic'></Avatar>
          <h3>Max Pokidaylo</h3>
          <p> Software Engineer</p>

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
