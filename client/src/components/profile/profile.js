import React, { useState, useEffect } from "react"
import { Avatar, Image } from "antd"
import Posts from "./posts/posts"
import ProfileInfo from "./profile-info/profile-info"
import axios from "axios"
import "./profile.css"

const Profile = (props) => {
  const userInfoUrl = "http://localhost:8080/api/users/" + props.match.params.userId
  const userPostsUrl = "http://localhost:8080/api/posts/" + props.match.params.userId

  const coverImg = "http://localhost:8081/api/users/cover-img/" + props.match.params.userId
  const profileImg = "http://localhost:8081/api/users/profile-img/" + props.match.params.userId

  const [userInformation, setUserInformation] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const userId = props.match.params.userId

  useEffect(() => {
    // get user posts.
    axios
      .get(userPostsUrl)
      .then((response) => {
        const newPosts = response.data.posts.map((post) => {
          return { ...post, liked: post.noice_ids.indexOf(userId) >= 0 ? true : false }
        })
        setUserPosts(newPosts)
      })
      .catch((err) => {
        console.log(err)
      })
    // get user information.
    axios
      .get(userInfoUrl)
      .then((response) => {
        setUserInformation(response.data.user)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.match.params.userId])

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
              <Posts userPosts={userPosts} userId={userId} userName={userInformation.fname + " " + userInformation.lname} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
