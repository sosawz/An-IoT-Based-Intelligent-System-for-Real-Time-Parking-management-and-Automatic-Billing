import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container } from "reactstrap";

const FullLayout = () => {
  return (
    <main>
      <div className="pageWrapper d-lg-flex">
        {/********Sidebar**********/}
        <aside className="sidebarArea shadow" id="sidebarArea">
          <Sidebar />
        </aside>
        {/********Content Area**********/}

        <div className="contentArea">
          {/********header**********/}
          <Header />
          {/********Middle Content**********/}
          <Container className="p-4 wrapper" fluid>
            {/* <h1>Sensor Data</h1>
            <p>Sensor 1: {data ? data.v1 : 'Loading...'}</p>
            <p>Sensor 2: {data ? data.v2 : 'Loading...'}</p> */}
            <Outlet />
          </Container>
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
