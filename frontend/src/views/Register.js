import { Link } from "react-router-dom";

const Register = () => {
    return (
        <section className="vh-100" style={{ backgroundColor: "#000066" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="card-body p-4 p-lg-5 text-black text-center">
                                    <form>
                                        <div className="mb-3 pb-1">
                                            <span className="h1 fw-bold mb-0">Register</span>
                                        </div>
                                        <h5 className="fw-normal mb-3 pb-1" style={{ letterSpacing: "1px" }}>
                                            Create your account
                                        </h5>

                                        <div className="form-outline mb-4 row">
                                            <div className="col-6">
                                                <input
                                                    type="text"
                                                    id="firstName"
                                                    className="form-control form-control-lg"
                                                    placeholder="First Name"
                                                />
                                            </div>
                                            <div className="col-6">
                                                <input
                                                    type="text"
                                                    id="lastName"
                                                    className="form-control form-control-lg"
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control form-control-lg"
                                                placeholder="Email address"
                                            />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control form-control-lg"
                                                placeholder="Password"
                                            />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="confirmPassword"
                                                className="form-control form-control-lg"
                                                placeholder="Confirm Password"
                                            />
                                        </div>

                                        <div className="pt-1 mb-4">
                                            <button
                                                className="btn btn-dark btn-lg btn-block"
                                                type="submit"
                                            >
                                                Register
                                            </button>
                                        </div>
                                        <p className="mb-3 pb-lg-2" style={{ color: "#393f81" }}>
                                            Already have an account?{" "}
                                            <Link to={"/login"} style={{ color: "#393f81" }}>
                                                Login here
                                            </Link>
                                        </p>
                                        <a href="#!" className="small text-muted">
                                            Terms of use.
                                        </a>
                                        <a href="#!" className="small text-muted">
                                            Privacy policy
                                        </a>
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