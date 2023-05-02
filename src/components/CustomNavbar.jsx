import { useContext, useEffect, useState } from 'react';
import { Navigate, NavLink as ReactLink, useNavigate } from 'react-router-dom';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import userContext from '../context/userContext';

const CustomNavbar=()=>{

    const userContextData = useContext(userContext);

    let navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const [login, setLogin] = useState(false);

    const [user, setUser] = useState(undefined);

    useEffect(()=>{
      setLogin(isLoggedIn());
      setUser(getCurrentUserDetail());
    }, [login]);

    const logout=()=>{
      doLogout(()=>{
        // logged out
        setLogin(false);
        userContextData.setUser({
          data:user,
          login:false
        });
        navigate("/");
      });
    };

    return(
      <div>
      <Navbar 
        color="dark"
        dark
        expand="md"
        fixed=""     
        className='px-4' 
      >
        <NavbarBrand tag={ ReactLink } to="/">
          Pen It
        </NavbarBrand>

        <NavbarToggler onClick={()=>setIsOpen(!isOpen)}/>

        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={ ReactLink } to="/">New Feed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ ReactLink } to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ ReactLink } to="/services">Services</NavLink>
            </NavItem>
           
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag={ReactLink} to="/contact">Contact Us</DropdownItem>
                <DropdownItem>Forum</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Developer</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          <Nav navbar>
            {
              login && (
                <>
                <NavItem>
                  <NavLink tag={ReactLink} to={'/user/profile-info/'+user.id}>Profile</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink tag={ReactLink} to="/user/dashboard">{user.email}</NavLink>
                </NavItem>
                
                <NavItem>
                  <NavLink onClick={logout}>Logout</NavLink>
                </NavItem>
                </>
              )
            }
            {
              !login && (
                <>
                  <NavItem>
                    <NavLink tag={ ReactLink } to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={ ReactLink } to="/signup">Signup</NavLink>
                  </NavItem>
                </>
              )
            }
          </Nav>

          {/* <NavbarText>Developer</NavbarText> */}
        </Collapse>
      </Navbar>
    </div>
    );
};

export default CustomNavbar;