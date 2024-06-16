import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./UserCars.css";
import "./Ticket.css";
import { FaParking } from "react-icons/fa";

const Payment = () => {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [totalCharge, setTotalCharge] = useState(0);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:8081/detectionrecords", {
        headers: { "x-access-token": token },
      });
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateCharge = (entryTime, exitTime) => {
    const entry = new Date(entryTime);
    const exit = new Date(exitTime);
    const duration = (exit - entry) / (1000 * 60 * 60); // duration in hours
    const rate = 20; // Example rate per hour
    return duration * rate;
  };

  const handleShowModal = (record) => {
    setCurrentRecord(record);
    const charge = calculateCharge(record.DetectionTime, record.ExitTime);
    setTotalCharge(charge);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentRecord(null);
    setTotalCharge(0);
  };

  const handlePayment = async () => {
    try {
      const input = document.getElementById("ticket");
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("portrait", "mm", "a5");
        const imgWidth = 148;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`parking_ticket_${currentRecord.LicensePlate}.pdf`);
      });

      alert("Payment Successful!");
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <div className="container">
        <div className="card p-4">
          <div className="row justify-content-center pt-3">
            <div className="col-md-9 heading-section text-center fadeInUp ftco-animated">
              <h2 className="mb-2" style={{ fontSize: "35px", fontWeight: "bold" }}>
                Payment Page
              </h2>
            </div>
          </div>
          <div className="table-responsive p-4">
            <Table striped>
              <thead>
                <tr className="thai" style={{ fontSize: "18px", backgroundColor: "#343a40", color: "#ffffff" }}>
                  <th style={{ textAlign: "center", verticalAlign: "middle" }}>Record ID</th>
                  <th style={{ verticalAlign: "middle" }}>License Plate</th>
                  <th style={{ verticalAlign: "middle" }}>Entry Time</th>
                  <th style={{ verticalAlign: "middle" }}>Exit Time</th>
                  <th style={{ textAlign: "center", verticalAlign: "middle" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.RecordID}>
                    <td style={{ textAlign: "center", verticalAlign: "middle" }}>{record.RecordID}</td>
                    <td style={{ verticalAlign: "middle" }}>{record.LicensePlate}</td>
                    <td style={{ verticalAlign: "middle" }}>{new Date(record.DetectionTime).toLocaleString()}</td>
                    <td style={{ verticalAlign: "middle" }}>{new Date(record.ExitTime).toLocaleString()}</td>
                    <td className="text-center" style={{ verticalAlign: "middle" }}>
                      <button className="btn btn-success btn-sm m-1" onClick={() => handleShowModal(record)}>
                        <span className="bi bi-credit-card"></span> Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {currentRecord && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Body>
            <div id="ticket" className="parking-ticket mt-3 mb-2">
              <div className="header">
                <div className="company-name">Smart Parking</div>
                <div className="address">Walailak University</div>
              </div>
              <div className="parking-icon">
                <FaParking size={80} style={{ color: "#B0C4DE" }} />
              </div>
              <div className="paid-parking">------------------------------------</div>
              <div className="paid-parking">PAID PARKING</div>
              <div className="details">
              <div className="license-plate">License Plate: {currentRecord.LicensePlate}</div>
                <div className="date">DATE: {new Date(currentRecord.DetectionTime).toLocaleDateString()}</div>
                <div className="from">FROM: {new Date(currentRecord.DetectionTime).toLocaleTimeString()}</div>
                <div className="to">TO: {new Date(currentRecord.ExitTime).toLocaleTimeString()}</div>
                <div className="paid">Paid: {totalCharge.toFixed(2)}฿</div>
              </div>
              <div className="thank-you">THANK YOU AND LUCKY ROAD!</div>
              <div className="barcode"></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="success" onClick={handlePayment}>
              Pay Now
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </section>
  );
};

export default Payment;
