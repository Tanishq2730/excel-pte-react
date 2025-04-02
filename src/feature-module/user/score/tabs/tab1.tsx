import React from "react";
import ImageWithBasePath from "../../../../core/common/imageWithBasePath";

const Tab1 = () => {
    return (
        <div className="m-auto">
            <div className="content">
                <div className="score-report container">
                    <div className="card p-4">
                        <h2 className="text-primary align-items-center" style={{ justifyContent: "center", alignContent: 'center', display: 'flex' }}>
                            <ImageWithBasePath
                                src="assets/img/logo-black.png"
                                alt="img"
                                className="img-fluid shape-01 scoreimg"

                            />
                            | Score Report</h2>
                        <p className="text-center text-muted">Mock Name: Full Mock Test 40 | Mock Test Date: Mar 23, 2025</p>

                        <div className="d-flex align-items-center profile-section">
                            <div className="profile-pic me-3">
                                <ImageWithBasePath
                                    src="assets/img/icons/student.svg"
                                    alt="img"
                                    className="img-fluid shape-01"
                                />
                                {/* <img alt="avatar" className="rounded-circle" /> */}
                            </div>
                            <div>
                                <h4>John Doe</h4>
                                <p>johndoe@example.com</p>
                            </div>
                            <div className="ms-auto score-badge">
                                <span className="badge bg-light text-dark">Overall Score</span>
                                <h3 className="text-primary">85</h3>
                            </div>
                        </div>

                        <div className="communicative-skills my-4 text-center">
                            <div className="row">
                                <div className="col-md-3 col-6">
                                    <div className="skill-circle listening">
                                        <h4>80</h4>
                                        <p>Listening</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="skill-circle reading">
                                        <h4>82</h4>
                                        <p>Reading</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="skill-circle speaking">
                                        <h4>88</h4>
                                        <p>Speaking</p>
                                    </div>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="skill-circle writing">
                                        <h4>85</h4>
                                        <p>Writing</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="skills-breakdown">
                            <h5>Skills Breakdown</h5>
                            <div className="d-flex align-items-center my-2">
                                <span className="me-2">Listening</span>
                                <div className="progress flex-grow-1">
                                    <div className="progress-bar listening" style={{ width: "80%" }}></div>
                                </div>
                                <span className="ms-2">80</span>
                            </div>
                            <div className="d-flex align-items-center my-2">
                                <span className="me-2">Reading</span>
                                <div className="progress flex-grow-1">
                                    <div className="progress-bar reading" style={{ width: "82%" }}></div>
                                </div>
                                <span className="ms-2">82</span>
                            </div>
                            <div className="d-flex align-items-center my-2">
                                <span className="me-2">Speaking</span>
                                <div className="progress flex-grow-1">
                                    <div className="progress-bar speaking" style={{ width: "88%" }}></div>
                                </div>
                                <span className="ms-2">88</span>
                            </div>
                            <div className="d-flex align-items-center my-2">
                                <span className="me-2">Writing</span>
                                <div className="progress flex-grow-1">
                                    <div className="progress-bar writing" style={{ width: "85%" }}></div>
                                </div>
                                <span className="ms-2">85</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tab1;