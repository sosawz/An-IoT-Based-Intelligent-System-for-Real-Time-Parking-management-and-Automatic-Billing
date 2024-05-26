import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
    const { id } = useParams(); // Use useParams to get the dynamic id
    const navigate = useNavigate();
    const [plateData, setPlateData] = useState({
        plate: '',
        image: '',
        timestamp: '',
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8081/admin/edit-plates/${id}`)
            .then((res) => {
                let data = res.data.data[0];
                console.log(data);
                setPlateData(prevPlateData => ({
                    ...prevPlateData,
                    plate: data.plate,
                    image: data.image,
                    timestamp: data.timestamp,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPlateData(prevPlateData => ({
            ...prevPlateData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any property in plateData is undefined
    const isUndefinedPresent = Object.values(plateData).some(value => value === undefined);

    if (isUndefinedPresent) {
        console.log("Some fields are empty");
        return;
    }

    axios.post('http://localhost:8081/admin/edit-plates', plateData)
        .then(res => {
            console.log(res.data);
            if (res.data.result) {
                setPlateData(prevPlateData => ({
                    ...prevPlateData
                }))
                navigate('/admin');
            }
        })
        .catch(error => {
            console.log(error);
        });
};

    return (
        <section>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg border-0 rounded-lg">
                            <div className="card-header bg-primary text-white rounded-top">
                                <h3 className="mb-0 thai">Edit Plate #id {id}</h3>
                            </div>
                            <div className="card-body thai">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="plate">Plate Number</label>
                                        <input type="text" className="form-control" name="plate" placeholder="Plate Number" onChange={handleChange} value={plateData.plate} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image">Image URL</label>
                                        <input type="text" className="form-control" name="image" placeholder="Image URL" onChange={handleChange} value={plateData.image} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="timestamp">Timestamp</label>
                                        <input type="datetime-local" className="form-control" name="timestamp" placeholder="Timestamp" onChange={handleChange} value={plateData.timestamp} />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mt-4">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Edit;
