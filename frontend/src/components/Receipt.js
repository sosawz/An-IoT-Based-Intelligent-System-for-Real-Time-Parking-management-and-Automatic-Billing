import React from 'react';
import { format } from 'date-fns';

const Receipt = ({ entryTime, exitTime, plateNumber, customerName, serviceCharge, handleDownload, handleShare }) => {
    return (
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
                    <a href="#" onClick={handleDownload} className="btn btn-primary me-3">Download</a>
                    <button onClick={handleShare} className="btn btn-success">Share</button>
                </div>
            </div>
        </div>
    );
}

export default Receipt;
