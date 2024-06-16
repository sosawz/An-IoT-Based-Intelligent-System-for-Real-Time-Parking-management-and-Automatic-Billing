import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "./UserCars.css";

const UserCars = () => {
  const [cars, setCars] = useState([]);
  const [licensePlates, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCarId, setCurrentCarId] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8081/cars", {
        headers: { "x-access-token": token },
      });
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCar = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:8081/addcar",
        { licensePlates, brand, color },
        {
          headers: { "x-access-token": token },
        }
      );
      fetchCars();
      handleCloseAddModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleShowEditModal = (car) => {
    setLicensePlate(car.LicensePlate);
    setBrand(car.Brand);
    setColor(car.Color);
    setCurrentCarId(car.CarID);
    setShowEditModal(true);
  };

  const handleUpdateCar = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8081/cars/${currentCarId}`,
        { licensePlates, brand, color },
        {
          headers: { "x-access-token": token },
        }
      );
      fetchCars();
      handleCloseEditModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteCar = async (carId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8081/cars/${carId}`, {
        headers: { "x-access-token": token },
      });
      fetchCars();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setLicensePlate("");
    setBrand("");
    setColor("");
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setLicensePlate("");
    setBrand("");
    setColor("");
  };

  return (
    <section>
      <div className="container">
        <div className="card p-4">
          <div className="row justify-content-center pt-3">
            <div className="col-md-9 heading-section text-center fadeInUp ftco-animated">
              <h2
                className="mb-2"
                style={{ fontSize: "35px", fontWeight: "bold" }}
              >
                My Car List
              </h2>
            </div>
          </div>
          <div className="table-responsive p-4">
            <table className="table table-striped">
              <thead>
                <tr
                  className="thai"
                  style={{
                    fontSize: "18px",
                    backgroundColor: "#343a40",
                    color: "#ffffff",
                  }}
                >
                  <th
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "none",
                    }}
                  >
                    Car ID
                  </th>
                  <th style={{ verticalAlign: "middle", borderBottom: "none" }}>
                    License Plate
                  </th>
                  <th style={{ verticalAlign: "middle", borderBottom: "none" }}>
                    Brand
                  </th>
                  <th style={{ verticalAlign: "middle", borderBottom: "none" }}>
                    Color
                  </th>
                  <th
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      borderBottom: "none",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr
                    key={car.CarID}
                    style={{ textAlign: "left", verticalAlign: "middle" }}
                  >
                    <th
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {car.CarID}
                    </th>
                    <td style={{ verticalAlign: "middle" }}>
                      {car.LicensePlate}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{car.Brand}</td>
                    <td style={{ verticalAlign: "middle" }}>{car.Color}</td>
                    <td
                      className="text-center"
                      style={{ verticalAlign: "middle" }}
                    >
                      <button
                        className="btn btn-info btn-sm m-1"
                        onClick={() => handleShowEditModal(car)}
                      >
                        <span className="bi bi-pencil"></span> Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm m-1"
                        onClick={() => handleDeleteCar(car.CarID)}
                      >
                        <span className="bi bi-trash"></span> Del
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-center mt-4">
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                Add Car Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Car Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLicensePlate">
              <Form.Label>License Plate</Form.Label>
              <Form.Control
                type="text"
                value={licensePlates}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="Enter license plate"
              />
            </Form.Group>
            <Form.Group controlId="formBrand">
              <Form.Label className="mt-3">Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand"
              />
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label className="mt-3">Color</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter color"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCar}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Car Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLicensePlate">
              <Form.Label>License Plate</Form.Label>
              <Form.Control
                type="text"
                value={licensePlates}
                onChange={(e) => setLicensePlate(e.target.value)}
                placeholder="Enter license plate"
              />
            </Form.Group>
            <Form.Group controlId="formBrand">
              <Form.Label className="mt-3">Brand</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Enter brand"
              />
            </Form.Group>
            <Form.Group controlId="formColor">
              <Form.Label className="mt-3">Color</Form.Label>
              <Form.Control
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Enter color"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateCar}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default UserCars;
