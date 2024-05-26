import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = (props) => {
    const navigate = useNavigate();
    const [plateData, setPlateData] = useState({
        id: props.match.params.id,
        plate: '',
        image: '',
        timestamp: '',
        redirect: null,
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8081/admin/edit-plates/${plateData.id}`)
            .then((res) => {
                let data = res.data.data;
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
    }, [plateData.id]);

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        let name = e.target.name;
        let value = e.target.value;
        setPlateData(prevPlateData => ({
            ...prevPlateData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/admin/edit-plates', plateData)
            .then(res => {
                if (res.data.result) {
                    navigate('/admin');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <section>
            <section
                className="hero-wrap hero-wrap-2 js-fullheight"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${plateData.image})`,
                    height: "703px",
                }}
            >
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-center" style={{ height: "703px" }}>
                        <div className="col-md-9 ftco-animate pb-5 text-center fadeInUp ftco-animated">
                            <p className="breadcrumbs">
                                <span className="mr-2">
                                    <Link to="/">Home <i className="fa fa-chevron-right"></i></Link>
                                </span>
                                <span className="mr-2">
                                    <Link to="/admin">Admin</Link> <i className="fa fa-chevron-right"></i>
                                </span>
                                <span className="mr-2">
                                    <Link to="/edit">Edit</Link>
                                </span>
                            </p>
                            <h1 className="mb-0 bread">Edit Plate</h1>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg border-0 rounded-lg">
                            <div className="card-header bg-primary text-white rounded-top">
                                <h3 className="mb-0 thai">Edit Plate #id {plateData.id}</h3>
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
