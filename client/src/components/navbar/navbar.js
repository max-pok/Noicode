import './navbar.css';
import React, { useState } from 'react';
import { Input, Avatar, Dropdown, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import ProfileDropDownMenu from './profile-drop-down-menu';
import NotificationsDropDownMenu from './notifications-drop-down-menu';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';

const { Search } = Input;

const Navigation = (props) => {
  const [notifications, setNotifications] = useState([1, 2]);
  const userPostUrl = 'http://localhost:8080/api/posts/';

  const onSearch = (value) => {
    const search_tags = value.split(/[ ,—.]+/);
    axios.get(userPostUrl).then((response) => {
      if (!response.data) {
        console.log('no posts');
      }
      const posts = [];
      response.data.filter((post) => {
        search_tags.map((elem) => {
          if (post.tags.includes(elem)) {
            posts.push(post);
          }
        });
      });
      props.setFilteredPosts(posts);
      props.setClicked(!props.clicked);
    });
  };

  const onChange = (event) => {
    if (event.target.value == '') {
      axios.get(userPostUrl).then((response) => {
        props.setFilteredPosts(response.data);
      });
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" className="navbar-main-bg">
      <Navbar.Brand className="navbar-brand navbar-logo">{'{ Noicode }'}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ marginRight: '40px' }} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className="nav-item" href="/home">
            Home
          </Nav.Link>
          <Nav.Link className="nav-item" href="/about">
            About
          </Nav.Link>
        </Nav>
        <Nav className="justify-content-end" style={{ width: '100%' }}>
          <Nav.Item className="d-flex">
            <Search className="nav-search" placeholder="Search..." allowClear onSearch={onSearch} onChange={onChange} size="medium" />
          </Nav.Item>
          {props.token && (
            <Nav.Item className="d-flex">
              <Dropdown overlay={NotificationsDropDownMenu(notifications)} className="nav-info">
                <Badge count={notifications.length}>
                  <BellOutlined className="alert-icon" style={{ fontSize: '24px', paddingTop: '5px' }} />
                </Badge>
              </Dropdown>
            </Nav.Item>
          )}
          <Nav.Item className="d-flex">
            <Dropdown overlay={ProfileDropDownMenu(props)} className="nav-info">
              <Avatar src={'http://localhost:8081/api/users/profile-img/' + props.token}></Avatar>
            </Dropdown>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
