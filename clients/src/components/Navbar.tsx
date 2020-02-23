import React, { useState } from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <h3>BUS-CONNECT</h3>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" id="nav">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/signup" id="nav">
              SIGNUP
            </Link>
          </li>
          <li>
            <Link to="/signin" id="nav">
              LOGIN
            </Link>
          </li>
          <li>
            <a id="nav">BLOG</a>
          </li>
        </ul>
        
      <div className={!toggle? "container": "change" } onClick={() => {!toggle? setToggle(true): setToggle(false)
    !visible? setVisible(true): setVisible(false)  
    }
      }>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      </nav>
      <SidebarExampleDimmed visible={visible} />
    </>
  );
};

export default Navbar;

interface props {
  visible: boolean;
}

const SidebarExampleDimmed: React.FC<props> = ({ visible }) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
      width="thin"
      style={{width:"120px", backgroundColor:"#00bfa6"}}
    >
      <Menu.Item as={Link} to="/">
        <Icon name="home" />
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/signup">
        <Icon name="sign-in" />
        Signup
      </Menu.Item>
      <Menu.Item as={Link} to="/signin">
        <Icon name="sign-in" />
        Signin
      </Menu.Item>
      <Menu.Item as="a">
        <Icon name="blogger" />
        Blog
      </Menu.Item>
    </Sidebar>
  );
};
