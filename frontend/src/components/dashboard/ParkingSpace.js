import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";

const ParkingLot = () => {
  const [parkingSpaceStatus, setParkingSpaceStatus] = useState({});

  useEffect(() => {
    const fetchParkingSpaceStatus = async () => {
      try {
        const response = await fetch(
          "https://blynk.cloud/external/api/getAll?token=IsJnxkBYp2SPY5xwQvZaGfKxBfgIm6xL"
        );
        const data = await response.json();
        setParkingSpaceStatus(data);
      } catch (error) {
        console.error("Error fetching parking space status:", error);
      }
    };

    fetchParkingSpaceStatus();
  }, []);

  const countVacantSpaces = () => {
    let vacantSpaces = 0;
    Object.values(parkingSpaceStatus).forEach((status) => {
      if (status === "Vacant") {
        vacantSpaces++;
      }
    });
    return vacantSpaces;
  };

  const renderParkingSlots = () => {
    return Object.keys(parkingSpaceStatus).map((spaceKey) => (
      <Col key={spaceKey}>
        <div className="d-flex flex-column align-items-center justify-content-center text-center">
          <span
            style={{
              fontSize: "19px",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Parking Space {parseInt(spaceKey.substring(1)) + 1}
          </span>
          <span
            style={{
              fontSize: "18px",
              marginBottom: "8px",
              color:
                parkingSpaceStatus[spaceKey] === "Occupied"
                  ? "#FF0000"
                  : "#00C853",
            }}
          >
            {parkingSpaceStatus[spaceKey]}
          </span>
          <Card
            style={{
              width: "150px",
              height: "100px",
              backgroundColor: "#F5F5F5",
              border: "2px solid #E0E0E0",
              borderRadius: "10px",
            }}
          >
            <CardBody className="d-flex flex-column align-items-center justify-content-center">
              {parkingSpaceStatus[spaceKey] === "Occupied" ? (
                <FontAwesomeIcon
                  icon={faCar}
                  style={{ fontSize: "48px", color: "#000066" }}
                />
              ) : null}
              {/* Additional content for the card body */}
            </CardBody>
          </Card>
        </div>
      </Col>
    ));
  };

  return (
    <Container className="">
      <div className="card p-4">
        <h2
          className="text-center mb-4 mt-4"
          style={{ fontSize: "35px", fontWeight: "bold" }}
        >
          Parking Space
        </h2>
        <h2
          className="text-center mb-5"
          style={{ fontSize: "24px", color: "#00C853" }}
        >
          Vacant Spaces : {countVacantSpaces()}
        </h2>
        <Row xs={1} md={3} lg={5} className="g-4">
          {renderParkingSlots()}
        </Row>
      </div>
    </Container>
  );
};

export default ParkingLot;
