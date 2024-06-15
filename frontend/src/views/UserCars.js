import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserCars = () => {
  const [cars, setCars] = useState([]);
  const [licensePlates, setLicensePlate] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");

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
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateCar = async (carId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:8081/cars/${carId}`,
        { licensePlates, brand, color },
        {
          headers: { "x-access-token": token },
        }
      );
      fetchCars();
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

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center pb-4">
          <div className="col-md-9 heading-section text-center fadeInUp ftco-animated">
            <h2 className="mb-4">My Car List</h2>
            <h3 className="mb-4">Add Car</h3>
          </div>
          <input
            type="text"
            value={licensePlates}
            onChange={(e) => setLicensePlate(e.target.value)}
            placeholder="License Plate"
          />
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
          />
          <button onClick={handleAddCar}>Add Car</button>
        </div>
        <div className="table-responsive">
          <table className="table" style={{ border: "1px solid #ccc" }}>
            <thead>
              <tr
                className="thai"
                style={{ background: "#F15D30", fontSize: "18px" }}
              >
                <th scope="col" sstyle={{ textAlign: "center" }}>
                  Car ID
                </th>
                <th scope="col">License Plate</th>
                <th scope="col">Brand</th>
                <th scope="col">Color</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car.CarID}>
                  <th>{car.CarID}</th>
                  <td>{car.LicensePlate}</td>
                  <td>{car.Brand}</td>
                  <td>{car.Color}</td>
                  <td>
                    <div style={{ display: 'flex',  alignItems: 'center' }}>
                      <button
                        type="button"
                        className="btn btn-link btn-rounded btn-sm fw-bold"
                        data-mdb-ripple-color="dark"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-link btn-rounded btn-sm fw-bold"
                        data-mdb-ripple-color="dark"
                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDeleteCar(car.CarID) }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserCars;
