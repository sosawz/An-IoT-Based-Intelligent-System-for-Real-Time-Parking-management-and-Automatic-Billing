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
        data.forEach(item => {
            const similarity = calculateSimilarity(query.toLowerCase(), item.plate.toLowerCase());
            if (similarity > bestMatchLength) {
                bestMatch = item.plate;
                bestMatchLength = similarity;
            }
        });
        setClosestMatch(bestMatch);
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

    return (
        <section>
            <div className="container">
                <div className="row justify-content-center pb-4">
                    <div className="col-md-9 heading-section text-center fadeInUp ftco-animated">
                        <h2 className="mb-4">Search Plate For Payment</h2>
                    </div>
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by plate number..."
                />
                <button onClick={() => handleSearch(searchQuery)}>Search</button>
                {closestMatch && <p>Closest match: {closestMatch}</p>}
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
                {showReceipt && (
                    <div>
                        <h3>Receipt</h3>
                        <p>Entry Time: {format(new Date(entryTime), 'M/d/yyyy, hh:mm:ss a')}</p>
                        <p>Exit Time: {exitTime}</p>
                        <p>Service Charge: {serviceCharge}฿</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Payment;
