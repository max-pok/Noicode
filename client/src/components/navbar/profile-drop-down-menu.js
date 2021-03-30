import { Menu } from "antd"
import { SettingOutlined, PoweroffOutlined, UserOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom"
import "./navbar.css"

const ProfileDropDownMenu = ({ token, setToken }) => (
  <Menu className='popover-bg-profile'>
    <h6 className='menu-header'>Profile</h6>
    <Menu.Divider></Menu.Divider>
    {token && (
      <Menu.Item className='item'>
        <NavLink to='users/user-id' exact>
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
          setToken(null)
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
export default ProfileDropDownMenu
