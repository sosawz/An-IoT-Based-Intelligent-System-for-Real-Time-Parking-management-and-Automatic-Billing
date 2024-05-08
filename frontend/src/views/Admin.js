import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Admin = () => {
  const [data, setData] = useState([]);

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
    console.log(id);
    axios.get(`http://localhost:8081/admin/delete-plates?id=${id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.result) {
          getData();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <section>
      <div className="container">
        <div className="row justify-content-center pb-4">
          <div className="col-md-9 heading-section text-center fadeInUp ftco-animated">
            <h2 className="mb-4">Plate Data</h2>
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
              <tr key={item.id}>
                <th>{item.id}</th>
                <td>{item.plate}</td>
                <td>
                  {/* แสดงรูปภาพ */}
                  <img src={`data:image/jpeg;base64,${item.image}`} alt="License Plate" style={{ maxWidth: '100px', maxHeight: '50px' }} />
                </td>
                <td>
                  {/* แปลงรูปแบบของเวลา */}
                  {format(new Date(item.timestamp), 'M/d/yyyy, hh:mm:ss a')}
                  {/* หรือถ้าใช้ moment.js */}
                  {/* {moment(item.timestamp).format('M/D/YYYY, hh:mm:ss A')} */}
                </td>
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Link to={`/edit`}
                      type="button"
                      className="btn btn-link btn-rounded btn-sm fw-bold"
                      data-mdb-ripple-color="dark"
                      style={{ marginBottom: '5px' }}
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      className="btn btn-link btn-rounded btn-sm fw-bold"
                      data-mdb-ripple-color="dark"
                      onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(item.attraction_id) }}
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
    </section>
  );
}

export default Admin;
