import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./RegisterValidation";
import axios from 'axios';

const Register = () => {
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if(errors.FirstName === "" && errors.LastName === "" && errors.Email === "" && errors.Password === "") {
      axios.post('http://localhost:8081/admin_user/add-users', values)
      .then(res => {
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
      });
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#000066" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="card-body p-4 p-lg-5 text-black">
                  <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3 pb-1 text-center">
                      <span className="h1 fw-bold mb-0">Register</span>
                    </div>
                    <h5
                      className="fw-normal mb-3 pb-1 text-center"
                      style={{ letterSpacing: "1px" }}
                    >
                      Create your account
                    </h5>

                    <div className="form-outline mb-4 row">
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="First Name"
                          name="FirstName"
                          onChange={handleInput}
                        />
                        {errors.FirstName && (
                          <span className="text-danger"> {errors.FirstName}</span>
                        )}
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Last Name"
                          name="LastName"
                          onChange={handleInput}
                        />
                        {errors.LastName && (
                          <span className="text-danger">
                            {" "}
                            {errors.LastName}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Email address"
                        name="Email"
                        onChange={handleInput}
                      />
                      {errors.Email && (
                        <span className="text-danger"> {errors.Email}</span>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        placeholder="Password"
                        name="Password"
                        onChange={handleInput}
                      />
                      {errors.Password && (
                        <span className="text-danger"> {errors.Password}</span>
                      )}
                    </div>

                    {/* <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control form-control-lg"
                        placeholder="Confirm Password"
                      />
                    </div> */}

                    <div className="pt-1 mb-4 text-center">
                      <button
                        className="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                    <p
                      className="mb-3 pb-lg-2 text-center"
                      style={{ color: "#393f81" }}
                    >
                      Already have an account?{" "}
                      <Link to={"/login"} style={{ color: "#393f81" }}>
                        Login here
                      </Link>
                    </p>
                    <div className="text-center">
                      <a href="#!" className="small text-muted">
                        Terms of use.
                      </a>
                      <a href="#!" className="small text-muted">
                        Privacy policy
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
