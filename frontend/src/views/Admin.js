import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockData = [
  {
    attraction_id: 1,
    name: "กง 1234",
    picture: "example_image_1.jpg",
    time: "9:00 AM - 5:00 PM",
  },
  {
    attraction_id: 2,
    name: "จฉ 5678",
    picture: "example_image_2.jpg",
    time: "10:00 AM - 6:00 PM",
  }
];

const Admin = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API endpoint
    setData(mockData);
  }, []);

  const handleDelete = (attraction_id) => {
    // Simulating deletion of an attraction
    setData(data.filter(item => item.attraction_id !== attraction_id));
    // In a real application, you would make an API call to delete the attraction
  }

  return (
    <section>
      <div classname="container">
        <div className="row justify-content-center pb-4">
          <div className="col-md-9 heading-section text-center fadeInUp ftco-animated">
            <h2 className="mb-4">Plate Data</h2>
            <Link to="/create" className="btn btn-info">Add New Plate Data</Link>
          </div>
        </div>
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
            {data.map(item => (
              <tr key={item.attraction_id}>
                <th>{item.attraction_id}</th>
                <td>{item.name}</td>
                <td>{item.picture}</td>
                <td>{item.time}</td>
                <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Link to={`/edit`} className="btn btn-info mr-2" style={{ marginRight: '30px' }}>Edit</Link>
                  <button className="btn btn-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(item.attraction_id) }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}



export default Admin;
