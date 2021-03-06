import React, { useState, useEffect } from 'react';
import { Avatar, Image, Upload } from 'antd';
import Posts from './posts/posts';
import ProfileInfo from './profile-info/profile-info';
import axios from 'axios';
import defaultAvatar from '../../assets/avatar_default.svg';
import defaultCover from '../../assets/cover_default.jpeg';

import './profile.css';

const Profile = (props) => {
  const userInfoUrl = 'http://localhost:8080/api/users/' + props.match.params.userId;
  const userPostsUrl = 'http://localhost:8080/api/posts/' + props.match.params.userId;
  const uploadCoverPicture = `http://localhost:8081/api/users/update/coverPictures/${props.match.params.userId}`;
  const uploadProfilePicture = `http://localhost:8081/api/users/update/profilePictures/${props.match.params.userId}`;
  const coverImg = 'http://localhost:8081/api/users/cover-img/' + props.match.params.userId;
  const profileImg = 'http://localhost:8081/api/users/profile-img/' + props.match.params.userId;

  const [userInformation, setUserInformation] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState(props.match.params.userId);
  const [hasEditedInfo, sethasEditedInfo] = useState(false);

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
        setUserInformation(response.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [hasEditedInfo]);

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <Upload
          name="cover"
          showUploadList={false}
          accept="image/*"
          maxCount={1}
          action={uploadCoverPicture}
          headers={{ picture_type: 'cover' }}
          onChange={(info) => console.log(info.file.originFileObj)}
        >
          <Avatar className="cover-pic" alt="cover" src={coverImg} />
        </Upload>
        <div className="profile-pic">
          <Upload name="avatar" showUploadList={false} accept="image/*" maxCount={1} action={uploadProfilePicture} headers={{ picture_type: 'avatar' }}>
            <Avatar className="avatar-pic" size={140} alt="avatar" src={profileImg} />
          </Upload>
          {userInformation.fname && userInformation.lname && <h3> {userInformation.fname + ' ' + userInformation.lname} </h3>}
          {userInformation.user_profession && <p> {userInformation.user_profession} </p>}

          <div className="row text-start">
            <div className="col col-lg-3">
              <ProfileInfo userId={userId} userInformation={userInformation} sethasEditedInfo={sethasEditedInfo} />
            </div>
            <div className='col'>
              <Posts userPosts={userPosts} userId={userId} userName={userInformation.fname + " " + userInformation.lname} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
