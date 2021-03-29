import "./navbar.css"
import { NavLink } from "react-router-dom"
import { Input, Avatar, Dropdown, Menu, Switch, Popover, Divider, Badge } from "antd"
import { BellOutlined, SettingOutlined, PoweroffOutlined, UserOutlined, BgColorsOutlined } from "@ant-design/icons"

const { Search } = Input

const alert = (
  <Menu className='popover-bg-alert'>
    <Menu.Item>Clicking me will not close the menu.</Menu.Item>
    <Menu.Divider></Menu.Divider>
    <Menu.Item key='2'>Clicking me will not close the menu also.</Menu.Item>
    <Menu.Divider></Menu.Divider>
    <Menu.Item key='3'>Clicking me will close the menu.</Menu.Item>
  </Menu>
)

const profile = (
  <Menu className='popover-bg-profile'>
    {/* <Menu.Item icon={<BgColorsOutlined style={{ fontSize: "20px" }} />} className='item'>
      {" "}
      Mode
    </Menu.Item>
    <Menu.Divider></Menu.Divider> */}
    <Menu.Item icon={<UserOutlined style={{ fontSize: "20px" }} />} className='item'>
      {" "}
      Profile
    </Menu.Item>
    <Menu.Divider></Menu.Divider>
    <Menu.Item icon={<SettingOutlined style={{ fontSize: "20px" }} />} className='item'>
      <NavLink to='/setting' exact>
        {" "}
        Settings
      </NavLink>
    </Menu.Item>
    <Menu.Divider></Menu.Divider>
    <Menu.Item icon={<PoweroffOutlined style={{ fontSize: "20px" }} />} className='item'>
      <NavLink to='/auth' exact>
        {" "}
        Login
      </NavLink>
    </Menu.Item>
  </Menu>
)

const content = (
  <div>
    <a>Content</a> <br /> <br />
    <a>Content</a>
  </div>
)

const Navbar = () => {
  const onSearch = (value) => console.log(value)

  return (
    <nav className='navbar navbar-expand-lg navbar-main-bg'>
      <NavLink className='navbar-brand navbar-logo' to='/' exact>
        {`{ Noicode }`}
      </NavLink>

      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        sdf
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
          <li className='nav-item'>{/* <Search className='nav-search' placeholder='Search...' allowClear onSearch={onSearch} size='medium' style={{ paddingTop: "6px", paddingLeft: "60px" }} /> */}</li>
        </ul>
        <form className='d-flex'>
          <Search className='nav-search' placeholder='Search...' allowClear onSearch={onSearch} size='medium' />
        </form>
        <form className='d-flex'>
          <Dropdown overlay={alert} className='dropdown'>
            <Badge count={5}>
              <BellOutlined className='alert-icon' style={{ fontSize: "24px", paddingTop: "4px" }} />
            </Badge>
          </Dropdown>
        </form>

        <form className='d-flex'>
          <Dropdown overlay={profile} className='dropdown'>
            <Avatar>M</Avatar>
          </Dropdown>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
