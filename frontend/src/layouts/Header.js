import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import { FaUser, FaParking } from "react-icons/fa";
import { useSignOut } from './auth';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => setIsOpen(!isOpen);
  const showMobilemenu = () => document.getElementById("sidebarArea").classList.toggle("showSidebar");
  const signOut = useSignOut();

  return (
    <Navbar style={{ backgroundColor: '#000066' }} variant="dark" expand="md">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <FaParking size={30} style={{ color: '#ffff' }} />
        </NavbarBrand>
        <Button
          style={{ backgroundColor: '#000066', color: 'white', border: 'none' }}
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          style={{ backgroundColor: '#000066', color: 'white', border: 'none' }}
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link style={{ color: 'white' }} to="/starter" className="nav-link">
              Home
            </Link>
          </NavItem>
          <NavItem>
            <Link style={{ color: 'white' }} to="/about" className="nav-link">
              About
            </Link>
          </NavItem>
        </Nav>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle style={{ backgroundColor: '#000066', color: 'white', border: 'none' }}>
            <FaUser size={20} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem tag={Link} to="/usercars">My Cars</DropdownItem>
            <DropdownItem tag={Link} to="/payment">Payment</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={signOut}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Collapse>
    </Navbar>
  );
};

export default Header;
