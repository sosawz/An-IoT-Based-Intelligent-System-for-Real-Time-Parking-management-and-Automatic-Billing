import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaParking } from "react-icons/fa";

const navigation = [
  {
    title: "Home page",
    href: "/starter",
    icon: "bi bi-house-door", // Updated icon for Home page
  },
  {
    title: "My cars",
    href: "/usercars",
    icon: "bi bi-car-front",
  },
  {
    title: "Payment",
    href: "/payment",
    icon: "bi bi-cash-stack", // Updated icon for Memberships
  },
  // {
  //   title: "Admin",
  //   href: "/admin",
  //   icon: "bi bi-clipboard-data",
  // },
  {
    title: "Logout",
    href: "/login",
    icon: "bi bi-door-open", // Updated icon for Login
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <FaParking size={50} className="ms-2" style={{ color: "#000066" }} />{" "}
        {/* ตั้งค่าขนาดตามที่ต้องการ */}
        <span
          className="ms-3"
          style={{ color: "#000066", fontWeight: "bold", fontSize: "18px" }}
        >
          Smart Parking
        </span>{" "}
        {/* ปรับตำแหน่งและสไตล์ตามที่ต้องการ */}
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
                  style={{ cursor: "pointer", color: "#000000" }} // Change color to black for Logout button
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
