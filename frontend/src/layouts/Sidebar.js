import React from 'react';
import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { FaParking } from "react-icons/fa";
import { useSignOut } from './auth';

const navigation = [
  {
    title: "Home page",
    href: "/starter",
    icon: "bi bi-house-door", 
  },
  {
    title: "My cars",
    href: "/usercars",
    icon: "bi bi-car-front",
  },
  {
    title: "Payment",
    href: "/payment",
    icon: "bi bi-cash-stack", 
  },
  {
    title: "Logout",
    href: "/login",
    icon: "bi bi-door-open", 
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();
  const signOut = useSignOut();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <FaParking size={50} className="ms-2" style={{ color: "#000066" }} />{" "}
        <span
          className="ms-3"
          style={{ color: "#000066", fontWeight: "bold", fontSize: "18px" }}
        >
          Smart Parking
        </span>{" "}
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-1 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {navi.title === "Logout" ? (
                <span
                  onClick={() => signOut()}
                  className="nav-link py-3"
                  style={{ cursor: "pointer", color: "#000000" }}
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </span>
              ) : (
                <Link
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                  style={{ color: "#003399" }}
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              )}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
