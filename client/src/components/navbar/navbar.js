import "./navbar.css"
import { NavLink } from "react-router-dom"
import { Input, Typography, Avatar } from "antd"
import { BellOutlined, AntDesignOutlined } from "@ant-design/icons"

const { Search } = Input
const { Title } = Typography

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
          <li className='nav-item'>
            <Search placeholder='Search...' allowClear onSearch={onSearch} size='large' style={{ paddingTop: "2px", paddingLeft: "60px" }} />
          </li>
        </ul>
        <form className='d-flex'>
          <BellOutlined className='alert-icon' style={{ fontSize: "22px" }} />
        </form>
        <form className='d-flex'>
          <Avatar>U</Avatar>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
