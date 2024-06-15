import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

const Register = () => {
  const [registerStatus, setRegisterStatus] = useState("");
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    FirstName: Yup.string().required("First Name is required"),
    LastName: Yup.string().required("Last Name is required"),
    Email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .test("uniqueEmail", "Email already exists", async (value) => {
        if (!value) {
          return true;
        }
        try {
          const response = await axios.post(
            "http://localhost:8081/checkEmail",
            {
              Email: value,
            }
          );
          return !response.data.exists;
        } catch (error) {
          console.error("Error checking email uniqueness:", error);
          return false; // In case of error, consider the email as existing to avoid registration issues
        }
      }),
    Password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  useEffect(() => {
    if (registerStatus === "Account Created Successfully") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [registerStatus, navigate]);

  return (
    <section className="vh-100" style={{ backgroundColor: "#000066" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="card-body p-4 p-lg-5 text-black">
                  <Formik
                    initialValues={{
                      FirstName: "",
                      LastName: "",
                      Email: "",
                      Password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      axios
                        .post("http://localhost:8081/register", values)
                        .then((response) => {
                          if (
                            response.data.message ===
                            "Account Created Successfully"
                          ) {
                            setRegisterStatus("Account Created Successfully");
                          } else {
                            setRegisterStatus(response.data.message);
                          }
                          setSubmitting(false);
                        })
                        .catch((error) => {
                          console.error(error);
                          setRegisterStatus(
                            "An error occurred. Please try again."
                          );
                          setSubmitting(false);
                        });
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      errors,
                      touched,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
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
                              value={values.FirstName}
                              onChange={handleChange}
                            />
                            {errors.FirstName && touched.FirstName && (
                              <div className="text-danger">
                                {errors.FirstName}
                              </div>
                            )}
                          </div>
                          <div className="col-6">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              placeholder="Last Name"
                              name="LastName"
                              value={values.LastName}
                              onChange={handleChange}
                            />
                            {errors.LastName && touched.LastName && (
                              <div className="text-danger">
                                {errors.LastName}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Email address"
                            name="Email"
                            value={values.Email}
                            onChange={handleChange}
                          />
                          {errors.Email && touched.Email && (
                            <div className="text-danger">{errors.Email}</div>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            name="Password"
                            value={values.Password}
                            onChange={handleChange}
                          />
                          {errors.Password && touched.Password && (
                            <div className="text-danger">{errors.Password}</div>
                          )}
                        </div>

                        <div className="pt-1 mb-4 text-center">
                          <button
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
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
                  {registerStatus && (
                    <div className="text-center mt-3">
                      <span
                        className={`text-${
                          registerStatus === "Account Created Successfully"
                            ? "success"
                            : "danger"
                        }`}
                      >
                        {registerStatus}
                      </span>
                    </div>
                  )}
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
