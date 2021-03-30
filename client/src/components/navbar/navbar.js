import "./navbar.css"
import React, { useState } from "react"

import { NavLink } from "react-router-dom"
import { Input, Avatar, Dropdown, Menu, Badge } from "antd"
import { BellOutlined } from "@ant-design/icons"
import ProfileDropDownMenu from "./profile-drop-down-menu"
import NotificationsDropDownMenu from "./notifications-drop-down-menu"

import { Navbar, Nav, Form } from "react-bootstrap"

const { Search } = Input

const Navigation = (props) => {
  const [notifications, setNotifications] = useState([1, 2])

  const onSearch = (value) => console.log(props)

  return (
    <>
      {/* <nav className='navbar navbar-expand-lg navbar-main-bg'>
        <NavLink className='navbar-brand navbar-logo' to='/' exact>
          {`{ Noicode }`}
        </NavLink>

        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          =
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/' exact>
                Home
              </NavLink>
            </li>

            <li className='nav-item'>
              <NavLink className='nav-link' to='/about' exact>
                About
              </NavLink>
            </li>
          </ul>
          <form className='d-flex'>
            <Search className='nav-search' placeholder='Search...' allowClear onSearch={onSearch} size='medium' />
          </form>
          <form className='d-flex'>
            <Dropdown overlay={NotificationsDropDownMenu(notifications)} className='dropdown'>
              <Badge count={notifications.length}>
                <BellOutlined className='alert-icon' style={{ fontSize: "24px" }} />
              </Badge>
            </Dropdown>
          </form>

          <form className='d-flex'>
            <Dropdown overlay={ProfileDropDownMenu(props)} className='dropdown'>
              <Avatar>M</Avatar>
            </Dropdown>
          </form>
        </div>
      </nav> */}

      <Navbar collapseOnSelect expand='lg' variant='dark' className='navbar-main-bg'>
        <Navbar.Brand className='navbar-brand navbar-logo'>{"{ Noicode }"}</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' style={{ marginRight: "40px" }} />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link className='nav-item' href='/home'>
              Home
            </Nav.Link>
            <Nav.Link className='nav-item' href='/about'>
              About
            </Nav.Link>
          </Nav>
          <Nav className='justify-content-end' style={{ width: "100%" }}>
            <Nav.Item className='d-flex'>
              <Search className='nav-search' placeholder='Search...' allowClear onSearch={onSearch} size='medium' />
            </Nav.Item>
            <Nav.Item className='d-flex'>
              <Dropdown overlay={NotificationsDropDownMenu(notifications)} className='nav-info'>
                <Badge count={notifications.length}>
                  <BellOutlined className='alert-icon' style={{ fontSize: "24px", paddingTop: "5px" }} />
                </Badge>
              </Dropdown>
            </Nav.Item>
            <Nav.Item className='d-flex'>
              <Dropdown overlay={ProfileDropDownMenu(props)} className='nav-info'>
                <Avatar>M</Avatar>
              </Dropdown>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Navigation
