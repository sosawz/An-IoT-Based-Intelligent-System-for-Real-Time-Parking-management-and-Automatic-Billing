import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
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
    if(errors.Email === "" && errors.Password === "") {
      axios.post('http://localhost:8081/admin_user/login', values)
      .then(res => {
        if (res.data.message === "success") {
          // ผู้ใช้งานมีข้อมูลถูกต้อง
          navigate('/starter');
        } else {
          // ผู้ใช้งานไม่มีข้อมูลในระบบ
          alert(res.data.message);
        }
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred. Please try again later.");
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
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFya2luZ3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form action="" onSubmit={handleSubmit}>
                      <div className="mb-3 pb-3 text-center">
                        <span className="h1 fw-bold mb-0">Parking Member</span>
                      </div>

                      <h5
                        className="fw-normal mb-3 pb-3 text-center"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="email"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          placeholder="Email address"
                          onChange={handleInput}
                          name="Email"
                        />
                        {errors.Email && (
                          <span className="text-danger"> {errors.Email}</span>
                        )}
                      </div>

                      <div data-mdb-input-init className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          onChange={handleInput}
                          name="Password"
                        />
                        {errors.Password && (
                          <span className="text-danger"> {errors.Password}</span>
                        )}
                      </div>

                      <div className="pt-1 mb-4 text-center">
                        <button
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>
                      <p
                        className="mb-5 pb-lg-2 text-center"
                        style={{ color: "#393f81" }}
                      >
                        Don't have an account?{" "}
                        <Link to={"/register"} style={{ color: "#393f81" }}>
                          Register here
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
      </div>
    </section>
  );
};

export default Login;
