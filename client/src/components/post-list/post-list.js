import './post-list.css';
import { Avatar, Image, Typography, Divider } from 'antd';
import { CommentOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import Gallery from 'react-photo-gallery';
import axios from 'axios';
import Gravatar from 'gravatar';
const { Text } = Typography;

export const photos = [
  {
    src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
    width: 1,
    height: 1,
  },
  {
    src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/XiDA78wAZVw/600x799',
    width: 3,
    height: 4,
  },
  {
    src: 'https://source.unsplash.com/x8xJpClTvR0/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/u9cG4cuJ6bU/4927x1000',
    width: 4927,
    height: 1000,
  },
  {
    src: 'https://source.unsplash.com/qGQNmBE7mYw/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/NuO6iTBkHxE/800x599',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/pF1ug8ysTtY/600x400',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/A-fubu9QJxE/800x533',
    width: 4,
    height: 3,
  },
  {
    src: 'https://source.unsplash.com/5P91SF0zNsI/740x494',
    width: 4,
    height: 3,
  },
];

const Posts = (props) => {
  const userPostUrl = 'http://localhost:8080/api/posts/';
  const userNameUrl = 'http://localhost:8080/api/users/name/';
  const [posts, setPosts] = useState([]);
  console.log(props.posts, props.clicked, props.setClicked);

  useEffect(() => {
    if (!props.clicked) {
      axios.get(userPostUrl).then((response) => {
        setPosts(response.data);
      });
    } else {
      handler();
    }
  }, [props.clicked]);

  const handler = () => {
    setPosts(props.posts);
    props.setClicked(!props.clicked);
  };

  const like = (post) => {
    post.liked = !post.liked;
    if (post.liked) {
      // add userId to noice_ids array
      post.noice_ids.push(userId);
    } else {
      // remove userId to noice_ids array
      const index = post.noice_ids.indexOf(userId);
      if (index > -1) {
        post.noice_ids.splice(index, 1);
      }
    }
    // update post array
    setPosts(posts.map((p) => (p._id == post._id ? post : p)));

    // update database
    axios
      .post(userPostUrl + 'update', post)
      .then((response) => {
        // ..
      })
      .catch((err) => {
        post.liked = !post.liked;
        if (post.liked) {
          // add userId to noice_ids array
          post.noice_ids.push(userId);
        } else {
          // remove userId to noice_ids array
          const index = post.noice_ids.indexOf(userId);
          if (index > -1) {
            post.noice_ids.splice(index, 1);
          }
        }
        setPosts(posts.map((p) => (p._id == post._id ? post : p)));
      });
  };

  const getPostsFiles = (fileIdArray) => {
    let photos = [];
    fileIdArray.map((id, index) => {
      if (id.length > 0) {
        photos.push(
          {
            src: 'http://localhost:8081/api/posts/' + id,
            srcSet: 'http://localhost:8081/api/posts/' + id,
            width: 1,
            height: 1,
          },
          {
            src: 'https://stackify.com/wp-content/uploads/2018/09/Java-Debugging-Tips-1280x720.jpg',
            srcSet: 'https://stackify.com/wp-content/uploads/2018/09/Java-Debugging-Tips-1280x720.jpg 500w',
            width: 1,
            height: 1,
          }
        );
      }
    });
    return photos;
  };

  return posts.map((post, index) => {
    return (
      <div key={index}>
        <div className="card">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <Avatar size={40} src={'http://localhost:8081/api/users/profile-img/' + post.user_id} />

                <div className="col-9 text-start">
                  <a className="font-weight-bold" href={'/users/' + post.user_id}>
                    {post.user_name || 'NO NAME YET'}
                  </a>
                  <br />
                  <p className="card-text">
                    <small className="text-muted">{post.date}</small>
                  </p>
                </div>
                {/* <div className='col text-end'>save icon</div> */}
              </div>
              <br />
              <br />
              <div className="row post-content text-start">{post.content}</div>
              <div className="text-start">
                {post.tags.map((tag) => {
                  return (
                    <a key={tag} href={'https://google.com/' + tag}>
                      #{tag}{' '}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          {/* {post.img[0] && post.img[0].length > 0 && <Image src={'http://localhost:8081/api/posts/' + post.img[0]} />}
          {post.img[0] && post.img[0].length > 0 ? <Gallery photos={getPostsFiles(post.img)} setComponentWidth={false} /> : <Divider className="post-divider" plain></Divider>} */}
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-auto">
                <div className="circle-comment">
                  {/* <p className='a-text'>c</p> */}
                  <CommentOutlined className="a-text" />
                </div>
              </div>
              <div className="col-auto">
                <div className="circle-like">
                  <HeartOutlined className="a-text" />
                </div>
              </div>
            </div>

            <div className="row justify-content-end">
              <div className="col-auto me-auto">
                <Avatar.Group maxCount={5} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                  {post.noice_ids.map((id) => {
                    return <Avatar key={id} src={'http://localhost:8081/api/users/profile-img/' + id} />;
                  })}
                </Avatar.Group>
                {post.noice_ids.length != 0 && (
                  <>
                    {post.noice_ids.map((id, index) => {
                      if (index != post.noice_ids.length - 1) {
                        return (
                          <React.Fragment key={id}>
                            <a> Name </a>
                            <small className="text-muted">and</small>
                          </React.Fragment>
                        );
                      } else {
                        return <a key={id}> Name </a>;
                      }
                    })}
                    <small className="text-muted">Liked this</small>
                  </>
                )}
              </div>
              <div className="col-auto icons" style={{ paddingTop: '10px' }}>
                <Text keyboard>{post.noice_ids.length}</Text>
                <CommentOutlined />
              </div>
              <div className="col-auto icons" style={{ paddingTop: '10px' }}>
                <Text keyboard>{post.comment_ids.length}</Text>
                <HeartOutlined />
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  });
};

export default Posts;
