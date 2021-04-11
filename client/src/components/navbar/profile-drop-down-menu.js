import { useEffect, useState } from "react"
import { Menu } from "antd"
import { SettingOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom"
import "./navbar.css"

const ProfileDropDownMenu = ({ token, setToken, setUserId }) => {
  const [userName, setUserName] = useState(token)

  useEffect(() => {
    // TODO: get user name.
  }, [userName])
  return (
    <Menu className='popover-bg-profile'>
      <h6 className='menu-header'>Profile</h6>
      <Menu.Divider></Menu.Divider>
      {token && (
        <Menu.Item className='item'>
          <NavLink to={{ pathname: `/users/${token}` }} exact>
            <UserOutlined style={{ fontSize: "20px" }} />
            Profile
          </NavLink>
        </Menu.Item>
      )}
      {token && <Menu.Divider></Menu.Divider>}
      {token && (
        <Menu.Item className='item'>
          <NavLink to='users/user-id/settings' exact>
            <SettingOutlined style={{ fontSize: "20px" }} />
            Settings
          </NavLink>
        </Menu.Item>
      )}
      {token && <Menu.Divider></Menu.Divider>}
      {token && (
        <Menu.Item
          className='item'
          onClick={() => {
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            setToken(null)
            setUserId(null)
          }}
        >
          <PoweroffOutlined style={{ fontSize: "20px" }} /> Logout
        </Menu.Item>
      )}
      {!token && (
        <Menu.Item className='item'>
          <NavLink to='/auth' exact>
            <PoweroffOutlined style={{ fontSize: "20px" }} /> Login
          </NavLink>
        </Menu.Item>
      )}
    </Menu>
  )
}
export default ProfileDropDownMenu
