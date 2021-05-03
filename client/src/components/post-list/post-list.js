import "./post-list.css"
import { Avatar, Image, Typography, Divider } from "antd"
import { CommentOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import axios from "axios"

const { Text, Link } = Typography

const Posts = (props) => {
  const userPostUrl = "http://localhost:8080/api/posts/"
  const userNameUrl = "http://localhost:8080/api/users/name/"
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios.get(userPostUrl).then((response) => {
      setPosts(response.data)
    })
  }, [])

  return posts.map((post, index) => {
    return (
      <div key={index}>
        <div className='card'>
          <div className='card-body'>
            <div className='container'>
              <div className='row'>
                <Avatar size={40} src={"http://localhost:8081/api/users/profile-img/" + post.user_id} />

                <div className='col-9 text-start'>
                  <a className='font-weight-bold' href={"/users/" + post.user_id}>
                    {post.user_name || "NO NAME YET"}
                  </a>
                  <br />
                  <p className='card-text'>
                    <small className='text-muted'>{post.date}</small>
                  </p>
                </div>
                {/* <div className='col text-end'>save icon</div> */}
              </div>
              <br />
              <div className='row'>{post.content}</div>
            </div>
          </div>

          {post.img[0] && post.img[0].length > 0 && <Image src={"http://localhost:8081/api/posts/" + post._id} />}

          <div className='container'>
            <div className='row justify-content-end'>
              <div className='col-auto'>
                <div className='circle-comment'>
                  {/* <p className='a-text'>c</p> */}
                  <CommentOutlined className='a-text' />
                </div>
              </div>
              <div className='col-auto'>
                <div className='circle-like'>
                  <HeartOutlined className='a-text' />
                </div>
              </div>
            </div>

            <div className='row justify-content-end'>
              <div className='col-auto me-auto'>
                <Avatar.Group maxCount={5} maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
                  {post.noice_ids.map((id) => {
                    return <Avatar key={id} src={"http://localhost:8081/api/users/profile-img/" + id} />
                  })}
                </Avatar.Group>
                {post.noice_ids.length != 0 && (
                  <>
                    {post.noice_ids.map((id, index) => {
                      if (index != post.noice_ids.length - 1) {
                        return (
                          <React.Fragment key={id}>
                            <a> Name </a>
                            <small className='text-muted'>and</small>
                          </React.Fragment>
                        )
                      } else {
                        return <a key={id}> Name </a>
                      }
                    })}
                    <small className='text-muted'>Liked this</small>
                  </>
                )}
              </div>
              <div className='col-auto icons' style={{ paddingTop: "10px" }}>
                <Text keyboard>{post.noice_ids.length}</Text>
                <CommentOutlined />
              </div>
              <div className='col-auto icons' style={{ paddingTop: "10px" }}>
                <Text keyboard>{post.comment_ids.length}</Text>
                <HeartOutlined />
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    )
  })
}

export default Posts
