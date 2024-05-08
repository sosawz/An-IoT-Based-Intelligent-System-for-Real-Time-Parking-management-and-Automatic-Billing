import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [closestMatch, setClosestMatch] = useState("");

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

  const handleDelete = (id) => {
    axios.get(`http://localhost:8081/admin/delete-plates?id=${id}`)
      .then(res => {
        if (res.data.result) {
          getData();
        }
      })
      .catch(error => {
        console.log(error);
      });
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
                <td>{item.timestamp}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link to={`/edit`} className="btn btn-info mr-2" style={{ marginRight: '30px' }}>Edit</Link>
                  <button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(item.id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Payment;
