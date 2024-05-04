import { Col, Row } from "reactstrap";
import ParkingSpace from "../components/dashboard/ParkingSpace";

const Starter = () => {
  return (
    <div>
      <Row>
        <Col xxl="12">
          <ParkingSpace />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
