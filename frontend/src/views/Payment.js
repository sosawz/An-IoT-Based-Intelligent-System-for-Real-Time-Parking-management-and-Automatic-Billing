import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const Payment = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [closestMatch, setClosestMatch] = useState("");
    const [showReceipt, setShowReceipt] = useState(false);
    const [entryTime, setEntryTime] = useState("");
    const [exitTime, setExitTime] = useState("");
    const [serviceCharge, setServiceCharge] = useState(0);
    const [plateNumber, setPlateNumber] = useState("");
    const [customerName, setCustomerName] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get("http://localhost:8081/admin/plates")
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        let bestMatch = "";
        let bestMatchLength = 0;
        let foundMatch = false;
        data.forEach(item => {
            const similarity = calculateSimilarity(query.toLowerCase(), item.plate.toLowerCase());
            if (similarity > bestMatchLength) {
                bestMatch = item.plate;
                bestMatchLength = similarity;
                foundMatch = true;
            }
        });
        if (!foundMatch) {
            setClosestMatch("");
            setPlateNumber("");
        } else {
            setClosestMatch(bestMatch);
            const foundPlate = data.find(item => item.plate.toLowerCase() === bestMatch.toLowerCase());
            if (foundPlate) {
                setPlateNumber(foundPlate.plate);
                setCustomerName(foundPlate.customerName || "");
            }
        }
    }

    const calculateSimilarity = (search, plate) => {
        let matchCount = 0;
        for (let i = 0; i < search.length; i++) {
            if (plate.includes(search[i])) {
                matchCount++;
            }
        }
        return matchCount;
    }

    const filteredData = closestMatch ? data.filter(item =>
        item.plate.toLowerCase().includes(closestMatch.toLowerCase())
    ) : [];

    const calculateServiceCharge = (entryTime) => {
        // Assume hourly rate is 20
        const hourlyRate = 20;
        const entryTimestamp = new Date(entryTime).getTime();
        const currentTimestamp = new Date().getTime();
        const timeDiff = currentTimestamp - entryTimestamp;
        const hours = Math.ceil(timeDiff / (1000 * 60 * 60)); // Convert milliseconds to hours
        const serviceCharge = hours * hourlyRate;
        return serviceCharge;
    }

    const calculateExitTime = () => {
        const exitTimestamp = new Date().toLocaleString();
        setExitTime(exitTimestamp);
    }

    const handlePay = (entryTime) => {
        const serviceCharge = calculateServiceCharge(entryTime);
        calculateExitTime();
        setEntryTime(entryTime);
        setServiceCharge(serviceCharge);
        setShowReceipt(true);
    }

    const handleDownload = () => {
        // Logic for downloading the receipt
    }

    const handleShare = () => {
        // Logic for sharing the receipt
    }

    return (
        <section>
            <div className="container">
                <div className="row justify-content-center pb-4">
                    <div className="col-md-9 heading-section text-center fadeInUp ftco-animated">
                        <h2 className="mb-4">Search Plate For Payment</h2>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by plate number..."
                        className="form-control me-2"
                        style={{ width: '300px' }}
                    />
                    <button onClick={() => handleSearch(searchQuery)} className="btn btn-primary">
                        Search
                    </button>
                </div>
                {closestMatch && <p className="text-center mb-4">Closest match: {closestMatch}</p>}
                <div className="table-responsive">
                    <table className="table" style={{ border: '1px solid #ccc' }}>
                        <thead>
                            <tr className='thai' style={{ background: '#F15D30', fontSize: '18px' }}>
                                <th scope="col" sstyle={{ textAlign: 'center' }}>ID</th>
                                <th scope="col">Plate Number</th>
                                <th scope="col">Picture</th>
                                <th scope="col">Time</th>
                                <th scope="col" style={{ textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map(item => (
                                <tr key={item.id}>
                                    <th>{item.id}</th>
                                    <td>{item.plate}</td>
                                    <td>
                                        <img src={`data:image/jpeg;base64,${item.image}`} alt="License Plate" style={{ maxWidth: '100px' }} />
                                    </td>
                                    <td>{format(new Date(item.timestamp), 'M/d/yyyy, hh:mm:ss a')}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <button
                                            type="button"
                                            className="btn btn-link btn-rounded btn-sm fw-bold"
                                            data-mdb-ripple-color="dark"
                                            onClick={() => handlePay(item.timestamp)}
                                        >
                                            Pay
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredData.length === 0 && (
                    <div className="text-center mt-4">
                        <p>No matching plates found.</p>
                    </div>
                )}
                {showReceipt && (
                    <div className="card">
                        <div className="card-body mx-4">
                            <div className="container">
                                <p className="my-5 text-center" style={{ fontSize: 30 }}>Parking Bill</p>
                                <div className="row">
                                    <ul className="list-unstyled">
                                        <li className="text-black">Parking Payment</li>
                                        <li className="text-muted mt-1"><span className="text-black">Entry Time:</span> {format(new Date(entryTime), 'M/d/yyyy, hh:mm:ss a')}</li>
                                        <li className="text-muted mt-1"><span className="text-black">Exit Time:</span> {exitTime}</li>
                                        {plateNumber && <li className="text-muted mt-1"><span className="text-black">Plate Number:</span> {plateNumber}</li>}
                                        {customerName && <li className="text-muted mt-1"><span className="text-black">Customer Name:</span> {customerName}</li>}
                                    </ul>
                                    <hr />
                                    <div className="col-xl-10">
                                        <p>Parking Fee</p>
                                    </div>
                                    <div className="col-xl-2">
                                        <p className="float-end">{serviceCharge}฿</p>
                                    </div>
                                    <hr />
                                </div>
                                <div className="row text-black">
                                    <div className="col-xl-12">
                                        <p className="float-end fw-bold">Total: {serviceCharge}฿</p>
                                    </div>
                                    <hr style={{ border: '2px solid black' }} />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button onClick={handleDownload} className="btn btn-primary me-3">Download</button>
                                <button onClick={handleShare} className="btn btn-success">Share</button>
                            </div>
                        </div>
                    </div>
                )}
    
            </div>
        </section>
    );
    
}

export default Payment;
