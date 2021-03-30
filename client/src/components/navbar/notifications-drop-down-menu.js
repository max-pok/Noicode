import { Menu, Avatar } from "antd"
import { NavLink } from "react-router-dom"
import React from "react"

const NotificationsDropDownMenu = (notifications) => (
  <Menu className='popover-bg-alert'>
    <h6 className='menu-header'>Notifications</h6>
    {notifications.map((value, i) => {
      return (
        <React.Fragment key={i}>
          <Menu.Divider></Menu.Divider>
          <Menu.Item className='item'>
            <div>
              <Avatar>D</Avatar> {"  "}
              <NavLink to='/users/user-id' className='notification-by-who'>
                David Kim
              </NavLink>{" "}
              commented on your{" "}
              <NavLink to='/posts/post-id' className='notification-by-who'>
                post
              </NavLink>
              .<br></br>
              <div className='notification-date'>{new Date().toUTCString()}</div>
            </div>
          </Menu.Item>
        </React.Fragment>
      )
    })}
    <Menu.Divider></Menu.Divider>
    <Menu.Item className='last-item'>
      <NavLink to='/posts/post-id' className='notification-by-who'>
        Show More
      </NavLink>
    </Menu.Item>
  </Menu>
)

export default NotificationsDropDownMenu
